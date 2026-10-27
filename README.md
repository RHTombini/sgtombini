markdown
# SGT — Sistema de Gestão Tombini

Sistema corporativo modular do Grupo Tombini, com dois módulos iniciais:

- **Módulo 01 — Gestão de Colaboradores** (`employee-management`)
- **Módulo 02 — Central de Aprovação de Documentos** (`document-approval`)

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Vite |
| Hospedagem do frontend | Cloudflare Pages |
| API | Cloudflare Workers (TypeScript) |
| Banco de dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth |
| Armazenamento de arquivos | Supabase Storage |

## Organização do repositório
sgtombini/
├── apps/
│ ├── shell/ # casca do sistema (login, layout, navegação)
│ ├── employees/ # Módulo 01 — frontend
│ └── documents/ # Módulo 02 — frontend
├── workers/
│ ├── identity/ # autenticação e RBAC
│ ├── employees-api/ # API do Módulo 01
│ ├── documents-api/ # API do Módulo 02
│ └── audit/ # trilha de auditoria
├── packages/
│ ├── design-system/ # tokens, componentes, estilos compartilhados
│ ├── shared-types/ # contratos entre módulos
│ └── validation/ # schemas de validação
├── docs/
│ ├── architecture/
│ ├── compliance/
│ └── security/
└── README.md
## Isolamento entre módulos

Cada módulo tem código, API, CSS e documentação próprios. Um erro no Módulo 01 não derruba o Módulo 02. A integração entre módulos é feita por identificadores estáveis e contratos documentados em `packages/shared-types`.

## Status

- [x] Fase 0 — especificação e documentação
- [ ] Fase 1 — fundação (design system, auth, layout)
- [ ] Fase 2 — Módulo 01 (Colaboradores)
- [ ] Fase 3 — Módulo 02 (Documentos)
- [ ] Fase 4 — integração e homologação

## Documentação

- `docs/architecture/fase-0.md` — arquitetura e decisões da fundação
- `docs/architecture/modulos.md` — limites e contratos entre módulos
- `docs/architecture/stack-supabase-cloudflare.md` — stack escolhida e justificativas
- `docs/security/threat-model.md` — modelo de ameaças
- `docs/compliance/lgpd-base-legal.md` — bases legais LGPD

## Identidade visual

- Verde institucional: `#65A70A`
- Grafite institucional: `#4F484A`
- Branco: `#FFFFFF`

A logo oficial e o favicon serão adicionados em `apps/shell/public/assets/brand/` quando fornecidos pelo Grupo Tombini.
