-- 0001 — Extensões e funções auxiliares
-- Executar primeiro no SQL Editor do Supabase.

create extension if not exists "pgcrypto";

-- Função para atualizar updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Função para extrair o role do JWT (app_metadata.role)
create or replace function public.jwt_role()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'role', ''),
    'consulta'
  );
$$;

-- Função para extrair o user_id do JWT (sub)
create or replace function public.jwt_sub()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'sub', '')::uuid;
$$;
