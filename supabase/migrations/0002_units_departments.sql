-- 0002 — Unidades e setores

create table public.units (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger units_set_updated_at
before update on public.units
for each row execute function public.set_updated_at();

alter table public.units enable row level security;

create policy "units_read_authenticated"
  on public.units for select
  to authenticated
  using (true);

create policy "units_write_admin_rh"
  on public.units for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  unit_id uuid not null references public.units(id) on delete restrict,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, unit_id)
);

create trigger departments_set_updated_at
before update on public.departments
for each row execute function public.set_updated_at();

create index departments_unit_id_idx on public.departments(unit_id);

alter table public.departments enable row level security;

create policy "departments_read_authenticated"
  on public.departments for select
  to authenticated
  using (true);

create policy "departments_write_admin_rh"
  on public.departments for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));
