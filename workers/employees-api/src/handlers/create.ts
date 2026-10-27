import { employeeCreateSchema } from '@sgt/validation';
import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { createEmployee, findDuplicates } from '../repositories/employees';
import { sendAudit } from '../audit-client';

export async function handleCreate(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = employeeCreateSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Dados inválidos', details: parsed.error.flatten() } },
      400
    );
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);

  const duplicates = await findDuplicates(supabase, {
    fullName: parsed.data.fullName,
    birthDate: parsed.data.birthDate,
    unitId: parsed.data.unitId,
  });

  if (duplicates.length > 0) {
    return json(
      {
        error: {
          code: 'DUPLICATE',
          message: 'Já existe colaborador com mesmo nome, data de nascimento e unidade',
          details: { existingIds: duplicates.map((d) => d.id) },
        },
      },
      409
    );
  }

  const created = await createEmployee(supabase, parsed.data, ctx.userId);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'employee.created',
    entityType: 'employee',
    entityId: created.id,
    module: 'employee-management',
    after: created as unknown as Record<string, unknown>,
    requestId: crypto.randomUUID(),
  });

  return json({ data: created }, 201);
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
