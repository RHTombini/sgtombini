import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import { getDocument, listApprovers, listVersions } from '../repositories/documents';

export async function handleGet(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh', 'gestor', 'auditor', 'consulta'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const doc = await getDocument(supabase, id);
  if (!doc) {
    return json({ error: { code: 'NOT_FOUND', message: 'Documento não encontrado' } }, 404);
  }

  const [approvers, versions] = await Promise.all([
    listApprovers(supabase, id),
    listVersions(supabase, id),
  ]);

  return json({ data: { document: doc, approvers, versions } });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
