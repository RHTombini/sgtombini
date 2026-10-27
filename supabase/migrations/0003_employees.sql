-- 0003 — Colaboradores e histórico

create table public.emp_employees (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  department_id uuid not null references public.departments(id) on delete restrict,
  unit_id uuid not null references public.units(id) on delete restrict,
  birth_date date not null,
  registration_date timestamptz not null default now(),
  start_date date not null,
  corporate_email text,
  mobile_phone text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'terminated', 'pending_data')),
  created_by uuid not null,
  updated_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index emp_employees_unit_id_idx on public.emp_employees(unit_id);
create index emp_employees_department_id_idx on public.emp_employees(department_id);
create index emp_employees_status_idx on public.emp_employees(status);
create index emp_employees_full_name_idx on public.emp_employees(full_name);

create unique index emp_employees_dedup_idx
  on public.emp_employees(full_name, birth_date, unit_id);

create trigger emp_employees_set_updated_at
before update on public.emp_employees
for each row execute function public.set_updated_at();

alter table public.emp_employees enable row level security;

-- Leitura: admin, rh, gestor, auditor, consulta
create policy "emp_read_authenticated"
  on public.emp_employees for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'auditor', 'consulta'));

-- Escrita: apenas admin e rh
create policy "emp_write_admin_rh"
  on public.emp_employees for insert
  to authenticated
  with check (public.jwt_role() in ('admin', 'rh'));

create policy "emp_update_admin_rh"
  on public.emp_employees for update
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

-- Sem delete: desligamento é feito por status, não por exclusão

-- Histórico de cargo/setor/unidade
create table public.emp_position_history (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.emp_employees(id) on delete cascade,
  role text not null,
  department_id uuid not null references public.departments(id),
  unit_id uuid not null references public.units(id),
  valid_from date not null,
  valid_to date,
  changed_by uuid not null,
  created_at timestamptz not null default now(),
  check (valid_to is null or valid_to >= valid_from)
);

create index emp_position_history_employee_idx on public.emp_position_history(employee_id);

alter table public.emp_position_history enable row level security;

create policy "emp_history_read"
  on public.emp_position_history for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'auditor'));

create policy "emp_history_write_admin_rh"
  on public.emp_position_history for insert
  to authenticated
  with check (public.jwt_role() in ('admin', 'rh'));
