import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('src/content');
const dest = resolve('public/content');

if (!existsSync(src)) {
  console.error('Pasta src/content não encontrada.');
  process.exit(1);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

console.log('Conteúdo copiado para public/content.');
