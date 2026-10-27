import { useState } from 'react';
import type { ImportPreviewRow } from '@sgt/shared-types';
import { parseExcel, parsePdf } from '../services/file-parser';
import { ImportPreview } from '@sgt/design-system/src/files/ImportPreview';

export function EmployeeImportPage() {
  const [rows, setRows] = useState<ImportPreviewRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const parsed = ext === 'pdf' ? await parsePdf(file) : await parseExcel(file);
      if (parsed.length === 0) {
        setError('Nenhum dado extraído. Verifique o arquivo.');
        return;
      }
      setRows(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao ler arquivo');
    } finally {
      setBusy(false);
    }
  };

  const confirm = async () => {
    setError('A importação em massa será implementada quando o endpoint /v1/employees/import existir no Worker.');
  };

  return (
    <div className="emp-page">
      <h1>Importar colaboradores</h1>
      <p>Selecione um arquivo Excel (.xlsx/.xls) ou PDF. O arquivo é lido no seu navegador; apenas os dados extraídos são enviados.</p>

      <input
        type="file"
        accept=".xlsx,.xls,.pdf"
        disabled={busy}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {busy && <p>Lendo arquivo…</p>}
      {error && <div className="ds-field-error">{error}</div>}

      {rows && (
        <ImportPreview
          rows={rows}
          onConfirm={confirm}
          onCancel={() => setRows(null)}
        />
      )}
    </div>
  );
}
