# Limites e Contratos entre Módulos

## 1. Princípio

Cada módulo tem código, API, CSS, testes e documentação próprios. Um módulo **não importa** código do outro. A comunicação acontece apenas por:

- Identificadores estáveis (`employee_id`, `document_id`, `user_id`).
- Contratos documentados em `packages/shared-types`.
- Chamadas HTTP entre Workers, quando necessário.

## 2. Módulo 01 — Gestão de Colaboradores

| Item | Valor |
|---|---|
| Nome técnico | `employee-management` |
| App frontend | `apps/employees` |
| Worker | `workers/employees-api` |
| Prefixo CSS | `emp-` |
| Identificador estável | `employee_id` (UUID) |
| Banco | tabelas prefixadas `emp_` no Supabase |

**Expõe para outros módulos:**
- `GET /v1/employees/:id/public` — nome, cargo, setor, unidade, status (sem dados sensíveis).
- Validação de `employee_id` ativo.

**Não expõe:**
- Data de nascimento, telefone, e-mail (dados pessoais).
- Histórico de férias.

## 3. Módulo 02 — Aprovação de Documentos

| Item | Valor |
|---|---|
| Nome técnico | `document-approval` |
| App frontend | `apps/documents` |
| Worker | `workers/documents-api` |
| Prefixo CSS | `doc-` |
| Identificador estável | `document_id` (UUID) |
| Banco | tabelas prefixadas `doc_` no Supabase |

**Consome do Módulo 01:**
- Validação de `employee_id` do solicitante e dos aprovadores.

**Expõe para outros módulos:**
- Nenhum endpoint público nesta fase.

## 4. Serviços compartilhados

| Serviço | Worker | Responsabilidade |
|---|---|---|
| Identidade | `workers/identity` | Autenticação via Supabase Auth, emissão de JWT com roles |
| Auditoria | `workers/audit` | Gravação de eventos append-only na tabela `audit_events` |

Esses serviços são **consumidos** pelos módulos, mas não pertencem a nenhum deles.

## 5. Regras de isolamento

1. `apps/employees` não importa nada de `apps/documents`, e vice-versa.
2. `workers/employees-api` não importa nada de `workers/documents-api`, e vice-versa.
3. O CSS de um módulo nunca é importado pelo outro.
4. Alterações em `packages/shared-types` exigem sincronização manual nos dois lados e são registradas no `CHANGELOG` do módulo afetado.
5. Falha em um Worker não impede o funcionamento do outro.

## 6. Diagrama de dependências
apps/shell ──► workers/identity
│
├──► apps/employees ──► workers/employees-api ──► Supabase (emp_)
│ │
│ └──► workers/audit ──► Supabase (audit_events)
│
└──► apps/documents ──► workers/documents-api ──► Supabase (doc_)
│
└──► workers/audit ──► Supabase (audit_events)

Sem dependência circular.
