# Integração vCard (funcionário → agenda)

Permite gerar um arquivo `.vcf` a partir dos dados do colaborador, para importar na agenda do celular ou do computador.

## Como funciona

1. O frontend chama `GET /v1/employees/:id/vcard` no Worker `employees-api`.
2. O Worker devolve JSON com nome, cargo, e-mail e celular (sem data de nascimento, sem dados sensíveis).
3. O frontend monta o vCard 3.0 e dispara o download.
4. Nenhum binário passa pelo Worker.

## Componente

`VcardButton` — recebe `employeeId` e mostra o botão "Adicionar à agenda".

## Onde será usado

- Na visualização do colaborador (`EmployeeViewPage`) — consolidação C35.
- No formulário de cadastro (`EmployeeFormPage`), via checkbox "Adicionar à agenda" — consolidação C36.

## Pendências

- Registrar rota `GET /v1/employees/:id/vcard` no `router.ts` do `employees-api` (consolidação C34).
- Incluir `VcardButton` nas telas de colaborador (consolidação C35, C36).
- Foto do colaborador no vCard (fase futura, quando houver upload de foto).
