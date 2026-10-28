# Módulo QR Code

Gera QR Codes no navegador, com a logo oficial no centro. Nenhum binário passa pelo Worker.

## Tipos suportados

- Página / site (URL)
- E-mail (`mailto:`)
- WhatsApp (`https://wa.me/...`)
- Telefone (`tel:`)
- Contato (vCard)
- Texto livre

## Como funciona

1. O usuário escolhe o tipo e digita o conteúdo.
2. O QR é renderizado em `<canvas>` no navegador.
3. A logo é carregada de `/assets/brand/logo.svg` e desenhada no centro, com fundo branco circular.
4. A correção de erro é nível H, garantindo leitura mesmo com a logo.
5. O download gera um PNG no próprio navegador.

## Dependência

Biblioteca `qrcode` (adicionada ao `package.json` do shell na consolidação, item C21).

## Rota

- `/qrcode`

A rota é registrada no `App.tsx` do shell na consolidação (item C22).

## Pendências

- Logo oficial em `apps/shell/public/assets/brand/logo.svg`.
- Histórico de QR Codes gerados (fase futura, com tabela no Supabase).
- QR Code de vCard: por enquanto o usuário cola o conteúdo vCard; a geração automática a partir do cadastro de funcionário entra no Lote 20 (integração com pessoal).

## Ordenação

Se houver lista de histórico no futuro, ela será ordenada por data (exceção cronológica documentada).
