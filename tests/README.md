# Testes

## Estratégia

| Tipo | O que cobre | Onde |
|---|---|---|
| Unitário | Regras de negócio puras (validação, cálculo) | `packages/validation`, `modules/` |
| Integração | API + banco (Supabase de teste) | `tests/integration/` |
| E2E | Fluxos completos no navegador | `tests/e2e/` |

## Ferramentas sugeridas

- **Vitest** para unitário e integração.
- **Playwright** para E2E.

## O que ainda não foi feito

- Nenhum teste foi escrito.
- Nenhuma ferramenta foi instalada.
- Nenhum ambiente de teste foi configurado.

## Prioridade de testes (quando implementar)

1. Validação de campos do colaborador.
2. Prevenção de duplicidade.
3. Cálculo de férias (anos bissextos, virada de ano).
4. Fluxo de aprovação (sequencial e paralelo).
5. RLS (acesso negado a dados de outro usuário).
6. Importação (Excel válido, Excel inválido, PDF sem texto).
7. Impressão (layout sem botões).
