import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { listEmployees } from '../repositories/employees';

export async function handleList(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh', 'gestor', 'consulta', 'auditor'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize') ?? '20')));

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const result = await listEmployees(supabase, {
    search: url.searchParams.get('search') ?? undefined,
    unitId: url.searchParams.get('unitId') ?? undefined,
    departmentId: url.searchParams.get('departmentId') ?? undefined,
    status: url.searchParams.get('status') ?? undefined,
    page,
    pageSize,
  });

  return json({ data: result });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
