interface PreviewField {
  field: string;
  extractedValue: string | null;
  confidence: 'high' | 'low' | 'missing';
  requiresReview: boolean;
}

export interface PreviewRow {
  sourceRowNumber: number;
  fields: PreviewField[];
}

export interface ImportPreviewProps {
  rows: PreviewRow[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function ImportPreview({ rows, onConfirm, onCancel }: ImportPreviewProps) {
  const hasPending = rows.some((r) => r.fields.some((f) => f.confidence !== 'high'));

  return (
    <div className="shell-import-preview">
      <h2>Pré-visualização</h2>
      <p>
        {rows.length} linha(s) extraída(s).{' '}
        {hasPending && 'Campos com baixa confiança exigem conferência.'}
      </p>

      <table className="ds-table">
        <thead>
          <tr>
            <th>Linha</th>
            <th>Campo</th>
            <th>Valor</th>
            <th>Confiança</th>
          </tr>
        </thead>
        <tbody>
          {rows.flatMap((row) =>
            row.fields.map((f, idx) => (
              <tr key={`${row.sourceRowNumber}-${f.field}-${idx}`}>
                <td>{row.sourceRowNumber}</td>
                <td>{f.field}</td>
                <td>{f.extractedValue ?? '—'}</td>
                <td>
                  {f.confidence === 'high'
                    ? 'Alta'
                    : f.confidence === 'low'
                    ? 'Baixa'
                    : 'Ausente'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="shell-import-preview__actions">
        <button className="ds-button ds-button--secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button className="ds-button ds-button--primary" onClick={onConfirm}>
          Confirmar e enviar
        </button>
      </div>
    </div>
  );
}
