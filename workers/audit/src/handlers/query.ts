import type { Env } from '../env';
import { createSupabaseAdmin } from '../supabase';

export async function handleQuery(request: Request, env: Env): Promise<Response> {
  const auth = request.headers.get('Authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    return json({ error: { code: 'UNAUTHORIZED', message: 'Token ausente' } }, 401);
  }

  const url = new URL(request.url);
  const entityType = url.searchParams.get('entityType');
  const entityId = url.searchParams.get('entityId');
  const limit = Math.min(Number(url.searchParams.get('limit') ?? '50'), 200);

  if (!entityType || !entityId) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'entityType e entityId são obrigatórios' } },
      400
    );
  }

  const supabase = createSupabaseAdmin(env);
  const { data, error } = await supabase
    .from('audit_events')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('occurred_at', { ascending: false })
    .limit(limit);

  if (error) {
    return json({ error: { code: 'QUERY_FAILED', message: error.message } }, 500);
  }

  return json({ data });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
