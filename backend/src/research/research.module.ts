import { Module } from '@nestjs/common';
import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ResearchController],
  providers: [ResearchService, PrismaService],
  exports: [ResearchService],
})
export class ResearchModule {}
