import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { getDocument, updateDocumentState, assignApprovers } from '../repositories/documents';
import { sendAudit } from '../audit-client';

export async function handleSubmit(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);

  const body = (await request.json().catch(() => null)) as
    | { approvers?: { approverId: string; orderIndex: number; groupId?: string | null; mode: 'sequential' | 'parallel' }[] }
    | null;

  if (!body?.approvers || body.approvers.length === 0) {
    return json({ error: { code: 'INVALID_INPUT', message: 'Aprovadores obrigatórios' } }, 400);
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const doc = await getDocument(supabase, id);
  if (!doc) {
    return json({ error: { code: 'NOT_FOUND', message: 'Documento não encontrado' } }, 404);
  }

  if (doc.requesterId !== ctx.userId && !requireRole(ctx, ['admin', 'rh'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  if (doc.state !== 'draft') {
    return json({ error: { code: 'INVALID_STATE', message: 'Documento não está em rascunho' } }, 409);
  }

  await assignApprovers(supabase, id, body.approvers);
  const updated = await updateDocumentState(supabase, id, 'awaiting_approval');

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'document.submitted',
    entityType: 'document',
    entityId: id,
    module: 'document-approval',
    after: updated as unknown as Record<string, unknown>,
    metadata: { approvers: body.approvers.length },
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
