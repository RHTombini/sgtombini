# Migrations do Supabase

## Ordem de execução

Executar no SQL Editor do Supabase, **nesta ordem**:

1. `0001_extensions_and_helpers.sql`
2. `0002_units_departments.sql`
3. `0003_employees.sql`
4. `0004_vacations.sql`
5. `0005_documents.sql`
6. `0006_audit.sql`
7. `0007_notifications.sql`
8. `0008_seed_vacation_rules.sql`

## Como executar

1. Crie o projeto no Supabase (região São Paulo recomendada).
2. Abra **SQL Editor**.
3. Cole o conteúdo de cada arquivo, na ordem, e clique em **Run**.
4. Verifique se não houve erro antes de passar para o próximo.

## O que cada migration cria

| Arquivo | Conteúdo |
|---|---|
| 0001 | Extensões e funções auxiliares |
| 0002 | Unidades e setores |
| 0003 | Colaboradores e histórico de cargo |
| 0004 | Férias |
| 0005 | Documentos, aprovadores e versões |
| 0006 | Auditoria |
| 0007 | Notificações |
| 0008 | Regras de férias iniciais (provisórias) |

## Segurança

- Todas as tabelas têm RLS habilitado.
- Apenas `service_role` (workers) ignora RLS.
- Usuários autenticados veem apenas o que as políticas permitem.

## Pendências

- Validar regras de férias com o DP.
- Criar usuários iniciais no Supabase Auth com `app_metadata.role` preenchido.
- Configurar buckets no Storage para anexos do Módulo 02.
