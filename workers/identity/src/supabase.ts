import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Env } from './env';

export function createSupabaseClient(env: Env): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        // A chave sb_publishable_... NÃO é um JWT. Ela deve ir apenas no cabeçalho 'apikey'.
        // O SDK por padrão tenta colocar no 'Authorization', o que causa o erro 500.
        // Esta configuração força o uso correto.
        apikey: env.SUPABASE_ANON_KEY,
      },
    },
  });
}

export function createSupabaseAdmin(env: Env): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      },
    },
  });
}
