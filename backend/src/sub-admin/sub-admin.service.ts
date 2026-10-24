import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SubAdminService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const admins = await this.prisma.subAdmin.findMany({
      where: { username: { notIn: ['admin', 'master'] } },
      select: { id: true, username: true, permissions: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });
    return admins;
  }

  async create(data: { username: string; password: string; permissions: string[] }) {
    const username = data.username.trim().toLowerCase();

    if (username === 'admin' || username === 'master') {
      throw new BadRequestException('Username "admin" or "master" is reserved.');
    }

    const existing = await this.prisma.subAdmin.findUnique({ where: { username } });
    if (existing) {
      throw new ConflictException(`Sub-admin with username "${username}" already exists.`);
    }

    // Count existing sub-admins — max 4 (excluding master admin)
    const count = await this.prisma.subAdmin.count({
      where: { username: { notIn: ['admin', 'master'] } }
    });
    if (count >= 4) {
      throw new BadRequestException('Maximum limit of 4 sub-admins reached.');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const subAdmin = await this.prisma.subAdmin.create({
      data: {
        username,
        password: passwordHash,
        permissions: data.permissions,
      },
      select: { id: true, username: true, permissions: true, createdAt: true },
    });

    return subAdmin;
  }

  async remove(id: string) {
    const existing = await this.prisma.subAdmin.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Sub-admin not found.');
    }
    await this.prisma.subAdmin.delete({ where: { id } });
    return { success: true, message: `Sub-admin "${existing.username}" deleted.` };
  }

  /** Verify a specific sub-admin's password by ID */
  async verifyPassword(id: string, password: string) {
    const sa = await this.prisma.subAdmin.findUnique({ where: { id } });
    if (!sa) throw new NotFoundException('Sub-admin not found.');
    const match = await bcrypt.compare(password, sa.password);
    return { valid: match };
  }

  /** Sub-admin login requiring username and password — single DB lookup and single bcrypt comparison */
  async login(password: string, username?: string) {
    if (!password) {
      throw new BadRequestException('Password is required.');
    }
    if (!username || !username.trim()) {
      throw new BadRequestException('Username is required for sub-admin login.');
    }

    const cleanUsername = username.trim().toLowerCase();
    const sa = await this.prisma.subAdmin.findUnique({
      where: { username: cleanUsername },
    });

    if (!sa) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const match = await bcrypt.compare(password, sa.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is missing');
    }

    const payload = {
      id: sa.id,
      username: sa.username,
      role: 'SUB_ADMIN',
      permissions: sa.permissions,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return {
      token,
      user: {
        id: sa.id,
        username: sa.username,
        role: 'SUB_ADMIN',
        permissions: sa.permissions,
      },
    };
  }

  async updatePassword(id: string, password: string) {
    const existing = await this.prisma.subAdmin.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Sub-admin not found.');
    }
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters.');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await this.prisma.subAdmin.update({
      where: { id },
      data: { password: passwordHash }
    });
    return { success: true, message: `Sub-admin "${existing.username}" password updated.` };
  }

  async updatePermissions(id: string, permissions: string[]) {
    const existing = await this.prisma.subAdmin.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Sub-admin not found.');
    }
    const updated = await this.prisma.subAdmin.update({
      where: { id },
      data: { permissions },
      select: { id: true, username: true, permissions: true, createdAt: true }
    });
    return updated;
  }
}
