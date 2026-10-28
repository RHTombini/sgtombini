# apps/intranet — Nossa Gente | Tombini

Landing page de comunicação interna do Grupo Tombini. Página única, com rolagem vertical.

## Conteúdo

- Cabeçalho com logo e botão "Acessar Sistema de Gestão Tombini".
- Banner, mensagem da direção, notícias, aniversariantes, novos na equipe, entrevista, o que fazemos, campanhas.
- Rodapé com WhatsApp do RH, LinkedIn, Instagram e site.

## Conteúdo versionado

Os textos e listas ficam em `src/content/*.json`:

- `noticias.json` — até 3 notícias.
- `aniversariantes.json` — nome de apresentação, dia e mês.
- `novos.json` — novos na equipe.
- `entrevista.json` — entrevista "Além do crachá".
- `servicos.json` — o que fazemos.
- `campanhas.json` — campanhas mensais.

Atualização nesta fase: editar o JSON e commitar. Painel administrativo virá em fase futura, dentro do SGT.

## LGPD

- Aniversariantes: apenas nome de apresentação, dia e mês, mediante consentimento.
- Entrevistas: aprovação prévia do entrevistado.
- Fotos: apenas com autorização.
- Sem CPF, salário, dados médicos ou contratos.
- Solicitações de retirada podem ser feitas ao RH.

## Acesso restrito — Cloudflare Access

A intranet **não tem login próprio**. O acesso é controlado pelo Cloudflare Access.

### Configuração (painel do Cloudflare)

1. Acesse **Zero Trust → Access → Applications → Add an application → Self-hosted**.
2. Preencha:
   - **Application name:** `Intranet Nossa Gente`.
   - **Application domain:** o domínio da intranet no Cloudflare Pages.
3. Em **Policies**, crie uma política:
   - **Action:** Allow.
   - **Include:** Emails.
   - **Adicione manualmente o endereço Gmail de cada pessoa autorizada.**
4. Em **Authentication**, ative **One-time PIN** (OTP). Se não aparecer, habilite em **Settings → Authentication → Login methods**.

### Por que lista manual de e-mails

Como os e-mails são `@gmail.com`, não é seguro usar "Emails ending in @gmail.com" — qualquer pessoa no mundo com uma conta Gmail passaria. A lista manual é a forma segura.

### Manutenção

Sempre que houver admissão ou desligamento, revisar a lista de e-mails no Cloudflare Access. Remover imediatamente o e-mail de quem sai da empresa.

## Variáveis de ambiente

Configurar no Cloudflare Pages:

- `VITE_SGT_URL` — URL do SGT (ex.: `https://sgtombini.pages.dev`).
- `VITE_WHATSAPP_RH_URL` — link `wa.me` do RH.
- `VITE_LINKEDIN_URL` — perfil da empresa no LinkedIn.
- `VITE_INSTAGRAM_URL` — perfil oficial no Instagram.
- `VITE_SITE_URL` — site institucional.

Nenhuma URL deve ser inventada. Se não houver, deixar em branco ou ocultar o link.

## Build no Cloudflare Pages

- Root directory: `apps/intranet`
- Build command: `pnpm install && pnpm --filter @sgt/intranet build`
- Output directory: `dist`

## Pendências

- Logo oficial em `public/assets/brand/logo.svg`.
- Imagem do banner em `public/assets/hero.jpg`.
- Favicon em `public/favicon.ico` e `public/favicon.svg`.
- URLs reais de WhatsApp, LinkedIn, Instagram e site.
- Conteúdo real nos JSONs (substituir os placeholders).
- Painel administrativo (fase futura, dentro do SGT).
