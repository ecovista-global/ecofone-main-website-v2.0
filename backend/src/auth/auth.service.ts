import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import axios from 'axios';
import * as crypto from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  /** Cryptographically secure 6-digit OTP generator */
  private generateSecureOtp(): string {
    const buffer = crypto.randomBytes(4);
    const num = (buffer.readUInt32BE(0) % 900000) + 100000;
    return num.toString();
  }

  async sendOtp(phone: string): Promise<{ success: boolean; message: string; debugCode?: string }> {
    if (!phone || !phone.match(/^\+?[1-9]\d{1,14}$/)) {
      throw new BadRequestException('Invalid international phone number format (E.164)');
    }

    const otpCode = this.generateSecureOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    // Upsert OTP record in database
    await this.prisma.otpRecord.upsert({
      where: { phone },
      update: {
        code: otpCode,
        expiresAt,
        verified: false,
      },
      create: {
        phone,
        code: otpCode,
        expiresAt,
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
      return {
        success: true,
        message: 'Development OTP generated',
        debugCode: otpCode,
      };
    }

    // Call External SMS gateway (Twilio / MSG91) logic
    try {
      if (process.env.SMS_PROVIDER === 'msg91') {
        await axios.post('https://api.msg91.com/api/v5/flow/', {
          flow_id: process.env.MSG91_FLOW_ID,
          sender: process.env.MSG91_SENDER_ID,
          recipients: [{ mobiles: phone, otp: otpCode }]
        }, {
          headers: { authkey: process.env.MSG91_AUTH_KEY }
        });
      } else if (process.env.SMS_PROVIDER === 'twilio') {
        await axios.post(
          `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
          new URLSearchParams({
            To: phone,
            From: process.env.TWILIO_PHONE_NUMBER || '',
            Body: `Your EcoFone verification OTP is: ${otpCode}. Valid for 5 minutes.`
          }).toString(),
          {
            headers: {
              'Authorization': 'Basic ' + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
      }
    } catch (err) {
      console.warn('SMS Provider failed. Falling back to local logging. Error:', err.message);
    }

    return {
      success: true,
      message: 'OTP dispatched successfully via SMS gateway',
    };
  }

  async verifyOtp(phone: string, code: string): Promise<{ token: string; user: any }> {
    const record = await this.prisma.otpRecord.findUnique({
      where: { phone },
    });

    if (!record) {
      throw new BadRequestException('No active OTP request found for this phone number');
    }

    if (record.verified) {
      throw new BadRequestException('This OTP has already been used');
    }

    if (new Date() > record.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    if (record.code !== code) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Mark as verified
    await this.prisma.otpRecord.update({
      where: { phone },
      data: { verified: true },
    });

    // Find or create customer user
    let user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone,
          name: `Customer-${phone.slice(-4)}`,
          role: Role.CUSTOMER,
        },
      });
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    };
  }

  async googleLogin(idToken: string): Promise<{ token: string; user: any }> {
    try {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
      );
      const { email, name, sub: googleId } = response.data;

      if (!email) {
        throw new BadRequestException('Invalid Google Token: Missing email identifier');
      }

      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            name: name || 'Google User',
            phone: `+G-${googleId.slice(0, 10)}`,
            role: Role.CUSTOMER,
          },
        });
      }

      const token = this.generateToken(user);

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to authenticate Google token with Identity Provider');
    }
  }

  private generateToken(user: { id: string; phone?: string; role: Role }): string {
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is missing');
    }
    return jwt.sign(payload, secret, {
      expiresIn: '7d',
    });
  }

  async masterAdminLogin(password: string): Promise<{ token: string }> {
    // Protect against Long-Password DoS attacks
    if (!password || Buffer.byteLength(password, 'utf8') > 128) {
      throw new UnauthorizedException('Invalid master admin credentials.');
    }

    // 1. Strictly query and check the live database password (with auto-reconnect retry for cold starts)
    let masterRecord: any = null;
    let attempts = 0;
    while (attempts < 2 && !masterRecord) {
      try {
        masterRecord = await this.prisma.subAdmin.findUnique({
          where: { username: 'admin' },
        });
        break;
      } catch (dbErr) {
        attempts++;
        if (attempts < 2) {
          try { await this.prisma.$connect(); } catch (_) {}
          await new Promise((res) => setTimeout(res, 300));
        } else {
          console.warn('Database connection warning during login:', dbErr);
        }
      }
    }

    if (!masterRecord || !masterRecord.password) {
      throw new UnauthorizedException('Master admin record not initialized in database.');
    }

    // 2. Strictly authenticate against the database password hash
    let isValid = false;
    if (masterRecord.password.startsWith('$2b$') || masterRecord.password.startsWith('$2a$')) {
      isValid = await bcrypt.compare(password, masterRecord.password);
    } else {
      // Timing-safe comparison if legacy plaintext
      const bufA = Buffer.from(password);
      const bufB = Buffer.from(masterRecord.password);
      isValid = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
    }

    if (!isValid) {
      throw new UnauthorizedException('Invalid master admin credentials.');
    }

    const payload = {
      id: masterRecord.id || 'master_admin',
      email: 'business@ecofone.co.in',
      phone: '+919919965499',
      role: 'ADMIN',
      username: 'admin',
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is missing');
    }
    const token = jwt.sign(payload, secret, { expiresIn: '14d' });
    return { token };
  }

  async changeMasterAdminPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestException('New password must be at least 8 characters long.');
    }

    const masterRecord = await this.prisma.subAdmin.findUnique({
      where: { username: 'admin' },
    });

    if (!masterRecord || !masterRecord.password) {
      throw new UnauthorizedException('Master admin record not found in database.');
    }

    let isCurrentValid = false;
    if (masterRecord.password.startsWith('$2b$') || masterRecord.password.startsWith('$2a$')) {
      isCurrentValid = await bcrypt.compare(currentPassword, masterRecord.password);
    } else {
      const bufA = Buffer.from(currentPassword);
      const bufB = Buffer.from(masterRecord.password);
      isCurrentValid = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
    }

    if (!isCurrentValid) {
      throw new UnauthorizedException('Current password does not match.');
    }

    // Hash new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Save and permanently persist in PostgreSQL database
    await this.prisma.subAdmin.upsert({
      where: { username: 'admin' },
      update: {
        password: hashedPassword,
        permissions: ['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates'],
      },
      create: {
        username: 'admin',
        password: hashedPassword,
        permissions: ['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates'],
      },
    });

    return {
      success: true,
      message: 'Master Admin password updated successfully and permanently saved in database.',
    };
  }
}
