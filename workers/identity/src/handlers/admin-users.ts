import { z } from 'zod';
import type { Env } from '../env';
import { createSupabaseAdmin } from '../supabase';

const roleSchema = z.object({
  role: z.enum(['admin', 'rh', 'gestor', 'auditor', 'consulta']),
});

export async function handleListUsers(request: Request, env: Env): Promise<Response> {
  const auth = request.headers.get('Authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return json({ error: { code: 'UNAUTHORIZED', message: 'Token ausente' } }, 401);

  // Verifica se quem chama é admin via JWT
  const admin = createSupabaseAdmin(env);
  const { data: caller } = await admin.auth.getUser(token);
  if (!caller.user) return json({ error: { code: 'UNAUTHORIZED', message: 'Token inválido' } }, 401);

  const callerRole = (caller.user.app_metadata?.role as string) ?? 'consulta';
  if (callerRole !== 'admin') {
    return json({ error: { code: 'FORBIDDEN', message: 'Apenas admin' } }, 403);
  }

  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 100 });
  if (error) return json({ error: { code: 'LIST_FAILED', message: error.message } }, 500);

  const users = (data.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    role: (u.app_metadata?.role as string) ?? 'consulta',
    createdAt: u.created_at,
  }));

  // Ordenação alfabética por e-mail
  users.sort((a, b) => (a.email ?? '').localeCompare(b.email ?? '', 'pt-BR', { sensitivity: 'base' }));

  return json({ data: users });
}

export async function handleUpdateUserRole(
  request: Request,
  env: Env,
  userId: string
): Promise<Response> {
  const auth = request.headers.get('Authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return json({ error: { code: 'UNAUTHORIZED', message: 'Token ausente' } }, 401);

  const admin = createSupabaseAdmin(env);
  const { data: caller } = await admin.auth.getUser(token);
  if (!caller.user) return json({ error: { code: 'UNAUTHORIZED', message: 'Token inválido' } }, 401);

  const callerRole = (caller.user.app_metadata?.role as string) ?? 'consulta';
  if (callerRole !== 'admin') {
    return json({ error: { code: 'FORBIDDEN', message: 'Apenas admin' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = roleSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: { code: 'INVALID_INPUT', message: 'Papel inválido' } }, 400);
  }

  const { error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { role: parsed.data.role },
  });

  if (error) return json({ error: { code: 'UPDATE_FAILED', message: error.message } }, 500);

  return json({ data: { ok: true } });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
