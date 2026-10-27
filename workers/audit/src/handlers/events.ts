import { z } from 'zod';
import type { Env } from '../env';
import { writeAuditEvent } from '../writer';

const eventSchema = z.object({
  actorId: z.string().uuid(),
  actorRole: z.string().min(1),
  action: z.string().min(1),
  entityType: z.string().min(1),
  entityId: z.string().uuid(),
  module: z.string().min(1),
  before: z.record(z.unknown()).nullable().optional(),
  after: z.record(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  requestId: z.string().min(1),
});

export async function handleEvents(request: Request, env: Env): Promise<Response> {
  const token = request.headers.get('X-Internal-Token');
  if (!token || token !== env.AUDIT_INTERNAL_TOKEN) {
    return json({ error: { code: 'FORBIDDEN', message: 'Token interno inválido' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: { code: 'INVALID_INPUT', message: 'Evento inválido', details: parsed.error.flatten() } },
      400
    );
  }

  try {
    await writeAuditEvent(env, parsed.data);
    return json({ data: { ok: true } }, 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro ao gravar';
    return json({ error: { code: 'WRITE_FAILED', message } }, 500);
  }
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
