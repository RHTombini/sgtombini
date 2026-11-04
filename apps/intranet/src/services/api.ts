import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

export const intraApi = {
  async getNews() {
    const { data, error } = await supabase
      .from('intra_news')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3);
    if (error) throw new Error(error.message);
    return data;
  }
};
