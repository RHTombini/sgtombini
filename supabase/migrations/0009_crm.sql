-- 0009 — CRM: fornecedores, endereços, tags, interações

create table public.crm_suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  document text,                       -- CNPJ ou CPF, sem validação nesta fase
  category text,
  email text,
  phone text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'blocked')),
  notes text,
  created_by uuid not null,
  updated_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index crm_suppliers_name_idx on public.crm_suppliers(name);
create index crm_suppliers_status_idx on public.crm_suppliers(status);

create trigger crm_suppliers_set_updated_at
before update on public.crm_suppliers
for each row execute function public.set_updated_at();

alter table public.crm_suppliers enable row level security;

create policy "crm_suppliers_read"
  on public.crm_suppliers for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'consulta'));

create policy "crm_suppliers_write"
  on public.crm_suppliers for insert
  to authenticated
  with check (public.jwt_role() in ('admin', 'rh'));

create policy "crm_suppliers_update"
  on public.crm_suppliers for update
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.crm_addresses (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references public.crm_suppliers(id) on delete cascade,
  employee_id uuid references public.emp_employees(id) on delete cascade,
  street text,
  number text,
  complement text,
  district text,
  city text,
  state text,                          -- UF, 2 letras
  zip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (supplier_id is not null and employee_id is null)
    or (supplier_id is null and employee_id is not null)
  )
);

create index crm_addresses_supplier_idx on public.crm_addresses(supplier_id);
create index crm_addresses_employee_idx on public.crm_addresses(employee_id);
create index crm_addresses_state_idx on public.crm_addresses(state);

create trigger crm_addresses_set_updated_at
before update on public.crm_addresses
for each row execute function public.set_updated_at();

alter table public.crm_addresses enable row level security;

create policy "crm_addresses_read"
  on public.crm_addresses for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'consulta'));

create policy "crm_addresses_write"
  on public.crm_addresses for insert
  to authenticated
  with check (public.jwt_role() in ('admin', 'rh'));

create policy "crm_addresses_update"
  on public.crm_addresses for update
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.crm_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

alter table public.crm_tags enable row level security;

create policy "crm_tags_read"
  on public.crm_tags for select
  to authenticated
  using (true);

create policy "crm_tags_write"
  on public.crm_tags for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.crm_supplier_tags (
  supplier_id uuid not null references public.crm_suppliers(id) on delete cascade,
  tag_id uuid not null references public.crm_tags(id) on delete cascade,
  primary key (supplier_id, tag_id)
);

alter table public.crm_supplier_tags enable row level security;

create policy "crm_supplier_tags_read"
  on public.crm_supplier_tags for select
  to authenticated
  using (true);

create policy "crm_supplier_tags_write"
  on public.crm_supplier_tags for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.crm_interactions (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references public.crm_suppliers(id) on delete cascade,
  employee_id uuid references public.emp_employees(id) on delete cascade,
  kind text not null,                  -- 'note', 'call', 'email', 'meeting'
  content text not null,
  occurred_at timestamptz not null default now(),
  created_by uuid not null,
  created_at timestamptz not null default now(),
  check (
    (supplier_id is not null and employee_id is null)
    or (supplier_id is null and employee_id is not null)
  )
);

create index crm_interactions_supplier_idx on public.crm_interactions(supplier_id);
create index crm_interactions_employee_idx on public.crm_interactions(employee_id);
create index crm_interactions_occurred_idx on public.crm_interactions(occurred_at desc);

alter table public.crm_interactions enable row level security;

create policy "crm_interactions_read"
  on public.crm_interactions for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'consulta'));

create policy "crm_interactions_write"
  on public.crm_interactions for insert
  to authenticated
  with check (public.jwt_role() in ('admin', 'rh', 'gestor'));
