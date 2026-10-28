import type { Person, Supplier } from './crm-types';

const BASE = import.meta.env.VITE_CRM_API_URL as string;
const TOKEN_KEY = 'sgt.access_token';

function headers(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token
    ? { Authorization: `Bearer ${token}`, 'content-type': 'application/json' }
    : { 'content-type': 'application/json' };
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? `Erro ${res.status}`);
  }
  const payload = (await res.json()) as { data: T };
  return payload.data;
}

export interface Paginated<T> {
  items: T[];
  total: number;
}

export const crmClient = {
  async listPeople(params: {
    search?: string;
    unitId?: string;
    departmentId?: string;
    role?: string;
    status?: string;
    state?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Paginated<Person>> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') q.set(k, String(v));
    });
    const res = await fetch(`${BASE}/v1/crm/people?${q}`, { headers: headers() });
    return handle(res);
  },

  async listSuppliers(params: {
    search?: string;
    status?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Paginated<Supplier>> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') q.set(k, String(v));
    });
    const res = await fetch(`${BASE}/v1/crm/suppliers?${q}`, { headers: headers() });
    return handle(res);
  },

  async createSupplier(input: {
    name: string;
    document?: string | null;
    category?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: 'active' | 'inactive' | 'blocked';
    notes?: string | null;
  }): Promise<Supplier> {
    const res = await fetch(`${BASE}/v1/crm/suppliers`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(input),
    });
    return handle(res);
  },
};
