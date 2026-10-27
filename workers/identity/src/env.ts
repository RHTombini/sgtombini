export interface Env {
  ENVIRONMENT: 'development' | 'staging' | 'production';
  ALLOWED_ORIGINS: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  JWT_SECRET: string;
}

export function parseAllowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(',')
    .map((o) => o.trim())
    .filter((o) => o.length > 0);
}
