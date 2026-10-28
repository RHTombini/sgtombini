# Módulo CRM

CRM integrado ao módulo de pessoal. Funcionários são lidos direto de `emp_employees` (sem duplicação). Fornecedores vivem em `crm_suppliers`.

## Rotas

- `/crm` — página com abas "Pessoas" e "Fornecedores".

Registradas no `App.tsx` do shell na consolidação (C22).

## Backend

- Worker `crm-api` (`workers/crm-api`).
- Endpoints:
  - `GET /v1/crm/people` — busca funcionários com filtros (nome, unidade, setor, função, status, UF).
  - `GET /v1/crm/suppliers` — lista fornecedores (nome, categoria, status).
  - `GET /v1/crm/suppliers/:id` — detalhe.
  - `POST /v1/crm/suppliers` — criar.
  - `PUT /v1/crm/suppliers/:id` — atualizar.

## Ordenação

Todas as listas são ordenadas alfabeticamente por nome (A→Z), tanto no backend (`order('name'/'full_name')`) quanto no frontend como fallback. Histórico de interações, se existir, será ordenado por data (exceção cronológica documentada).

## Pendências

- Formulário de criação/edição de fornecedor (fase futura).
- Endereços (`crm_addresses`) para fornecedores e funcionários (fase futura).
- Tags e interações (tabelas criadas; UI futura).
- `VITE_CRM_API_URL` no `.env` do shell (consolidação, C31).
