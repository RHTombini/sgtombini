import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tjkoywwwqknysdccwzvx.supabase.co';
const supabaseKey = 'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2';

// Cria uma única instância para todo o sistema
export const supabase = createClient(supabaseUrl, supabaseKey);
