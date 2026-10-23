// Resilient rate limiter supporting Upstash Redis REST API with robust in-memory sliding-window fallback

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

// Cleanup stale in-memory entries every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    tracker.forEach((record, key) => {
      if (now > record.resetTime) {
        tracker.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

/**
 * Extracts client IP with priority to tamper-proof headers (Cloudflare CF-Connecting-IP)
 * before checking X-Real-IP and X-Forwarded-For.
 */
export function getClientIp(req: Request): string {
  // 1. Cloudflare connecting IP (verified tamper-proof when hosted behind Cloudflare proxy)
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  // 2. Real-IP set by trusted reverse proxies (Nginx / Caddy / AWS ALB)
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  // 3. Fallback to client IP from X-Forwarded-For
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return '127.0.0.1';
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 10 mins)
  maxRequests?: number; // Maximum allowed requests within the window (default: 5)
  prefix?: string; // Route prefix to namespace limits
}

export interface RateLimitResult {
  isAllowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Checks rate limit using in-memory tracker (synchronous for fast route execution).
 */
export function checkRateLimit(
  req: Request,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs || 10 * 60 * 1000;
  const maxRequests = options.maxRequests || 5;
  const prefix = options.prefix || 'default';

  const clientIp = getClientIp(req);
  const key = `${prefix}:${clientIp}`;
  const now = Date.now();

  const current = tracker.get(key);

  if (!current || now > current.resetTime) {
    // New window
    tracker.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      isAllowed: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetTime - now) / 1000));
    return {
      isAllowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  // Increment within window
  current.count += 1;
  const remaining = Math.max(0, maxRequests - current.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((current.resetTime - now) / 1000));

  return {
    isAllowed: true,
    remaining,
    retryAfterSeconds,
  };
}

/**
 * Distributed rate limiter using Upstash Redis REST pipeline when configured,
 * seamlessly falling back to checkRateLimit in-memory when Redis env vars are absent.
 */
export async function checkDistributedRateLimit(
  req: Request,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Fallback to local in-memory tracker if Upstash is not configured
  if (!upstashUrl || !upstashToken) {
    return checkRateLimit(req, options);
  }

  const windowMs = options.windowMs || 10 * 60 * 1000;
  const windowSec = Math.ceil(windowMs / 1000);
  const maxRequests = options.maxRequests || 5;
  const prefix = options.prefix || 'default';

  const clientIp = getClientIp(req);
  const key = `ratelimit:${prefix}:${clientIp}`;

  try {
    // Atomic multi-command pipeline via Upstash REST: INCR + EXPIRE (NX)
    const pipelineUrl = `${upstashUrl.replace(/\/+$/, '')}/pipeline`;
    const res = await fetch(pipelineUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${upstashToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSec, 'NX'],
        ['TTL', key],
      ]),
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      const currentCount = Number(data[0]?.result) || 1;
      const ttl = Number(data[2]?.result) || windowSec;

      if (currentCount > maxRequests) {
        return {
          isAllowed: false,
          remaining: 0,
          retryAfterSeconds: Math.max(1, ttl),
        };
      }

      return {
        isAllowed: true,
        remaining: Math.max(0, maxRequests - currentCount),
        retryAfterSeconds: Math.max(1, ttl),
      };
    }
  } catch (err: any) {
    console.warn('[Distributed Rate Limit] Upstash unreachable, falling back to memory:', err?.message);
  }

  return checkRateLimit(req, options);
}
