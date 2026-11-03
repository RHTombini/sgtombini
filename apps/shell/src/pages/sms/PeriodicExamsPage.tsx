import React from 'react';

export function PeriodicExamsPage() {
  return (
    <div className="shell-page">
      <h1>Controle de Exames Periódicos</h1>
      <p style={{ color: '#6E6869', marginBottom: 20 }}>
        Acompanhe o vencimento dos exames. O sistema avisa quando estiver próximo do prazo.
      </p>

      <table className="ds-table">
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Último Exame</th>
            <th>Vencimento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Silva</td>
            <td>10/01/2026</td>
            <td>10/01/2027</td>
            <td><span className="ds-badge ds-badge--success">Em dia</span></td>
          </tr>
          <tr>
            <td>Maria Souza</td>
            <td>15/10/2025</td>
            <td>15/10/2026</td>
            <td><span className="ds-badge ds-badge--danger">Vencido</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
