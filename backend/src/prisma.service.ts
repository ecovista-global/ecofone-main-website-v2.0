import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
    super(
      dbUrl
        ? {
            datasources: {
              db: {
                url: dbUrl,
              },
            },
          }
        : undefined,
    );
  }

  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await this.$connect();
        this.logger.log('Successfully connected to the PostgreSQL database via Prisma.');
        return;
      } catch (err: any) {
        attempt++;
        this.logger.warn(`Database connection attempt ${attempt}/${maxRetries} failed: ${err.message}`);
        if (attempt < maxRetries) {
          await new Promise((res) => setTimeout(res, 1000 * attempt));
        } else {
          this.logger.error('CRITICAL: Exhausted database connection retries. Service running with fallback readiness.');
        }
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected cleanly on application shutdown.');
  }
}
