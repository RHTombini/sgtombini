import { documentDecisionSchema } from '@sgt/validation';
import type { Env } from '../env';
import { authenticate } from '../auth';
import { createSupabaseClient } from '../supabase';
import { listApprovers, decideApproval, getDocument, updateDocumentState } from '../repositories/documents';
import { sendAudit } from '../audit-client';

export async function handleDecide(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);

  const body = await request.json().catch(() => null);
  const parsed = documentDecisionSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Dados inválidos', details: parsed.error.flatten() } },
      400
    );
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const approvers = await listApprovers(supabase, id);
  const own = approvers.find(
    (a) => a.designatedApproverId === ctx.userId || a.effectiveApproverId === ctx.userId
  );

  if (!own) {
    return json({ error: { code: 'FORBIDDEN', message: 'Você não é aprovador deste documento' } }, 403);
  }

  if (own.decision !== 'pending') {
    return json({ error: { code: 'INVALID_STATE', message: 'Decisão já registrada' } }, 409);
  }

  const decided = await decideApproval(
    supabase,
    own.id,
    parsed.data.decision,
    parsed.data.comment ?? null
  );

  // Determina o novo estado do documento
  const updatedApprovers = await listApprovers(supabase, id);
  const allDecided = updatedApprovers.every((a) => a.decision !== 'pending');
  const anyRejected = updatedApprovers.some((a) => a.decision === 'rejected');
  const anyChanges = updatedApprovers.some((a) => a.decision === 'changes_requested');

  let newState: string | null = null;
  if (anyRejected) newState = 'rejected';
  else if (anyChanges) newState = 'awaiting_changes';
  else if (allDecided) newState = 'approved';

  if (newState) await updateDocumentState(supabase, id, newState);

  const doc = await getDocument(supabase, id);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action:
      parsed.data.decision === 'approved'
        ? 'document.approved'
        : parsed.data.decision === 'rejected'
        ? 'document.rejected'
        : 'document.changes_requested',
    entityType: 'document',
    entityId: id,
    module: 'document-approval',
    before: { decision: own.decision },
    after: { decision: decided.decision, state: newState ?? doc?.state },
    metadata: { comment: parsed.data.comment ?? null },
    requestId: crypto.randomUUID(),
  });

  return json({ data: { approver: decided, document: doc } });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
