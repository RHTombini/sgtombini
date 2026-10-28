# Modelo de ameaças detalhado — SGT e Intranet

## Ativos

| Ativo | Onde está | Sensibilidade |
|---|---|---|
| Dados de colaboradores | Supabase (`emp_employees`) | Alta |
| Documentos em aprovação | Supabase (`doc_*`) + Storage | Alta |
| Trilha de auditoria | Supabase (`audit_events`) | Alta |
| Credenciais de acesso | Supabase Auth + Cloudflare Secrets | Crítica |
| Conteúdo da intranet | JSON no repositório | Baixa |
| Sessões de usuário | `localStorage` (token) | Média |

## Ameaças e controles

| # | Ameaça | Impacto | Controle | Fase |
|---|---|---|---|---|
| T1 | Acesso indevido a dados de outro colaborador | Alto | RLS no Supabase + validação no Worker | SGT |
| T2 | Aprovação por usuário não autorizado | Alto | RBAC + validação no servidor | SGT |
| T3 | Vazamento de anexos por URL pública | Alto | Bucket privado + Signed URL (10 min) | SGT |
| T4 | Injeção SQL | Alto | Queries parametrizadas via client Supabase | SGT |
| T5 | XSS no frontend | Médio | Sanitização + CSP | SGT + Intranet |
| T6 | CSRF | Médio | SameSite + verificação de origem | SGT |
| T7 | Força bruta no login | Médio | Rate limiting + OTP na intranet | Ambos |
| T8 | Adulteração de auditoria | Alto | Tabela append-only + RLS restritivo | SGT |
| T9 | Upload de arquivo malicioso | Médio | Validação de tipo/tamanho + varredura | SGT |
| T10 | Vazamento de segredos no GitHub | Alto | Secrets no Cloudflare, nunca no repositório | Ambos |
| T11 | Backup não testado | Alto | Teste de restauração trimestral | SGT |
| T12 | Dados pessoais em logs | Médio | Redação de campos sensíveis na auditoria | SGT |
| T13 | Acesso à intranet por pessoa não autorizada | Alto | Cloudflare Access com lista de e-mails + OTP | Intranet |
| T14 | Sessão expirada sem logout | Médio | Expiração curta + refresh | SGT |
| T15 | Conteúdo da intranet desatualizado | Baixo | Painel administrativo + revisão mensal | Intranet |

## Controles por fase

### Fase 1 (Fundação)
- RLS habilitado em todas as tabelas.
- Secrets configurados no Cloudflare.
- CSP no frontend.

### Fase 2 (Módulo 01)
- Mascaramento de `birth_date` para papéis não autorizados.
- Rate limiting em endpoints de escrita.
- Auditoria de importação.

### Fase 3 (Módulo 02)
- Signed URL para anexos.
- Validação de MIME.
- Auditoria de acesso a documentos.

### Fase 4 (Intranet)
- Cloudflare Access ativo antes de publicar.
- Lista de e-mails revisada a cada admissão/desligamento.
- Conteúdo sem dados pessoais além do autorizado.

## O que não foi feito

- Nenhum teste de segurança foi executado.
- Nenhuma política foi validada juridicamente.
- Nenhum pentest foi realizado.
