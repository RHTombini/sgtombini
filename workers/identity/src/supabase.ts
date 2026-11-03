import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Env } from './env';

export function createSupabaseClient(env: Env): SupabaseClient {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Configuração do Supabase ausente no Worker (URL ou KEY)');
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        apikey: key,
      },
    },
  });
}

export function createSupabaseAdmin(env: Env): SupabaseClient {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Configuração do Supabase ausente no Worker (URL ou SERVICE_ROLE)');
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        apikey: key,
      },
    },
  });
}
