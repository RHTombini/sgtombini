import type { SupabaseClient } from '@supabase/supabase-js';
import type { Employee, EmployeeCreateInput, EmployeeUpdateInput } from '@sgt/shared-types';

const TABLE = 'emp_employees';

export async function listEmployees(
  supabase: SupabaseClient,
  filters: { search?: string; unitId?: string; departmentId?: string; status?: string; page: number; pageSize: number }
): Promise<{ items: Employee[]; total: number }> {
  let query = supabase.from(TABLE).select('*', { count: 'exact' });

  if (filters.search) query = query.ilike('full_name', `%${filters.search}%`);
  if (filters.unitId) query = query.eq('unit_id', filters.unitId);
  if (filters.departmentId) query = query.eq('department_id', filters.departmentId);
  if (filters.status) query = query.eq('status', filters.status);

  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  const { data, error, count } = await query
    .order('full_name', { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { items: (data ?? []) as Employee[], total: count ?? 0 };
}

export async function getEmployee(supabase: SupabaseClient, id: string): Promise<Employee | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Employee | null) ?? null;
}

export async function createEmployee(
  supabase: SupabaseClient,
  input: EmployeeCreateInput,
  actorId: string
): Promise<Employee> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      full_name: input.fullName,
      role: input.role,
      department_id: input.departmentId,
      unit_id: input.unitId,
      birth_date: input.birthDate,
      start_date: input.startDate,
      corporate_email: input.corporateEmail ?? null,
      mobile_phone: input.mobilePhone ?? null,
      status: 'active',
      created_by: actorId,
      updated_by: actorId,
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Employee;
}

export async function updateEmployee(
  supabase: SupabaseClient,
  id: string,
  input: EmployeeUpdateInput,
  actorId: string
): Promise<Employee> {
  const patch: Record<string, unknown> = { updated_by: actorId };
  if (input.fullName !== undefined) patch.full_name = input.fullName;
  if (input.role !== undefined) patch.role = input.role;
  if (input.departmentId !== undefined) patch.department_id = input.departmentId;
  if (input.unitId !== undefined) patch.unit_id = input.unitId;
  if (input.birthDate !== undefined) patch.birth_date = input.birthDate;
  if (input.startDate !== undefined) patch.start_date = input.startDate;
  if (input.corporateEmail !== undefined) patch.corporate_email = input.corporateEmail;
  if (input.mobilePhone !== undefined) patch.mobile_phone = input.mobilePhone;
  if (input.status !== undefined) patch.status = input.status;

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Employee;
}

export async function findDuplicates(
  supabase: SupabaseClient,
  input: { fullName: string; birthDate: string; unitId: string }
): Promise<Employee[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('full_name', input.fullName)
    .eq('birth_date', input.birthDate)
    .eq('unit_id', input.unitId);

  if (error) throw new Error(error.message);
  return (data ?? []) as Employee[];
}
