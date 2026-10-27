-- 0006 — Auditoria

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  actor_id uuid not null,
  actor_role text not null,
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  module text not null,
  before jsonb,
  after jsonb,
  metadata jsonb,
  request_id text not null
);

create index audit_events_entity_idx on public.audit_events(entity_type, entity_id);
create index audit_events_occurred_at_idx on public.audit_events(occurred_at desc);
create index audit_events_actor_idx on public.audit_events(actor_id);

alter table public.audit_events enable row level security;

-- Leitura apenas por admin e auditor
create policy "audit_read_admin_auditor"
  on public.audit_events for select
  to authenticated
  using (public.jwt_role() in ('admin', 'auditor'));

-- Inserção apenas via service_role (worker de auditoria)
-- Usuários autenticados comuns não podem inserir
-- O worker de auditoria usa service_role e ignora RLS
