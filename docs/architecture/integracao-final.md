# Integração final — SGT, intranet e painel

## Visão geral
┌──────────────────────────────┐
│ apps/intranet (público) │
│ Nossa Gente | Tombini │
│ Protegido por Cloudflare │
│ Access (lista de e-mails) │
└──────────────┬───────────────┘
│ botão "Acessar SGT"
▼
┌──────────────────────────────┐
│ apps/shell (SGT) │
│ Login via Supabase Auth │
│ Rotas: │
│ /colaboradores │
│ /documentos │
│ /intranet (painel) │
└──────┬───────────────┬───────┘
│ │
▼ ▼
┌────────────┐ ┌──────────────┐
│ employees │ │ documents │
│ app │ │ app │
└──────┬─────┘ └──────┬───────┘
│ │
▼ ▼
┌────────────────────────────────┐
│ Workers: identity, audit, │
│ notifications, employees-api, │
│ documents-api │
└──────────────┬─────────────────┘
│
▼
┌────────────────────────────────┐
│ Supabase (PostgreSQL, Auth, │
│ Storage) │
└────────────────────────────────┘

## Fluxos

### Aniversariantes

1. Intranet lê `aniversariantes.json` (estático, versionado).
2. Painel no shell permite editar e baixar o JSON.
3. Fase futura: endpoint `GET /v1/employees/birthdays?month=N` no `employees-api`.

O endpoint já foi criado (Lote 17, arquivo 236). Quando o painel for atualizado para consumi-lo, a intranet passa a exibir aniversariantes em tempo real.

### Importação em massa

1. Frontend (`apps/employees`) lê Excel/PDF no navegador.
2. Envia JSON a `POST /v1/employees/import` (já criado, arquivo 238).
3. Worker grava, audita e retorna resultado.
4. Nenhum binário passa pelo Worker.

### Painel da intranet

1. RH autentica no shell (Supabase Auth).
2. Acessa `/intranet`.
3. Edita conteúdo, baixa JSON.
4. Envia o JSON ao GitHub manualmente.
5. Cloudflare Pages reconstrói a intranet.

Fase futura: gravação direta via API do GitHub.

## O que já está pronto

- Workers com todos os endpoints principais.
- Migrations do Supabase.
- Apps shell, employees, documents, intranet.
- Painel administrativo da intranet (download de JSON).
- Endpoint de aniversariantes.
- Endpoint de importação em massa.

## O que falta (fila de consolidação)

- Rotas do painel no `App.tsx` do shell (C17).
- Cópia dos JSONs para `public/content/` no build da intranet (C18, C20).
- Ajuste de `VITE_INTRANET_URL` no `.env.example` do shell (C19).
- Paleta oficial nos tokens (C8–C13).
- Reexports e imports corrigidos (C1–C7, C14).

## O que não foi feito

- Nenhum deploy no Cloudflare.
- Nenhum projeto Supabase criado.
- Nenhum teste executado.
- Nenhuma validação jurídica de LGPD.
