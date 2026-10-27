import * as pdfjs from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import type { ImportPreviewField, ImportPreviewRow } from '@sgt/shared-types';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs';

const KNOWN_FIELDS: Array<keyof ImportPreviewField['field'] extends never ? never : string> = [
  'fullName',
  'role',
  'departmentId',
  'unitId',
  'birthDate',
  'startDate',
  'corporateEmail',
  'mobilePhone',
];

export async function parseExcel(file: File): Promise<ImportPreviewRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]!];
  if (!sheet) return [];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
  return rows.map((row, idx) => toPreviewRow(row, idx + 2));
}

export async function parsePdf(file: File): Promise<ImportPreviewRow[]> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const rows: ImportPreviewRow[] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items
      .map((it) => ('str' in it ? it.str : ''))
      .join(' ')
      .trim();
    if (text) rows.push(parsePdfTextLine(text, p));
  }

  return rows;
}

function parsePdfTextLine(text: string, pageNumber: number): ImportPreviewRow {
  // Heurística simples: extrai datas e e-mail, marca o restante como pendente.
  const birthMatch = text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);

  const fields: ImportPreviewField[] = [
    {
      field: 'fullName',
      extractedValue: null,
      confidence: 'missing',
      requiresReview: true,
    },
    {
      field: 'role',
      extractedValue: null,
      confidence: 'missing',
      requiresReview: true,
    },
    {
      field: 'birthDate',
      extractedValue: birthMatch ? birthMatch[1]! : null,
      confidence: birthMatch ? 'low' : 'missing',
      requiresReview: true,
    },
    {
      field: 'corporateEmail',
      extractedValue: emailMatch ? emailMatch[0] : null,
      confidence: emailMatch ? 'high' : 'missing',
      requiresReview: !emailMatch,
    },
    {
      field: 'startDate',
      extractedValue: null,
      confidence: 'missing',
      requiresReview: true,
    },
  ];

  return { sourceRowNumber: pageNumber, fields };
}

function toPreviewRow(row: Record<string, unknown>, sourceRowNumber: number): ImportPreviewRow {
  const fields: ImportPreviewField[] = KNOWN_FIELDS.map((field) => {
    const raw = row[field];
    const value = raw === undefined || raw === null || raw === '' ? null : String(raw);
    return {
      field: field as ImportPreviewField['field'],
      extractedValue: value,
      confidence: value ? 'high' : 'missing',
      requiresReview: !value,
    };
  });
  return { sourceRowNumber, fields };
}
