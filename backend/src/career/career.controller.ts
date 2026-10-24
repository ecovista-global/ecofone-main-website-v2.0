import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CareerService, CreateCareerApplicationDto, CreateCareerJobDto } from './career.service';
import { RolesGuard } from '../auth/guards/rbac.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  // Applications
  @Post('applications')
  @UseGuards(ThrottlerGuard)
  async submitApplication(@Body() body: CreateCareerApplicationDto) {
    return this.careerService.submitApplication(body);
  }

  @Get('applications')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async listApplications() {
    return this.careerService.listApplications();
  }

  @Patch('applications/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async updateApplicationStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.careerService.updateApplicationStatus(id, status);
  }

  @Delete('applications/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async removeApplication(@Param('id') id: string) {
    return this.careerService.removeApplication(id);
  }

  // Job Openings
  @Get('jobs')
  async listJobs(@Query('all') all?: string) {
    const onlyActive = all !== 'true';
    return this.careerService.listJobs(onlyActive);
  }

  @Post('jobs')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async createJob(@Body() body: CreateCareerJobDto) {
    return this.careerService.createJob(body);
  }

  @Put('jobs/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async updateJob(
    @Param('id') id: string,
    @Body() body: Partial<CreateCareerJobDto>,
  ) {
    return this.careerService.updateJob(id, body);
  }

  @Delete('jobs/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async removeJob(@Param('id') id: string) {
    return this.careerService.removeJob(id);
  }
}
