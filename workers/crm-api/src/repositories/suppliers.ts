import type { SupabaseClient } from '@supabase/supabase-js';

export interface Supplier {
  id: string;
  name: string;
  document: string | null;
  category: string | null;
  email: string | null;
  phone: string | null;
  status: 'active' | 'inactive' | 'blocked';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierInput {
  name: string;
  document?: string | null;
  category?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: 'active' | 'inactive' | 'blocked';
  notes?: string | null;
}

const TABLE = 'crm_suppliers';

export async function listSuppliers(
  supabase: SupabaseClient,
  filters: { search?: string; status?: string; category?: string; page: number; pageSize: number }
): Promise<{ items: Supplier[]; total: number }> {
  let query = supabase.from(TABLE).select('*', { count: 'exact' });

  if (filters.search) query = query.ilike('name', `%${filters.search}%`);
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.category) query = query.eq('category', filters.category);

  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  const { data, error, count } = await query
    .order('name', { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { items: (data ?? []) as Supplier[], total: count ?? 0 };
}

export async function getSupplier(supabase: SupabaseClient, id: string): Promise<Supplier | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Supplier | null) ?? null;
}

export async function createSupplier(
  supabase: SupabaseClient,
  input: SupplierInput,
  actorId: string
): Promise<Supplier> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      name: input.name,
      document: input.document ?? null,
      category: input.category ?? null,
      email: input.email ?? null,
      phone: input.phone ?? null,
      status: input.status ?? 'active',
      notes: input.notes ?? null,
      created_by: actorId,
      updated_by: actorId,
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Supplier;
}

export async function updateSupplier(
  supabase: SupabaseClient,
  id: string,
  input: Partial<SupplierInput>,
  actorId: string
): Promise<Supplier> {
  const patch: Record<string, unknown> = { updated_by: actorId };
  if (input.name !== undefined) patch.name = input.name;
  if (input.document !== undefined) patch.document = input.document;
  if (input.category !== undefined) patch.category = input.category;
  if (input.email !== undefined) patch.email = input.email;
  if (input.phone !== undefined) patch.phone = input.phone;
  if (input.status !== undefined) patch.status = input.status;
  if (input.notes !== undefined) patch.notes = input.notes;

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Supplier;
}
