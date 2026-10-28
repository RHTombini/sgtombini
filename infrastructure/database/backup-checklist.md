# Checklist de backup e restauração

## Antes de cada migration

- [ ] Backup manual do banco baixado e armazenado fora do GitHub.
- [ ] Migrations revisadas por uma segunda pessoa.
- [ ] Ambiente de teste (Supabase de staging) atualizado primeiro.

## Mensal

- [ ] Verificar se o backup automático está ativo.
- [ ] Baixar um backup manual adicional.
- [ ] Verificar espaço em disco do projeto Supabase.

## Trimestral

- [ ] Restaurar um backup em projeto de teste.
- [ ] Validar tabelas e políticas RLS.
- [ ] Documentar o resultado do teste.

## Em caso de incidente

- [ ] Identificar a última operação válida.
- [ ] Restaurar o backup mais recente anterior ao incidente.
- [ ] Comunicar o time e registrar o incidente.
- [ ] Revisar a causa raiz.
