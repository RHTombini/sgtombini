import React from 'react';

export function PeriodicExamsPage() {
  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Controle de Exames Periódicos</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Acompanhe o vencimento dos exames dos colaboradores.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ds-button ds-button--secondary" onClick={() => alert('Importar exames...')}>↑ Importar</button>
          <button className="ds-button ds-button--primary">+ Novo Exame</button>
        </div>
      </div>

      <table className="ds-table">
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Último Exame</th>
            <th>Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Silva</td>
            <td>10/01/2026</td>
            <td>10/01/2027</td>
            <td><span className="ds-badge ds-badge--success">Em dia</span></td>
            <td>
              <button className="ds-button ds-button--ghost ds-button--icon" title="Visualizar">👁️</button>
              <button className="ds-button ds-button--ghost ds-button--icon" title="Editar">✏️</button>
            </td>
          </tr>
          <tr>
            <td>Maria Souza</td>
            <td>15/10/2025</td>
            <td>15/10/2026</td>
            <td><span className="ds-badge ds-badge--danger">Vencido</span></td>
            <td>
              <button className="ds-button ds-button--ghost ds-button--icon" title="Visualizar">👁️</button>
              <button className="ds-button ds-button--ghost ds-button--icon" title="Editar">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
