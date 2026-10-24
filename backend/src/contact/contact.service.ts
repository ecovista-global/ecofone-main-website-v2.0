import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CreateContactDto {
  applicantName: string;
  email: string;
  phone: string;
  locationPreference?: string;
  investmentCapacity?: number;
  experienceDesc: string;
}

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto) {
    return this.prisma.contactMessage.create({
      data: {
        applicantName: data.applicantName,
        email: data.email,
        phone: data.phone,
        locationPreference: data.locationPreference || 'General Inquiry',
        investmentCapacity: data.investmentCapacity || 0,
        experienceDesc: data.experienceDesc,
        status: 'PENDING',
      },
    });
  }

  async list() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    const existing = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Contact message ${id} not found`);
    }
    return this.prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Contact message ${id} not found`);
    }
    return this.prisma.contactMessage.delete({ where: { id } });
  }

  async clearAll() {
    return this.prisma.contactMessage.deleteMany({});
  }
}
