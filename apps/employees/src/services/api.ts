import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
  PaginatedResponse,
} from '@sgt/shared-types';

const BASE = import.meta.env.VITE_EMPLOYEES_API_URL as string;
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

export const employeesApi = {
  async list(params: {
    search?: string;
    unitId?: string;
    departmentId?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Employee>> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') q.set(k, String(v));
    });
    const res = await fetch(`${BASE}/v1/employees?${q}`, { headers: authHeaders() });
    return handle(res);
  },

  async get(id: string): Promise<Employee> {
    const res = await fetch(`${BASE}/v1/employees/${id}`, { headers: authHeaders() });
    return handle(res);
  },

  async create(input: EmployeeCreateInput): Promise<Employee> {
    const res = await fetch(`${BASE}/v1/employees`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeaders() },
      body: JSON.stringify(input),
    });
    return handle(res);
  },

  async update(id: string, input: EmployeeUpdateInput): Promise<Employee> {
    const res = await fetch(`${BASE}/v1/employees/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeaders() },
      body: JSON.stringify(input),
    });
    return handle(res);
  },
};
