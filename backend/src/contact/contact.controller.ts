import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactService, CreateContactDto } from './contact.service';
import { RolesGuard } from '../auth/guards/rbac.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(ThrottlerGuard)
  async submit(@Body() body: CreateContactDto) {
    return this.contactService.create(body);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async list() {
    return this.contactService.list();
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.contactService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @Query('clearAll') clearAll?: string) {
    if (clearAll === 'true') {
      return this.contactService.clearAll();
    }
    return this.contactService.remove(id);
  }
}
