# Fase 0 — Arquitetura e Decisões da Fundação

## 1. Objetivo

Definir a fundação técnica do SGT antes de qualquer funcionalidade de negócio, para evitar retrabalho e permitir que os módulos sejam desenvolvidos e corrigidos de forma isolada.

## 2. Decisões tomadas

| # | Decisão | Justificativa |
|---|---|---|
| D1 | Repositório único `RHTombini/sgtombini` | Facilita o upload pela interface web do GitHub e mantém visão unificada do sistema |
| D2 | Separação interna em `apps/`, `workers/`, `packages/`, `docs/` | Isolamento real entre módulos e camadas |
| D3 | Frontend em React + Vite | Build simples, compatível com Cloudflare Pages, sem dependência de servidor |
| D4 | API em Cloudflare Workers | Serverless, baixo custo, integra com Supabase via `@supabase/supabase-js` |
| D5 | Banco em Supabase (PostgreSQL) | Transações ACID, RLS nativo, Auth e Storage inclusos |
| D6 | Autenticação via Supabase Auth | Elimina a necessidade de escolher provedor externo separado |
| D7 | Armazenamento de anexos no Supabase Storage | Buckets privados + RLS, sem configurar R2 separadamente |
| D8 | CSS separado por módulo, com prefixos | Erro de estilo em um módulo não afeta o outro |
| D9 | Um Worker por módulo | Falha em um Worker não derruba o outro |
| D10 | Tipos compartilhados em `packages/shared-types` | Contratos explícitos entre frontend e API |

## 3. Estrutura de pastas

Ver `README.md` na raiz do repositório.

## 4. Fluxo de entrega

1. Arquivos são criados pela interface web do GitHub, na branch `main`.
2. O Cloudflare Pages e o Cloudflare Workers são conectados ao repositório **somente depois** que todos os arquivos da fase estiverem no GitHub.
3. Cada Worker e cada app tem seu próprio **Root directory** no Cloudflare, apontando para a subpasta correspondente (`workers/employees-api`, `apps/employees`, etc.).
4. Segredos (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) são configurados no dashboard do Cloudflare, nunca em arquivos do GitHub.

## 5. O que não foi feito nesta fase

- Nenhum código de implementação foi gerado.
- Nenhum projeto no Cloudflare foi criado.
- Nenhum projeto no Supabase foi criado.
- Nenhum teste foi executado.
- Nenhum dado institucional (CNPJ, endereço, telefone) foi presumido.

## 6. Pendências para a Fase 1

- Logo oficial (SVG/PNG) para `apps/shell/public/assets/brand/`.
- Favicon (`favicon.ico` e `favicon.svg`).
- Fonte tipográfica oficial (Inter provisória).
- Projeto Supabase criado e região definida.
