# apps/employees — Módulo 01 (Colaboradores)

Frontend do Módulo 01. Consome o Worker `sgt-employees-api` e o `Sidebar` compartilhado do design system.

## Regras

- Nenhum binário passa pelo Worker.
- Importação de Excel/PDF é feita no navegador (`xlsx` + `pdfjs-dist`); apenas JSON vai ao Worker.
- Impressão via `window.print()`.

## Build no Cloudflare Pages

- Root directory: `apps/employees`
- Build command: `pnpm install && pnpm --filter @sgt/employees build`
- Output directory: `dist`

## Pendências

- Mover `PrintLayout` e `ImportPreview` do shell para o design system (correção pendente).
- Seletores de unidade/setor (dependem de endpoint futuro).
- Endpoint de importação em massa no Worker.
- Endpoint de férias no Worker.
- Logo oficial em `public/assets/brand/logo.svg`.
