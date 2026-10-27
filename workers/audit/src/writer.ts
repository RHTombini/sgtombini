import type { Env } from './env';
import { createSupabaseAdmin } from './supabase';
import { redact } from './redact';

export interface AuditEventInput {
  actorId: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  module: string;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
  requestId: string;
}

export async function writeAuditEvent(env: Env, input: AuditEventInput): Promise<void> {
  const supabase = createSupabaseAdmin(env);

  const { error } = await supabase.from('audit_events').insert({
    actor_id: input.actorId,
    actor_role: input.actorRole,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId,
    module: input.module,
    before: input.before ? redact(input.before) : null,
    after: input.after ? redact(input.after) : null,
    metadata: input.metadata ? redact(input.metadata) : null,
    request_id: input.requestId,
  });

  if (error) {
    throw new Error(`Falha ao gravar auditoria: ${error.message}`);
  }
}
