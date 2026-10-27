# Modelo de Ameaças — SGT

## 1. Ativos protegidos

- Dados pessoais de colaboradores (nome, data de nascimento, e-mail, telefone).
- Documentos enviados para aprovação.
- Trilha de auditoria.
- Credenciais de acesso (Supabase, Cloudflare).

## 2. Ameaças identificadas

| # | Ameaça | Impacto | Controle previsto |
|---|---|---|---|
| T1 | Acesso indevido a dados de outro colaborador | Alto | RLS no Supabase + validação no Worker |
| T2 | Aprovação por usuário não autorizado | Alto | RBAC + validação no servidor, nunca só na UI |
| T3 | Vazamento de anexos por URL pública | Alto | Bucket privado + Signed URL temporária |
| T4 | Injeção SQL | Alto | Uso de queries parametrizadas via client Supabase |
| T5 | XSS no frontend | Médio | Sanitização + CSP |
| T6 | CSRF | Médio | SameSite + verificação de origem |
| T7 | Força bruta no login | Médio | Rate limiting + MFA para papéis críticos |
| T8 | Adulteração de auditoria | Alto | Tabela append-only + RLS restritivo |
| T9 | Upload de arquivo malicioso | Médio | Validação de tipo/tamanho + varredura |
| T10 | Vazamento de segredos no GitHub | Alto | Secrets no Cloudflare, nunca no repositório |
| T11 | Backup não testado | Alto | Teste de restauração trimestral |
| T12 | Dados pessoais em logs | Médio | Redação de campos sensíveis na auditoria |

## 3. Controles obrigatórios por fase

- **Fase 1:** RLS habilitado em todas as tabelas; secrets configurados no Cloudflare; CSP no frontend.
- **Fase 2:** mascaramento de `birth_date` para papéis não autorizados; rate limiting em endpoints de escrita.
- **Fase 3:** Signed URL para anexos; validação de MIME; auditoria de acesso a documentos.

## 4. O que não foi feito

- Nenhum teste de segurança foi executado.
- Nenhuma política de segurança foi validada juridicamente.
