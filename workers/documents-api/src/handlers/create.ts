import { documentCreateSchema } from '@sgt/validation';
import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { createDocument } from '../repositories/documents';
import { sendAudit } from '../audit-client';

export async function handleCreate(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh', 'gestor'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = documentCreateSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Dados inválidos', details: parsed.error.flatten() } },
      400
    );
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const created = await createDocument(supabase, parsed.data, ctx.userId);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'document.created',
    entityType: 'document',
    entityId: created.id,
    module: 'document-approval',
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
