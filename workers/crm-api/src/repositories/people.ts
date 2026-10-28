import type { SupabaseClient } from '@supabase/supabase-js';

export interface PersonRow {
  id: string;
  fullName: string;
  role: string;
  unitId: string;
  departmentId: string;
  status: string;
  state: string | null;
}

export async function listPeople(
  supabase: SupabaseClient,
  filters: {
    search?: string;
    unitId?: string;
    departmentId?: string;
    role?: string;
    status?: string;
    state?: string;
    page: number;
    pageSize: number;
  }
): Promise<{ items: PersonRow[]; total: number }> {
  let query = supabase
    .from('emp_employees')
    .select('id, full_name, role, unit_id, department_id, status', { count: 'exact' });

  if (filters.search) query = query.ilike('full_name', `%${filters.search}%`);
  if (filters.unitId) query = query.eq('unit_id', filters.unitId);
  if (filters.departmentId) query = query.eq('department_id', filters.departmentId);
  if (filters.role) query = query.ilike('role', `%${filters.role}%`);
  if (filters.status) query = query.eq('status', filters.status);

  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  const { data, error, count } = await query
    .order('full_name', { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  const employees = (data ?? []) as Array<{
    id: string;
    full_name: string;
    role: string;
    unit_id: string;
    department_id: string;
    status: string;
  }>;

  const ids = employees.map((e) => e.id);
  const statesByEmployee = new Map<string, string>();
  if (ids.length > 0) {
    const { data: addresses } = await supabase
      .from('crm_addresses')
      .select('employee_id, state')
      .in('employee_id', ids);
    for (const a of addresses ?? []) {
      if (a.state) statesByEmployee.set(a.employee_id as string, a.state as string);
    }
  }

  const items: PersonRow[] = employees
    .map((e) => ({
      id: e.id,
      fullName: e.full_name,
      role: e.role,
      unitId: e.unit_id,
      departmentId: e.department_id,
      status: e.status,
      state: statesByEmployee.get(e.id) ?? null,
    }))
    .filter((p) => (filters.state ? p.state === filters.state : true));

  return { items, total: count ?? items.length };
}
