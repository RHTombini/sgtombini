import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DocumentRequest } from '@sgt/shared-types';
import { documentsApi } from '../services/api';
import { useAuth } from '../app/auth-context';

interface Props {
  onlyPending?: boolean;
}

export function DocumentListPage({ onlyPending = false }: Props) {
  const { user } = useAuth();
  const [items, setItems] = useState<DocumentRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 20;

  useEffect(() => {
    setLoading(true);
    setError(null);
    documentsApi
      .list({
        state: onlyPending ? 'awaiting_approval' : state,
        page,
        pageSize,
      })
      .then((r) => {
        setItems(r.items);
        setTotal(r.total);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [state, page, onlyPending]);

  const canCreate = user?.role === 'admin' || user?.role === 'rh' || user?.role === 'gestor';
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <h1>{onlyPending ? 'Aprovações pendentes' : 'Documentos'}</h1>
        {canCreate && !onlyPending && (
          <Link to="/documentos/novo" className="ds-button ds-button--primary">
            Novo documento
          </Link>
        )}
      </div>

      {!onlyPending && (
        <div className="doc-filters">
          <select
            className="ds-input"
            value={state}
            onChange={(e) => {
              setPage(1);
              setState(e.target.value);
            }}
          >
            <option value="">Todos os estados</option>
            <option value="draft">Rascunho</option>
            <option value="awaiting_approval">Aguardando aprovação</option>
            <option value="awaiting_changes">Aguardando ajustes</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
            <option value="cancelled">Cancelado</option>
            <option value="closed">Encerrado</option>
          </select>
        </div>
      )}

      {error && <div className="ds-field-error">{error}</div>}

      <table className="ds-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Criado em</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.id}>
              <td>{d.title}</td>
              <td>{d.documentType}</td>
              <td>
                <span className="ds-badge ds-badge--info">{d.state}</span>
              </td>
              <td>{new Date(d.createdAt).toLocaleDateString('pt-BR')}</td>
              <td>
                <Link
                  to={`/documentos/${d.id}`}
                  className="ds-button ds-button--ghost ds-button--icon"
                  title="Visualizar"
                >
                  👁
                </Link>
                {d.state === 'awaiting_approval' && (
                  <Link
                    to={`/documentos/${d.id}/aprovar`}
                    className="ds-button ds-button--ghost ds-button--icon"
                    title="Aprovar"
                  >
                    ✓
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Carregando…</p>}
      {!loading && items.length === 0 && <p>Nenhum documento encontrado.</p>}

      <div className="doc-pagination">
        <button
          className="ds-button ds-button--secondary"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="ds-button ds-button--secondary"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
