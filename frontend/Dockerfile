# File: frontend/Dockerfile
# Next.js 15.5.28 Standalone Build — Memory-Safe for 77 Static Routes on AWS

# Stage 1: Install Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build 77 Static Routes with 3GB Heap Allocation to Prevent AWS CodeBuild OOM
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=3072"
RUN npm run build && \
    test -f .next/standalone/server.js || (echo "FATAL: output: 'standalone' was missing from next.config.js" && exit 1)

# Stage 3: Minimal Standalone Runner (~135MB total image size)
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Pre-create required directories with nextjs non-root ownership
RUN mkdir -p /app/public/uploads /app/.next/cache && \
    chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy standalone trace and static chunks
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy resilience JSON fallback data directory (Read-Only safe)
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
