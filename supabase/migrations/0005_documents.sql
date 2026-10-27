-- 0005 — Aprovação de documentos

create table public.doc_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  document_type text not null,
  description text not null,
  requester_id uuid not null references public.emp_employees(id) on delete restrict,
  submitted_at timestamptz,
  unit_id uuid not null references public.units(id),
  department_id uuid not null references public.departments(id),
  confidentiality_level text
    check (confidentiality_level in ('internal', 'restricted', 'confidential')),
  deadline timestamptz,
  state text not null default 'draft'
    check (state in ('draft', 'awaiting_submission', 'awaiting_approval', 'in_review',
                     'awaiting_changes', 'resubmitted', 'approved', 'rejected',
                     'cancelled', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index doc_requests_requester_idx on public.doc_requests(requester_id);
create index doc_requests_state_idx on public.doc_requests(state);
create index doc_requests_unit_idx on public.doc_requests(unit_id);

create trigger doc_requests_set_updated_at
before update on public.doc_requests
for each row execute function public.set_updated_at();

alter table public.doc_requests enable row level security;

create policy "doc_read_related"
  on public.doc_requests for select
  to authenticated
  using (
    public.jwt_role() in ('admin', 'auditor')
    or requester_id = public.jwt_sub()
    or exists (
      select 1 from public.doc_approvers a
      where a.document_id = doc_requests.id
        and a.designated_approver_id = public.jwt_sub()
    )
  );

create policy "doc_insert_requester"
  on public.doc_requests for insert
  to authenticated
  with check (requester_id = public.jwt_sub() or public.jwt_role() in ('admin', 'rh'));

create policy "doc_update_owner_or_admin"
  on public.doc_requests for update
  to authenticated
  using (requester_id = public.jwt_sub() or public.jwt_role() in ('admin', 'rh'))
  with check (requester_id = public.jwt_sub() or public.jwt_role() in ('admin', 'rh'));

-- Aprovadores
create table public.doc_approvers (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.doc_requests(id) on delete cascade,
  designated_approver_id uuid not null,
  effective_approver_id uuid,
  order_index integer not null,
  group_id text,
  mode text not null check (mode in ('sequential', 'parallel')),
  decision text not null default 'pending'
    check (decision in ('pending', 'approved', 'rejected', 'changes_requested')),
  decided_at timestamptz,
  comment text,
  created_at timestamptz not null default now()
);

create index doc_approvers_document_idx on public.doc_approvers(document_id);
create index doc_approvers_designated_idx on public.doc_approvers(designated_approver_id);

alter table public.doc_approvers enable row level security;

create policy "doc_approvers_read_related"
  on public.doc_approvers for select
  to authenticated
  using (
    public.jwt_role() in ('admin', 'auditor')
    or designated_approver_id = public.jwt_sub()
    or effective_approver_id = public.jwt_sub()
    or exists (
      select 1 from public.doc_requests r
      where r.id = doc_approvers.document_id
        and r.requester_id = public.jwt_sub()
    )
  );

create policy "doc_approvers_insert_admin_rh"
  on public.doc_approvers for insert
  to authenticated
  with check (public.jwt_role() in ('admin', 'rh'));

create policy "doc_approvers_update_self"
  on public.doc_approvers for update
  to authenticated
  using (designated_approver_id = public.jwt_sub() or effective_approver_id = public.jwt_sub())
  with check (designated_approver_id = public.jwt_sub() or effective_approver_id = public.jwt_sub());

-- Versões
create table public.doc_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.doc_requests(id) on delete cascade,
  version_number integer not null,
  storage_path text not null,
  uploaded_by uuid not null,
  uploaded_at timestamptz not null default now(),
  is_approved boolean not null default false,
  unique (document_id, version_number)
);

create index doc_versions_document_idx on public.doc_versions(document_id);

alter table public.doc_versions enable row level security;

create policy "doc_versions_read_related"
  on public.doc_versions for select
  to authenticated
  using (
    public.jwt_role() in ('admin', 'auditor')
    or exists (
      select 1 from public.doc_requests r
      where r.id = doc_versions.document_id
        and (
          r.requester_id = public.jwt_sub()
          or exists (
            select 1 from public.doc_approvers a
            where a.document_id = r.id
              and (a.designated_approver_id = public.jwt_sub()
                   or a.effective_approver_id = public.jwt_sub())
          )
        )
    )
  );

create policy "doc_versions_insert_requester"
  on public.doc_versions for insert
  to authenticated
  with check (
    uploaded_by = public.jwt_sub()
    or public.jwt_role() in ('admin', 'rh')
  );
