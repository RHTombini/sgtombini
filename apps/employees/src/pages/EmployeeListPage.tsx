import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Employee } from '@sgt/shared-types';
import { employeesApi } from '../services/api';
import { useAuth } from '../app/auth-context';

export function EmployeeListPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 20;

  useEffect(() => {
    setLoading(true);
    setError(null);
    employeesApi
      .list({ search, status, page, pageSize })
      .then((r) => {
        setItems(r.items);
        setTotal(r.total);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search, status, page]);

  const canWrite = user?.role === 'admin' || user?.role === 'rh';
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <h1>Colaboradores</h1>
        {canWrite && (
          <Link to="/colaboradores/novo" className="ds-button ds-button--primary">
            Novo colaborador
          </Link>
        )}
      </div>

      <div className="emp-filters">
        <input
          className="ds-input"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          className="ds-input"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">Todos os status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="terminated">Desligado</option>
          <option value="pending_data">Pendente de dados</option>
        </select>
      </div>

      {error && <div className="ds-field-error">{error}</div>}

      <table className="ds-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Status</th>
            <th>Início</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.id}>
              <td>{e.fullName}</td>
              <td>{e.role}</td>
              <td>
                <span className="ds-badge ds-badge--neutral">{e.status}</span>
              </td>
              <td>{e.startDate}</td>
              <td>
                <Link to={`/colaboradores/${e.id}`} className="ds-button ds-button--ghost ds-button--icon" title="Visualizar">
                  👁
                </Link>
                {canWrite && (
                  <Link to={`/colaboradores/${e.id}/editar`} className="ds-button ds-button--ghost ds-button--icon" title="Editar">
                    ✎
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Carregando…</p>}
      {!loading && items.length === 0 && <p>Nenhum colaborador encontrado.</p>}

      <div className="emp-pagination">
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
