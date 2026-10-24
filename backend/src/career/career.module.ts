import { Module } from '@nestjs/common';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CareerController],
  providers: [CareerService, PrismaService],
  exports: [CareerService],
})
export class CareerModule {}
