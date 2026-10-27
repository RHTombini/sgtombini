# apps/shell — Casca do SGT

Frontend base do Sistema de Gestão Tombini.

## Responsabilidades

- Login e sessão (via Worker `sgt-identity`).
- Layout: cabeçalho, navegação lateral, rodapé.
- Roteamento de topo.
- Componentes de arquivo (uploader, viewer, import preview, print layout).

## Regra de arquivos

Nenhum binário passa pelo Worker. Upload vai direto do frontend para o Supabase Storage; leitura de PDF/Excel ocorre no navegador; impressão usa `window.print()`.

## Variáveis de ambiente

Ver `.env.example`. Configurar no Cloudflare Pages:

- `VITE_IDENTITY_URL`
- `VITE_EMPLOYEES_API_URL`
- `VITE_DOCUMENTS_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Build no Cloudflare Pages

- Root directory: `apps/shell`
- Build command: `pnpm install && pnpm --filter @sgt/shell build`
- Output directory: `dist`

## Pendências

- Logo oficial em `public/assets/brand/logo.svg`.
- Favicon em `public/favicon.ico` e `public/favicon.svg`.
- Rotas dos módulos serão adicionadas quando os apps forem criados.
