import React, { useEffect, useState } from 'react';
import type { CrmTab, Person, Supplier } from './crm-types';
import { crmClient } from './crm-client';
import './crm.css';

export function CrmPage() {
  const [tab, setTab] = useState<CrmTab>('people');

  return (
    <div className="crm-page">
      <h1>CRM</h1>

      <div className="crm-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'people'}
          className={`crm-tab${tab === 'people' ? ' crm-tab--active' : ''}`}
          onClick={() => setTab('people')}
        >
          Pessoas
        </button>
        <button
          role="tab"
          aria-selected={tab === 'suppliers'}
          className={`crm-tab${tab === 'suppliers' ? ' crm-tab--active' : ''}`}
          onClick={() => setTab('suppliers')}
        >
          Fornecedores
        </button>
      </div>

      {tab === 'people' ? <PeopleTab /> : <SuppliersTab />}
    </div>
  );
}

function PeopleTab() {
  const [items, setItems] = useState<Person[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const pageSize = 20;

  useEffect(() => {
    setLoading(true);
    setError(null);
    crmClient
      .listPeople({ search, state, role, page, pageSize })
      .then((r) => {
        setItems(r.items);
        setTotal(r.total);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search, state, role, page]);

  return (
    <div className="crm-panel">
      <div className="crm-filters">
        <input
          className="ds-input"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        />
        <input
          className="ds-input"
          placeholder="UF (ex.: SP)"
          value={state}
          maxLength={2}
          onChange={(e) => { setPage(1); setState(e.target.value.toUpperCase()); }}
        />
        <input
          className="ds-input"
          placeholder="Função"
          value={role}
          onChange={(e) => { setPage(1); setRole(e.target.value); }}
        />
      </div>

      {error && <div className="ds-field-error">{error}</div>}

      <table className="ds-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Status</th>
            <th>UF</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.fullName}</td>
              <td>{p.role}</td>
              <td><span className="ds-badge ds-badge--neutral">{p.status}</span></td>
              <td>{p.state ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Carregando…</p>}
      {!loading && items.length === 0 && <p>Nenhum registro encontrado.</p>}

      <div className="crm-pagination">
        <button className="ds-button ds-button--secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Anterior</button>
        <span>Página {page} de {Math.max(1, Math.ceil(total / pageSize))}</span>
        <button className="ds-button ds-button--secondary" disabled={page >= Math.ceil(total / pageSize)} onClick={() => setPage((p) => p + 1)}>Próxima</button>
      </div>
    </div>
  );
}

function SuppliersTab() {
  const [items, setItems] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    crmClient
      .listSuppliers({ search, page: 1, pageSize: 100 })
      .then((r) => setItems(r.items))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="crm-panel">
      <div className="crm-filters">
        <input
          className="ds-input"
          placeholder="Buscar fornecedor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="ds-field-error">{error}</div>}

      <table className="ds-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>E-mail</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.category ?? '—'}</td>
              <td>{s.email ?? '—'}</td>
              <td><span className="ds-badge ds-badge--neutral">{s.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Carregando…</p>}
    </div>
  );
}
