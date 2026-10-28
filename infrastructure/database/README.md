# Banco de dados — Supabase

## Migrations

As migrations estão em `supabase/migrations/` e devem ser executadas no SQL Editor do Supabase, na ordem numérica (0001 a 0008).

Ver `supabase/migrations/README.md` para a lista completa.

## Backup

O Supabase oferece backup automático diário no plano Pro. No plano Free, o backup manual é responsabilidade do time.

Procedimento manual (plano Free):

1. No dashboard do Supabase, acesse **Database → Backups**.
2. Use **Download** para obter um dump do banco.
3. Armazene o arquivo em local seguro (fora do GitHub).

Recomendação: fazer backup manual antes de cada migration e antes de qualquer operação em produção.

## Restauração

1. No dashboard do Supabase, acesse **Database → Backups**.
2. Selecione o backup desejado e clique em **Restore**.
3. Valide as tabelas e políticas RLS após a restauração.

## Teste de restauração

Backup não testado não é backup. Recomendação: trimestralmente, restaurar um backup em um projeto Supabase de teste e validar que os dados estão íntegros.

## Segurança

- RLS habilitado em todas as tabelas.
- Apenas `service_role` (workers) ignora RLS.
- Usuários autenticados veem apenas o que as políticas permitem.
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend.
