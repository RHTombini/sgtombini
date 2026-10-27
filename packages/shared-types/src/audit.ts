import type { UUID, ISODateTime } from './common';

export type AuditAction =
  | 'employee.created'
  | 'employee.updated'
  | 'employee.status_changed'
  | 'employee.imported'
  | 'vacation.created'
  | 'vacation.updated'
  | 'document.created'
  | 'document.submitted'
  | 'document.approved'
  | 'document.rejected'
  | 'document.changes_requested'
  | 'document.version_added'
  | 'document.cancelled'
  | 'approver.assigned'
  | 'approver.decided';

export interface AuditEvent {
  id: UUID;
  occurredAt: ISODateTime;
  actorId: UUID;
  actorRole: string;
  action: AuditAction;
  entityType: 'employee' | 'vacation' | 'document' | 'approver';
  entityId: UUID;
  module: 'employee-management' | 'document-approval' | 'identity' | 'audit';
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  requestId: string;
}
