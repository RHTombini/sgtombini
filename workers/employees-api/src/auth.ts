import type { Env } from './env';

export interface AuthContext {
  userId: string;
  role: string;
  accessToken: string;
}

export async function authenticate(request: Request, env: Env): Promise<AuthContext | null> {
  const auth = request.headers.get('Authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;

  const res = await fetch(`${env.IDENTITY_URL}/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;

  const payload = (await res.json()) as { data?: { id: string; role: string } };
  if (!payload.data) return null;

  return {
    userId: payload.data.id,
    role: payload.data.role,
    accessToken: token,
  };
}

export function requireRole(ctx: AuthContext, roles: string[]): boolean {
  return roles.includes(ctx.role);
}
