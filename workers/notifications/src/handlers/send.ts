import { z } from 'zod';
import type { Env } from '../env';
import { createSupabaseAdmin } from '../supabase';

const sendSchema = z.object({
  userId: z.string().uuid(),
  type: z.string().min(1),
  payload: z.record(z.unknown()),
  dedupKey: z.string().min(1),
});

export async function handleSend(request: Request, env: Env): Promise<Response> {
  const token = request.headers.get('X-Internal-Token');
  if (!token || token !== env.NOTIFICATIONS_INTERNAL_TOKEN) {
    return json({ error: { code: 'FORBIDDEN', message: 'Token interno inválido' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = sendSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Notificação inválida', details: parsed.error.flatten() } },
      400
    );
  }

  const supabase = createSupabaseAdmin(env);

  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: parsed.data.userId,
      type: parsed.data.type,
      payload: parsed.data.payload,
      dedup_key: parsed.data.dedupKey,
      status: 'pending',
    })
    .select('id')
    .maybeSingle();

  if (error) {
    // Conflito de deduplicação: a notificação já existia.
    if (error.code === '23505') {
      return json({ data: { ok: true, duplicated: true } }, 200);
    }
    return json({ error: { code: 'WRITE_FAILED', message: error.message } }, 500);
  }

  return json({ data: { ok: true, id: data?.id ?? null } }, 201);
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
