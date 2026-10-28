# Administração de perfis de acesso

Tela `/admin/perfis`, acessível apenas a `admin`. Permite listar usuários e alterar papéis (`admin`, `rh`, `gestor`, `auditor`, `consulta`).

## Backend

- Worker `identity` (`workers/identity`).
- Endpoints:
  - `GET /v1/admin/users` — lista usuários (ordem alfabética por e-mail).
  - `PATCH /v1/admin/users/:id/role` — altera papel.

## Como funciona

1. O Admin API do Supabase (`listUsers`, `updateUserById`) é chamado com `SUPABASE_SERVICE_ROLE_KEY` [citation:4][citation:8].
2. O papel é gravado em `app_metadata.role`.
3. A Auth Hook (`0010_user_roles_and_hook.sql`) lê `user_roles` e injeta `user_role` no JWT [citation:1].
4. As RLS usam `jwt_role()` para validar permissões.

## Configuração manual no Supabase

Após rodar a migration `0010`, habilitar a Auth Hook:

1. Dashboard do Supabase → **Authentication → Hooks**.
2. Selecionar **Custom Access Token**.
3. Escolher a função `public.custom_access_token_hook`.
4. Salvar.

Sem esse passo, o JWT não carrega `user_role` e o RBAC fica incompleto [citation:1][citation:3].

## Pendências

- Registrar rotas no `router.ts` do `identity` (consolidação C40).
- Incluir `AdminRoutes` no `App.tsx` do shell (consolidação C39).
- Adicionar item "Perfis de acesso" no `Sidebar` (consolidação C41).
- Alinhar `jwt_role()` com `user_role` da hook (consolidação C38).
