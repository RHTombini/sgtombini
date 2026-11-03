import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

export const examsApi = {
  async list() {
    const { data, error } = await supabase
      .from('sms_exams')
      .select('*')
      .order('expiration_date', { ascending: true });
    if (error) throw new Error(error.message);
    return data;
  }
};
