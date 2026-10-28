import type { SupabaseClient } from '@supabase/supabase-js';

export interface BirthdayEntry {
  day: number;
  month: number;
  displayName: string;
}

export async function listBirthdaysByMonth(
  supabase: SupabaseClient,
  month: number
): Promise<BirthdayEntry[]> {
  const { data, error } = await supabase
    .from('emp_employees')
    .select('full_name, birth_date, status')
    .eq('status', 'active');

  if (error) throw new Error(error.message);

  const result: BirthdayEntry[] = [];

  for (const row of data ?? []) {
    const birth = String(row.birth_date);
    const [, monthStr, dayStr] = birth.split('-');
    if (Number(monthStr) !== month) continue;

    result.push({
      day: Number(dayStr),
      month: Number(monthStr),
      displayName: displayName(row.full_name as string),
    });
  }

  return result.sort((a, b) => a.day - b.day);
}

function displayName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0] ?? '';
  return first;
}
