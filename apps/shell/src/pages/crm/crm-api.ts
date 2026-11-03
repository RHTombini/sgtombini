import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

export const suppliersApi = {
  async list() {
    const { data, error } = await supabase
      .from('crm_suppliers')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw new Error(error.message);
    return data;
  }
};
