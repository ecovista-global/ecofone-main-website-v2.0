import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CreateResearchArticleDto {
  publisher: string;
  date: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

@Injectable()
export class ResearchService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.researchArticle.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateResearchArticleDto) {
    return this.prisma.researchArticle.create({
      data,
    });
  }

  async update(id: string, data: Partial<CreateResearchArticleDto>) {
    const existing = await this.prisma.researchArticle.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Research article ${id} not found`);
    }
    return this.prisma.researchArticle.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.researchArticle.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Research article ${id} not found`);
    }
    return this.prisma.researchArticle.delete({ where: { id } });
  }
}
