import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as express from 'express';
import helmet from 'helmet';

// Ensure environment variables are loaded for database connections
if (!process.env.POSTGRES_PRISMA_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_PRISMA_URL = process.env.DATABASE_URL;
}
if (!process.env.DATABASE_URL && process.env.POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Helmet HTTP Security Headers
  app.use(helmet());

  // Global prefixes
  app.setGlobalPrefix('api/v1');

  // Serve static uploaded files locally
  const path = require('path');
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  // Enforce strict request body size limits to prevent memory exhaustion DoS
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));
  
  // Register CORS origin policy
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or any web origin
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });

  // Global validation pipe with class-validator settings
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global custom error handler
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 4012;
  await app.listen(port, '0.0.0.0');
  console.log(`EcoFone NestJS backend listening on port ${port}/api/v1`);
}
bootstrap();
