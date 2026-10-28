import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmployeeCreateInput } from '@sgt/shared-types';

export interface ImportResult {
  inserted: number;
  skipped: number;
  errors: Array<{ rowIndex: number; reason: string }>;
}

export async function importEmployees(
  supabase: SupabaseClient,
  rows: EmployeeCreateInput[],
  actorId: string
): Promise<ImportResult> {
  const result: ImportResult = { inserted: 0, skipped: 0, errors: [] };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    try {
      const { data: existing, error: dupErr } = await supabase
        .from('emp_employees')
        .select('id')
        .eq('full_name', row.fullName)
        .eq('birth_date', row.birthDate)
        .eq('unit_id', row.unitId)
        .maybeSingle();

      if (dupErr) throw new Error(dupErr.message);
      if (existing) {
        result.skipped++;
        continue;
      }

      const { error } = await supabase.from('emp_employees').insert({
        full_name: row.fullName,
        role: row.role,
        department_id: row.departmentId,
        unit_id: row.unitId,
        birth_date: row.birthDate,
        start_date: row.startDate,
        corporate_email: row.corporateEmail ?? null,
        mobile_phone: row.mobilePhone ?? null,
        status: 'active',
        created_by: actorId,
        updated_by: actorId,
      });

      if (error) throw new Error(error.message);
      result.inserted++;
    } catch (err) {
      result.errors.push({
        rowIndex: i,
        reason: err instanceof Error ? err.message : 'Erro desconhecido',
      });
    }
  }

  return result;
}
