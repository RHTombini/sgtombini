import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Chaves fixas para garantir o funcionamento do login
const SUPABASE_URL = 'https://tjkoywwwqknysdccwzvx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2';

export function createSupabaseClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        apikey: SUPABASE_ANON_KEY, // A chave sb_publishable_ DEVE ir no apikey
      },
    },
  });
}

export function createSupabaseAdmin(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        apikey: SUPABASE_ANON_KEY,
      },
    },
  });
}
