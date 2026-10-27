import { z } from 'zod';
import type { Env } from '../env';
import { createSupabaseClient } from '../supabase';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function handleLogin(request: Request, env: Env): Promise<Response> {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return json({ error: { code: 'INVALID_INPUT', message: 'Dados inválidos' } }, 400);
  }

  const supabase = createSupabaseClient(env);
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.session) {
    return json(
      { error: { code: 'AUTH_FAILED', message: 'Credenciais inválidas' } },
      401
    );
  }

  return json({
    data: {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    },
  });
}

export async function handleRefresh(request: Request, env: Env): Promise<Response> {
  const body = (await request.json().catch(() => null)) as { refreshToken?: string } | null;
  if (!body?.refreshToken) {
    return json({ error: { code: 'INVALID_INPUT', message: 'refreshToken obrigatório' } }, 400);
  }

  const supabase = createSupabaseClient(env);
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: body.refreshToken,
  });

  if (error || !data.session) {
    return json({ error: { code: 'REFRESH_FAILED', message: 'Sessão inválida' } }, 401);
  }

  return json({
    data: {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
    },
  });
}

export async function handleLogout(request: Request, env: Env): Promise<Response> {
  const auth = request.headers.get('Authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (token) {
    const supabase = createSupabaseClient(env);
    await supabase.auth.signOut().catch(() => undefined);
  }

  return json({ data: { ok: true } });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
