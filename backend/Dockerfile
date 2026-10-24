# File: backend/Dockerfile
# Multi-stage production build for AWS Graviton (ARM64) and x86_64

# Stage 1: Dependencies & Native Addon Compilation (bcrypt 6.0.0 + Prisma 5.22.0)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate

# Stage 2: TypeScript Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 2.5: One-off migration image (contains Prisma CLI; never serves traffic)
FROM node:20-alpine AS migrator
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY prisma ./prisma
ENV NODE_ENV=production
CMD ["node", "prisma/entrypoint-migrate.js"]

# Stage 3: Hardened Non-Root AWS Production Runner
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init openssl curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4012

COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs
EXPOSE 4012

# AWS ECS Container Health Check targeting the shallow Liveness probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD curl -f http://127.0.0.1:4012/api/v1/health/live || exit 1

# dumb-init ensures SIGTERM from AWS ECS is forwarded cleanly to NestJS
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/src/main.js"]
