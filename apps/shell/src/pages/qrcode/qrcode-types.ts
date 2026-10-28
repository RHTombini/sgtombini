export type QrContentType =
  | 'url'
  | 'email'
  | 'whatsapp'
  | 'phone'
  | 'vcard'
  | 'text';

export interface QrForm {
  type: QrContentType;
  value: string;
  label: string;
  color: string;
  logoEnabled: boolean;
}

export interface QrHistoryEntry {
  id: string;
  label: string;
  type: QrContentType;
  value: string;
  createdAt: string;
}

export const QR_TYPE_LABELS: Record<QrContentType, string> = {
  url: 'Página / site',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  phone: 'Telefone',
  vcard: 'Contato (vCard)',
  text: 'Texto livre',
};
