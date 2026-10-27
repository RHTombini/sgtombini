-- 0007 — Notificações internas

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null,
  payload jsonb not null,
  dedup_key text not null,
  read_at timestamptz,
  sent_at timestamptz,
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'failed')),
  created_at timestamptz not null default now(),
  unique (user_id, dedup_key)
);

create index notifications_user_idx on public.notifications(user_id);
create index notifications_status_idx on public.notifications(status);

alter table public.notifications enable row level security;

create policy "notif_read_own"
  on public.notifications for select
  to authenticated
  using (user_id = public.jwt_sub());

create policy "notif_update_own"
  on public.notifications for update
  to authenticated
  using (user_id = public.jwt_sub())
  with check (user_id = public.jwt_sub());

-- Inserção apenas via service_role (workers de negócio)
