import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentsApi } from '../services/api';

export function DocumentApprovalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decide = async (decision: 'approved' | 'rejected' | 'changes_requested') => {
    if (!id) return;
    setBusy(true);
    setError(null);
    try {
      await documentsApi.decide(id, { decision, comment: comment || undefined });
      navigate(`/documentos/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="doc-page">
      <h1>Decisão de aprovação</h1>
      <p>Registre sua decisão. O parecer é obrigatório para rejeição ou pedido de ajustes.</p>

      <label className="ds-label">Parecer / justificativa</label>
      <textarea
        className="ds-input"
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {error && <div className="ds-field-error">{error}</div>}

      <div className="doc-form__actions">
        <button
          className="ds-button ds-button--secondary"
          onClick={() => decide('changes_requested')}
          disabled={busy || !comment}
        >
          Solicitar ajustes
        </button>
        <button
          className="ds-button ds-button--danger"
          onClick={() => decide('rejected')}
          disabled={busy || !comment}
        >
          Rejeitar
        </button>
        <button
          className="ds-button ds-button--primary"
          onClick={() => decide('approved')}
          disabled={busy}
        >
          Aprovar
        </button>
      </div>
    </div>
  );
}
