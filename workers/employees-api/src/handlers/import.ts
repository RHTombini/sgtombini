import { z } from 'zod';
import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { importEmployees } from '../repositories/import-jobs';
import { sendAudit } from '../audit-client';

const rowSchema = z.object({
  fullName: z.string().trim().min(3),
  role: z.string().trim().min(2),
  departmentId: z.string().uuid(),
  unitId: z.string().uuid(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  corporateEmail: z.string().email().nullable().optional(),
  mobilePhone: z.string().nullable().optional(),
});

const bodySchema = z.object({
  rows: z.array(rowSchema).min(1).max(500),
});

export async function handleImport(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Dados inválidos', details: parsed.error.flatten() } },
      400
    );
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const result = await importEmployees(supabase, parsed.data.rows, ctx.userId);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'employee.imported',
    entityType: 'employee',
    entityId: crypto.randomUUID(),
    module: 'employee-management',
    metadata: {
      total: parsed.data.rows.length,
      inserted: result.inserted,
      skipped: result.skipped,
      errors: result.errors.length,
    },
    requestId: crypto.randomUUID(),
  });

  return json({ data: result }, 201);
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
