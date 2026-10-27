export interface Env {
  ENVIRONMENT: 'development' | 'staging' | 'production';
  ALLOWED_ORIGINS: string;
  IDENTITY_URL: string;
  AUDIT_URL: string;
  NOTIFICATIONS_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  AUDIT_INTERNAL_TOKEN: string;
}

export function parseAllowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(',')
    .map((o) => o.trim())
    .filter((o) => o.length > 0);
}
