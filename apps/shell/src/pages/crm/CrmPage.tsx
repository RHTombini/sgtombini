import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

export function CrmPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('crm_suppliers')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (!error && data) setSuppliers(data);
        setLoading(false);
      });
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

      <div className="ds-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Telefone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>Carregando...</td></tr>
            ) : suppliers.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>Nenhum fornecedor cadastrado.</td></tr>
            ) : (
              suppliers.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.category || '—'}</td>
                  <td>{s.phone || '—'}</td>
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
