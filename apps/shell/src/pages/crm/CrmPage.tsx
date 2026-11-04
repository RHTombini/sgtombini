import React, { useEffect, useState } from 'react';
import { suppliersApi } from './crm-api';

export function CrmPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    suppliersApi.list()
      .then(data => setSuppliers(data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>CRM - Fornecedores</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Gestão de parceiros e fornecedores.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ds-button ds-button--secondary">↑ Importar</button>
          <button className="ds-button ds-button--primary">+ Novo Fornecedor</button>
        </div>
      </div>

      {error && <div className="ds-field-error" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="ds-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Carregando...</td></tr>
            ) : suppliers.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Nenhum fornecedor cadastrado.</td></tr>
            ) : (
              suppliers.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.category || '—'}</td>
                  <td>{s.phone || '—'}</td>
                  <td>{s.email || '—'}</td>
                  <td>
                    <span className={`ds-badge ${s.status === 'active' ? 'ds-badge--success' : 'ds-badge--neutral'}`}>
                      {s.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
