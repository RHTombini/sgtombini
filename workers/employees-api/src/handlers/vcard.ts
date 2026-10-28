import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { getEmployee } from '../repositories/employees';

export async function handleVcard(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh', 'gestor', 'consulta'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const employee = await getEmployee(supabase, id);
  if (!employee) {
    return json({ error: { code: 'NOT_FOUND', message: 'Colaborador não encontrado' } }, 404);
  }

  return json({
    data: {
      id: employee.id,
      fullName: employee.fullName,
      role: employee.role,
      email: employee.corporateEmail,
      phone: employee.mobilePhone,
    },
  });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
