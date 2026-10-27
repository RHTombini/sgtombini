-- 0004 — Férias

create table public.emp_vacation_rules (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  version text not null,
  valid_from date not null,
  valid_to date,
  accrual_months integer not null default 12,
  concessive_months integer not null default 12,
  alert_days_before integer not null default 90,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (source, version)
);

alter table public.emp_vacation_rules enable row level security;

create policy "vac_rules_read"
  on public.emp_vacation_rules for select
  to authenticated
  using (true);

create policy "vac_rules_write_admin_rh"
  on public.emp_vacation_rules for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.emp_vacation_periods (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.emp_employees(id) on delete cascade,
  rule_id uuid not null references public.emp_vacation_rules(id),
  accrual_start date not null,
  accrual_end date not null,
  concessive_end date not null,
  status text not null default 'pendente_dados'
    check (status in ('regular', 'a_vencer', 'proximo_limite', 'vencido_verificar',
                      'pendente_dados', 'programadas', 'concluido')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (accrual_end > accrual_start),
  check (concessive_end > accrual_end)
);

create index emp_vacation_periods_employee_idx on public.emp_vacation_periods(employee_id);
create index emp_vacation_periods_status_idx on public.emp_vacation_periods(status);

create trigger emp_vacation_periods_set_updated_at
before update on public.emp_vacation_periods
for each row execute function public.set_updated_at();

alter table public.emp_vacation_periods enable row level security;

create policy "vac_periods_read"
  on public.emp_vacation_periods for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'auditor'));

create policy "vac_periods_write_admin_rh"
  on public.emp_vacation_periods for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));

create table public.emp_vacation_grants (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.emp_vacation_periods(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  days integer not null check (days > 0),
  granted_by uuid not null,
  granted_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create index emp_vacation_grants_period_idx on public.emp_vacation_grants(period_id);

alter table public.emp_vacation_grants enable row level security;

create policy "vac_grants_read"
  on public.emp_vacation_grants for select
  to authenticated
  using (public.jwt_role() in ('admin', 'rh', 'gestor', 'auditor'));

create policy "vac_grants_write_admin_rh"
  on public.emp_vacation_grants for all
  to authenticated
  using (public.jwt_role() in ('admin', 'rh'))
  with check (public.jwt_role() in ('admin', 'rh'));
