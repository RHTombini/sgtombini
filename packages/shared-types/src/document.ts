import type { UUID, ISODateTime } from './common';

export type DocumentState =
  | 'draft'
  | 'awaiting_submission'
  | 'awaiting_approval'
  | 'in_review'
  | 'awaiting_changes'
  | 'resubmitted'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'closed';

export type ApprovalMode = 'sequential' | 'parallel';

export type ApproverDecision =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'changes_requested';

export interface DocumentApprover {
  id: UUID;
  documentId: UUID;
  designatedApproverId: UUID;
  effectiveApproverId: UUID | null;
  orderIndex: number;
  groupId: string | null;
  mode: ApprovalMode;
  decision: ApproverDecision;
  decidedAt: ISODateTime | null;
  comment: string | null;
}

export interface DocumentVersion {
  id: UUID;
  documentId: UUID;
  versionNumber: number;
  storagePath: string;
  uploadedBy: UUID;
  uploadedAt: ISODateTime;
  isApproved: boolean;
}

export interface DocumentRequest {
  id: UUID;
  title: string;
  documentType: string;
  description: string;
  requesterId: UUID;
  submittedAt: ISODateTime | null;
  unitId: UUID;
  departmentId: UUID;
  confidentialityLevel: 'internal' | 'restricted' | 'confidential' | null;
  deadline: ISODateTime | null;
  state: DocumentState;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface DocumentCreateInput {
  title: string;
  documentType: string;
  description: string;
  unitId: UUID;
  departmentId: UUID;
  confidentialityLevel?: 'internal' | 'restricted' | 'confidential' | null;
  deadline?: ISODateTime | null;
}

export interface ApproverAssignmentInput {
  approverId: UUID;
  orderIndex: number;
  groupId?: string | null;
  mode: ApprovalMode;
}

export interface DocumentDecisionInput {
  decision: 'approved' | 'rejected' | 'changes_requested';
  comment?: string;
}
