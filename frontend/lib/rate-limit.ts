// Lightweight in-memory sliding-window rate limiter for Next.js route handlers

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

// Cleanup old entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of tracker.entries()) {
      if (now > record.resetTime) {
        tracker.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return '127.0.0.1';
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 10 mins)
  maxRequests?: number; // Maximum allowed requests within the window (default: 5)
  prefix?: string; // Route prefix to namespace limits
}

export function checkRateLimit(
  req: Request,
  options: RateLimitOptions = {}
): { isAllowed: boolean; remaining: number; retryAfterSeconds: number } {
  const windowMs = options.windowMs || 10 * 60 * 1000; // 10 minutes default
  const maxRequests = options.maxRequests || 5; // 5 requests max
  const prefix = options.prefix || 'default';

  const clientIp = getClientIp(req);
  const key = `${prefix}:${clientIp}`;
  const now = Date.now();

  const current = tracker.get(key);

  if (!current || now > current.resetTime) {
    // New window
    tracker.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return {
      isAllowed: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000)
    };
  }

  if (current.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetTime - now) / 1000));
    return {
      isAllowed: false,
      remaining: 0,
      retryAfterSeconds
    };
  }

  current.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((current.resetTime - now) / 1000));
  return {
    isAllowed: true,
    remaining: maxRequests - current.count,
    retryAfterSeconds
  };
}
