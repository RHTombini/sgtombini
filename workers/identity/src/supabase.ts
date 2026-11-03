import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Env } from './env';

export function createSupabaseClient(_env: Env): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(`Configuração ausente: URL=${!!url}, KEY=${!!key}`);
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

export function createSupabaseAdmin(_env: Env): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(`Configuração ausente: URL=${!!url}, SERVICE_ROLE=${!!key}`);
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
