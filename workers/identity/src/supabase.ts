import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from 'cloudflare:workers';

export function createSupabaseClient(): SupabaseClient {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;

  console.log('DIAGNOSTICO - URL:', url ? 'OK' : 'VAZIA');
  console.log('DIAGNOSTICO - KEY:', key ? 'OK' : 'VAZIA');

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

export function createSupabaseAdmin(): SupabaseClient {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

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
