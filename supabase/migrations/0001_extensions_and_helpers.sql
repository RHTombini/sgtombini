-- 0001 — Extensões e funções auxiliares
-- Executar primeiro no SQL Editor do Supabase.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Lê o papel do JWT:
-- 1) user_role (injetado pela Auth Hook 0010)
-- 2) app_metadata.role (fallback, usado pelo Admin API)
-- 3) 'consulta' (padrão)
create or replace function public.jwt_role()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'user_role', ''),
    nullif(current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'role', ''),
    'consulta'
  );
$$;

create or replace function public.jwt_sub()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'sub', '')::uuid;
$$;
