import { employeeUpdateSchema } from '@sgt/validation';
import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { getEmployee, updateEmployee } from '../repositories/employees';
import { sendAudit } from '../audit-client';

export async function handleUpdate(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = employeeUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Dados inválidos', details: parsed.error.flatten() } },
      400
    );
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const before = await getEmployee(supabase, id);
  if (!before) {
    return json({ error: { code: 'NOT_FOUND', message: 'Colaborador não encontrado' } }, 404);
  }

  const updated = await updateEmployee(supabase, id, parsed.data, ctx.userId);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'employee.updated',
    entityType: 'employee',
    entityId: id,
    module: 'employee-management',
    before: before as unknown as Record<string, unknown>,
    after: updated as unknown as Record<string, unknown>,
    requestId: crypto.randomUUID(),
  });

  return json({ data: updated });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
