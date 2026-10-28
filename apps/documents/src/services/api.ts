import type {
  DocumentRequest,
  DocumentApprover,
  DocumentVersion,
  DocumentCreateInput,
  ApproverAssignmentInput,
  DocumentDecisionInput,
  PaginatedResponse,
} from '@sgt/shared-types';

const BASE = import.meta.env.VITE_DOCUMENTS_API_URL as string;
const TOKEN_KEY = 'sgt.access_token';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message ?? `Erro ${res.status}`;
    throw new Error(message);
  }
  const payload = (await res.json()) as { data: T };
  return payload.data;
}

export const documentsApi = {
  async list(params: {
    state?: string;
    requesterId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<DocumentRequest>> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') q.set(k, String(v));
    });
    const res = await fetch(`${BASE}/v1/documents?${q}`, { headers: authHeaders() });
    return handle(res);
  },

  async get(id: string): Promise<{
    document: DocumentRequest;
    approvers: DocumentApprover[];
    versions: DocumentVersion[];
  }> {
    const res = await fetch(`${BASE}/v1/documents/${id}`, { headers: authHeaders() });
    return handle(res);
  },

  async create(input: DocumentCreateInput): Promise<DocumentRequest> {
    const res = await fetch(`${BASE}/v1/documents`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeaders() },
      body: JSON.stringify(input),
    });
    return handle(res);
  },

  async submit(id: string, approvers: ApproverAssignmentInput[]): Promise<DocumentRequest> {
    const res = await fetch(`${BASE}/v1/documents/${id}/submit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ approvers }),
    });
    return handle(res);
  },

  async decide(id: string, input: DocumentDecisionInput): Promise<{
    approver: DocumentApprover;
    document: DocumentRequest;
  }> {
    const res = await fetch(`${BASE}/v1/documents/${id}/decide`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeaders() },
      body: JSON.stringify(input),
    });
    return handle(res);
  },
};
