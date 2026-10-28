import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { listBirthdaysByMonth } from '../repositories/birthdays';

export async function handleBirthdays(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh', 'gestor', 'auditor', 'consulta'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const url = new URL(request.url);
  const monthParam = url.searchParams.get('month');
  const month = monthParam ? Number(monthParam) : new Date().getMonth() + 1;

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return json({ error: { code: 'INVALID_INPUT', message: 'Mês inválido' } }, 400);
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const items = await listBirthdaysByMonth(supabase, month);

  return json({ data: { month, items } });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
