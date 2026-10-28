import type { QrContentType } from './qrcode-types';

export function buildQrPayload(type: QrContentType, raw: string): string {
  const value = raw.trim();
  switch (type) {
    case 'url':
      return value.startsWith('http') ? value : `https://${value}`;
    case 'email':
      return `mailto:${value}`;
    case 'whatsapp': {
      const digits = value.replace(/\D/g, '');
      return `https://wa.me/${digits}`;
    }
    case 'phone':
      return `tel:${value.replace(/\s+/g, '')}`;
    case 'vcard':
      return value;
    case 'text':
    default:
      return value;
  }
}

export function sortHistoryAlphabetically<T extends { label: string }>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' })
  );
}
