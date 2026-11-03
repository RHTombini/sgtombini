import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env as cloudflareEnv } from 'cloudflare:workers';
import type { Env } from './env';

export function createSupabaseClient(env: Env): SupabaseClient {
  // Tenta pegar do env do fetch, se falhar, pega direto do módulo do Cloudflare
  const url = env?.SUPABASE_URL || cloudflareEnv.SUPABASE_URL;
  const key = env?.SUPABASE_ANON_KEY || cloudflareEnv.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(`Configuração ausente no Worker: URL=${!!url}, KEY=${!!key}`);
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
  const url = env?.SUPABASE_URL || cloudflareEnv.SUPABASE_URL;
  const key = env?.SUPABASE_SERVICE_ROLE_KEY || cloudflareEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(`Configuração ausente no Worker: URL=${!!url}, SERVICE_ROLE=${!!key}`);
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
