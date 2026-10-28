# Deploy no Cloudflare

Este documento descreve como publicar o SGT e a intranet no Cloudflare, após todos os arquivos estarem no GitHub.

## Pré-requisitos

- Conta Cloudflare (plano gratuito).
- Repositório `RHTombini/sgtombini` no GitHub.
- Projeto Supabase criado (banco, auth, storage) — necessário apenas para o SGT funcionar; a intranet pode ir ao ar antes.

## Visão geral dos projetos

| Projeto | Tipo | Root directory | Build command | Output |
|---|---|---|---|---|
| `sgt-shell` | Pages | `apps/shell` | `pnpm install && pnpm --filter @sgt/shell build` | `dist` |
| `sgt-employees` | Pages | `apps/employees` | `pnpm install && pnpm --filter @sgt/employees build` | `dist` |
| `sgt-documents` | Pages | `apps/documents` | `pnpm install && pnpm --filter @sgt/documents build` | `dist` |
| `sgt-intranet` | Pages | `apps/intranet` | `pnpm install && pnpm --filter @sgt/intranet build` | `dist` |
| `sgt-identity` | Worker | `workers/identity` | `npx wrangler deploy` | — |
| `sgt-employees-api` | Worker | `workers/employees-api` | `npx wrangler deploy` | — |
| `sgt-documents-api` | Worker | `workers/documents-api` | `npx wrangler deploy` | — |
| `sgt-crm-api` | Worker | `workers/crm-api` | `npx wrangler deploy` | — |
| `sgt-audit` | Worker | `workers/audit` | `npx wrangler deploy` | — |
| `sgt-notifications` | Worker | `workers/notifications` | `npx wrangler deploy` | — |

## Passo a passo — Pages

1. No dashboard do Cloudflare, acesse **Workers & Pages → Create → Pages → Connect to Git**.
2. Selecione o repositório `RHTombini/sgtombini`.
3. Preencha:
   - **Project name:** `sgt-shell` (ou o nome do app).
   - **Production branch:** `main`.
   - **Framework preset:** Vite.
   - **Root directory:** `apps/shell` (ou o app correspondente).
   - **Build command:** `pnpm install && pnpm --filter @sgt/shell build`.
   - **Build output directory:** `dist`.
4. Em **Environment variables**, adicione as variáveis do app (ver `.env.example` de cada app).
5. Clique em **Save and Deploy**.

Repita para cada app (`employees`, `documents`, `intranet`).

## Passo a passo — Workers

1. No dashboard do Cloudflare, acesse **Workers & Pages → Create → Worker → Connect to Git**.
2. Selecione o repositório `RHTombini/sgtombini`.
3. Preencha:
   - **Project name:** `sgt-identity` (ou o worker correspondente).
   - **Root directory:** `workers/identity`.
   - **Deploy command:** `npx wrangler deploy`.
4. Em **Settings → Variables and Secrets**, adicione os segredos:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (apenas nos workers que precisam: identity, audit, notifications)
   - `AUDIT_INTERNAL_TOKEN`
   - `NOTIFICATIONS_INTERNAL_TOKEN`
5. Clique em **Deploy**.

Repita para cada worker, incluindo `sgt-crm-api`.

## Ordem recomendada de deploy

1. Workers primeiro: `identity`, `audit`, `notifications`, `employees-api`, `documents-api`, `crm-api`.
2. Apps depois: `shell`, `employees`, `documents`, `intranet`.

## Configuração manual no Supabase (Auth Hook)

Depois de rodar a migration `0010_user_roles_and_hook.sql`:

1. Dashboard do Supabase → **Authentication → Hooks**.
2. Selecionar **Custom Access Token**.
3. Escolher `public.custom_access_token_hook`.
4. Salvar.

Sem esse passo, o JWT não carrega `user_role`.

## Segredos

Nunca commitar segredos no GitHub. Todos configurados no dashboard do Cloudflare (Variables and Secrets).

## Observações

- `pdfjs-dist`, `xlsx` e `qrcode` são processados no frontend; o build dos apps é maior, mas os Workers permanecem leves.
- Nenhum binário passa pelos Workers.
- O Cloudflare Access da intranet será configurado à parte (ver `apps/intranet/README.md`).
