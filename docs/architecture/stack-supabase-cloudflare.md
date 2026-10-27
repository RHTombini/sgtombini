# Stack: Supabase + Cloudflare

## 1. Visão geral

| Camada | Tecnologia | Papel |
|---|---|---|
| Frontend | React + TypeScript + Vite | Interface do usuário |
| Hospedagem | Cloudflare Pages | Publicação do frontend |
| API | Cloudflare Workers | Lógica de negócio e validação |
| Banco | Supabase PostgreSQL | Persistência oficial |
| Autenticação | Supabase Auth | Login, sessão, MFA |
| Arquivos | Supabase Storage | Anexos e importações |
| Segurança de dados | Supabase RLS | Controle de acesso por linha |

## 2. Por que Supabase (e não Cloudflare D1)

| Critério | D1 (SQLite) | Supabase (PostgreSQL) |
|---|---|---|
| Transações ACID | Limitadas | Completas |
| RLS nativo | Não | Sim |
| Auth incluso | Não | Sim |
| Storage incluso | R2 (separado) | Sim |
| Migração futura | Exigiria reescrita | Não se aplica |

O SGT envolve dados de RH e fluxo de aprovação, com necessidade de controle de acesso refinado (por linha e por papel). O RLS do Supabase atende diretamente; o D1 exigiria implementar tudo manualmente em cada endpoint.

## 3. Por que Cloudflare (e não Vercel)

| Critério | Vercel Hobby | Cloudflare |
|---|---|---|
| Uso comercial | Proibido no plano gratuito | Permitido |
| Tráfego | 100 GB/mês | Ilimitado no Pages |
| Builds | 6000 min/mês | 500 builds/mês |
| Workers | Edge Functions (runtime diferente) | Workers nativos |

## 4. Limitações conhecidas

1. **Latência Worker → Supabase:** o Worker precisa fazer requisição HTTP ao Supabase. Para sistema interno de RH, a diferença de dezenas de milissegundos é imperceptível.
2. **Plano gratuito do Supabase:** 500 MB de banco, 1 GB de storage, projeto pausado após 1 semana de inatividade. Para uso interno diário, não é problema.
3. **Segredos:** `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` devem ser configurados como secrets no Cloudflare, nunca no GitHub.
4. **RLS mal configurado** é a principal fonte de vazamento. Toda tabela deve ter políticas explícitas e testes de acesso negado.

## 5. O que ainda não foi feito

- Nenhum projeto Supabase foi criado.
- Nenhum projeto Cloudflare foi configurado.
- Nenhuma credencial foi gerada.
