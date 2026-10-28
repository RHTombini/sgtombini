import type { Env } from './env';

export interface AuditPayload {
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

export async function sendAudit(env: Env, payload: AuditPayload): Promise<void> {
  try {
    await fetch(`${env.AUDIT_URL}/v1/audit/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Internal-Token': env.AUDIT_INTERNAL_TOKEN,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // falha silenciosa de auditoria
  }
}
