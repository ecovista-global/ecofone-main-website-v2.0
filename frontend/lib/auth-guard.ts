import crypto from 'crypto';

export interface AuthUser {
  id?: string;
  sub?: string;
  role?: string;
  username?: string;
  phone?: string;
  email?: string;
  permissions?: string[];
}

/**
 * Extracts authentication bearer token from request headers, query params, or cookies.
 */
export function extractBearerToken(req: Request): string | null {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim();
  }

  // Check URL query parameters (for direct file downloads e.g. Excel export)
  try {
    const url = new URL(req.url);
    const tokenQuery = url.searchParams.get('token');
    if (tokenQuery) return tokenQuery.trim();
  } catch (_) {}

  // Check Cookie header
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/ecofone_token=([^;]+)/);
  if (match) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

/**
 * Verifies that the incoming request is from an authenticated admin or sub-admin.
 * Fails closed if token is missing, expired, invalid, or server secret is missing.
 */
export function verifyAdminAuth(req: Request): { isAuthorized: boolean; user?: AuthUser; error?: string } {
  const token = extractBearerToken(req);
  if (!token) {
    return { isAuthorized: false, error: 'Authorization token missing. Admin access required.' };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return { isAuthorized: false, error: 'Server authentication secret is not configured.' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { isAuthorized: false, error: 'Invalid token structure.' };
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${headerB64}.${payloadB64}`);
    const expectedSig = hmac.digest('base64url');

    const sigBuf = Buffer.from(signatureB64, 'utf-8');
    const expBuf = Buffer.from(expectedSig, 'utf-8');

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { isAuthorized: false, error: 'Invalid token signature.' };
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8')) as AuthUser & { exp?: number };

    // Verify token expiration if exp claim is present
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return { isAuthorized: false, error: 'Token has expired. Please log in again.' };
    }

    // Role check: must have ADMIN or SUB_ADMIN role
    if (payload.role !== 'ADMIN' && payload.role !== 'SUB_ADMIN') {
      return { isAuthorized: false, error: 'Insufficient permissions. Admin role required.' };
    }

    return { isAuthorized: true, user: payload };
  } catch (err: any) {
    return { isAuthorized: false, error: 'Authentication verification failed: ' + (err?.message || 'unknown') };
  }
}
