import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  DocumentRequest,
  DocumentApprover,
  DocumentVersion,
  DocumentCreateInput,
  ApproverAssignmentInput,
} from '@sgt/shared-types';

const DOCS = 'doc_requests';
const APPROVERS = 'doc_approvers';
const VERSIONS = 'doc_versions';

export async function listDocuments(
  supabase: SupabaseClient,
  filters: { state?: string; requesterId?: string; page: number; pageSize: number }
): Promise<{ items: DocumentRequest[]; total: number }> {
  let query = supabase.from(DOCS).select('*', { count: 'exact' });
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.requesterId) query = query.eq('requester_id', filters.requesterId);

  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { items: (data ?? []) as DocumentRequest[], total: count ?? 0 };
}

export async function getDocument(
  supabase: SupabaseClient,
  id: string
): Promise<DocumentRequest | null> {
  const { data, error } = await supabase.from(DOCS).select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as DocumentRequest | null) ?? null;
}

export async function createDocument(
  supabase: SupabaseClient,
  input: DocumentCreateInput,
  requesterId: string
): Promise<DocumentRequest> {
  const { data, error } = await supabase
    .from(DOCS)
    .insert({
      title: input.title,
      document_type: input.documentType,
      description: input.description,
      requester_id: requesterId,
      unit_id: input.unitId,
      department_id: input.departmentId,
      confidentiality_level: input.confidentialityLevel ?? null,
      deadline: input.deadline ?? null,
      state: 'draft',
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as DocumentRequest;
}

export async function updateDocumentState(
  supabase: SupabaseClient,
  id: string,
  state: string
): Promise<DocumentRequest> {
  const patch: Record<string, unknown> = { state };
  if (state === 'awaiting_approval') patch.submitted_at = new Date().toISOString();

  const { data, error } = await supabase
    .from(DOCS)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as DocumentRequest;
}

export async function assignApprovers(
  supabase: SupabaseClient,
  documentId: string,
  assignments: ApproverAssignmentInput[]
): Promise<void> {
  const rows = assignments.map((a) => ({
    document_id: documentId,
    designated_approver_id: a.approverId,
    order_index: a.orderIndex,
    group_id: a.groupId ?? null,
    mode: a.mode,
    decision: 'pending',
  }));

  const { error } = await supabase.from(APPROVERS).insert(rows);
  if (error) throw new Error(error.message);
}

export async function listApprovers(
  supabase: SupabaseClient,
  documentId: string
): Promise<DocumentApprover[]> {
  const { data, error } = await supabase
    .from(APPROVERS)
    .select('*')
    .eq('document_id', documentId)
    .order('order_index', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as DocumentApprover[];
}

export async function decideApproval(
  supabase: SupabaseClient,
  approverId: string,
  decision: 'approved' | 'rejected' | 'changes_requested',
  comment: string | null
): Promise<DocumentApprover> {
  const { data, error } = await supabase
    .from(APPROVERS)
    .update({
      decision,
      decided_at: new Date().toISOString(),
      comment,
      effective_approver_id: supabase.auth.getSession ? null : null,
    })
    .eq('id', approverId)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as DocumentApprover;
}

export async function addVersion(
  supabase: SupabaseClient,
  documentId: string,
  storagePath: string,
  uploadedBy: string
): Promise<DocumentVersion> {
  const { data: existing } = await supabase
    .from(VERSIONS)
    .select('version_number')
    .eq('document_id', documentId)
    .order('version_number', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextVersion = (existing?.version_number ?? 0) + 1;

  const { data, error } = await supabase
    .from(VERSIONS)
    .insert({
      document_id: documentId,
      version_number: nextVersion,
      storage_path: storagePath,
      uploaded_by: uploadedBy,
      is_approved: false,
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as DocumentVersion;
}

export async function listVersions(
  supabase: SupabaseClient,
  documentId: string
): Promise<DocumentVersion[]> {
  const { data, error } = await supabase
    .from(VERSIONS)
    .select('*')
    .eq('document_id', documentId)
    .order('version_number', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as DocumentVersion[];
}
