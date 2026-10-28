export interface VcardInput {
  fullName: string;
  role?: string | null;
  email?: string | null;
  phone?: string | null;
  organization?: string;
}

export function buildVcard(input: VcardInput): string {
  const org = input.organization ?? 'Grupo Tombini';
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVcard(input.fullName)}`,
    `ORG:${escapeVcard(org)}`,
  ];

  if (input.role) lines.push(`TITLE:${escapeVcard(input.role)}`);
  if (input.email) lines.push(`EMAIL;TYPE=WORK:${escapeVcard(input.email)}`);
  if (input.phone) lines.push(`TEL;TYPE=CELL:${escapeVcard(input.phone)}`);

  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export function downloadVcard(input: VcardInput): void {
  const content = buildVcard(input);
  const fileName = `${input.fullName.replace(/\s+/g, '-').toLowerCase()}.vcf`;
  const blob = new Blob([content], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeVcard(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
