# Painel administrativo da intranet

Rotas dentro do `apps/shell`, protegidas pelo login do SGT. Apenas `admin` e `rh` podem editar.

## Como funciona nesta fase

1. O RH edita o conteúdo no painel.
2. Clica em "Baixar JSON".
3. Envia o arquivo ao repositório, no caminho indicado:
   - `apps/intranet/src/content/noticias.json`
   - `apps/intranet/src/content/aniversariantes.json`
   - `apps/intranet/src/content/novos.json`
   - `apps/intranet/src/content/entrevista.json`
   - `apps/intranet/src/content/campanhas.json`
   - `apps/intranet/src/content/servicos.json`
4. O Cloudflare Pages reconstrói a intranet automaticamente.

## Fase futura

- Gravação direta no GitHub via API (sem download manual).
- Histórico de alterações.
- Aprovação de conteúdo por uma segunda pessoa.
- Integração com o módulo de funcionários para aniversariantes automáticos.

## Rotas

- `/intranet` — painel inicial
- `/intranet/noticias`
- `/intranet/aniversariantes`
- `/intranet/novos`
- `/intranet/entrevista`
- `/intranet/campanhas`
- `/intranet/servicos`

## Segurança

- Rotas protegidas pelo `AuthGuard` do shell.
- Apenas `admin` e `rh` editam.
- Nenhum dado sensível é coletado além do autorizado.
- Consentimento é registrado nos checkboxes de cada tela.
