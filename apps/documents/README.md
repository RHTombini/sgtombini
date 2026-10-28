# apps/documents — Módulo 02 (Central de Aprovação)

Frontend do Módulo 02. Consome o Worker `sgt-documents-api`, o `Sidebar` e os componentes de arquivo do design system.

## Regras

- Nenhum binário passa pelo Worker.
- Upload vai direto do frontend para o Supabase Storage (bucket `documents`).
- Visualização usa Signed Download URL temporária (10 minutos).
- Impressão via `window.print()` (componente `PrintLayout`).

## Build no Cloudflare Pages

- Root directory: `apps/documents`
- Build command: `pnpm install && pnpm --filter @sgt/documents build`
- Output directory: `dist`

## Pendências

- Bucket `documents` no Supabase Storage com RLS apropriado.
- Endpoint de métricas no Worker (para o dashboard).
- Detecção de MIME do anexo (hoje fixado em `application/pdf`).
- Fluxo de reenvio após pedido de ajustes.
- Delegação de aprovadores.
- Logo oficial em `public/assets/brand/logo.svg`.
