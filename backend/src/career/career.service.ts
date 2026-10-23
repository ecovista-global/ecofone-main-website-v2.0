import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CreateCareerApplicationDto {
  jobId?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  gender?: string;
  experienceYears?: string;
  currentLocation?: string;
  areaOfInterest?: string;
  currentSalary?: string;
  expectedSalary?: string;
  resumeUrl: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  coverNote?: string;
}

export interface CreateCareerJobDto {
  title: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
  description: string;
  requirements?: string[];
  isActive?: boolean;
}

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  // Applications
  async submitApplication(data: CreateCareerApplicationDto) {
    return this.prisma.careerApplication.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });
  }

  async listApplications() {
    return this.prisma.careerApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateApplicationStatus(id: string, status: string) {
    const existing = await this.prisma.careerApplication.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Application ${id} not found`);
    }
    return this.prisma.careerApplication.update({
      where: { id },
      data: { status },
    });
  }

  async removeApplication(id: string) {
    const existing = await this.prisma.careerApplication.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Application ${id} not found`);
    }
    return this.prisma.careerApplication.delete({ where: { id } });
  }

  // Jobs / Openings
  async listJobs(onlyActive = true) {
    return this.prisma.careerJob.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createJob(data: CreateCareerJobDto) {
    return this.prisma.careerJob.create({
      data: {
        title: data.title,
        department: data.department || 'General',
        location: data.location || 'Lucknow HQ',
        type: data.type || 'Full Time - On-site',
        experience: data.experience || '1 - 3 Years',
        description: data.description,
        requirements: data.requirements || [],
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateJob(id: string, data: Partial<CreateCareerJobDto>) {
    const existing = await this.prisma.careerJob.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Job listing ${id} not found`);
    }
    return this.prisma.careerJob.update({
      where: { id },
      data,
    });
  }

  async removeJob(id: string) {
    const existing = await this.prisma.careerJob.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Job listing ${id} not found`);
    }
    return this.prisma.careerJob.delete({ where: { id } });
  }
}
