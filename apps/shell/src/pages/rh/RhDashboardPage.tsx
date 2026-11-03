import React from 'react';

export function RhDashboardPage() {
  return (
    <div className="shell-page">
      <h1>Indicadores de RH</h1>
      <p style={{ color: '#6E6869', marginBottom: 20 }}>Visão geral do mês atual.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div className="ds-card" style={{ borderLeft: '4px solid #65A70A' }}>
          <span style={{ fontSize: 12, color: '#6E6869', fontWeight: 600 }}>HEADCOUNT (TOTAL)</span>
          <h2 style={{ fontSize: 32, margin: '8px 0', color: '#4F484A' }}>142</h2>
          <span style={{ fontSize: 12, color: '#65A70A' }}>↑ 2 este mês</span>
        </div>
        <div className="ds-card" style={{ borderLeft: '4px solid #B42318' }}>
          <span style={{ fontSize: 12, color: '#6E6869', fontWeight: 600 }}>ATESTADOS NO MÊS</span>
          <h2 style={{ fontSize: 32, margin: '8px 0', color: '#4F484A' }}>18</h2>
          <span style={{ fontSize: 12, color: '#6E6869' }}>12 colaboradores</span>
        </div>
        <div className="ds-card" style={{ borderLeft: '4px solid #E9A23B' }}>
          <span style={{ fontSize: 12, color: '#6E6869', fontWeight: 600 }}>ABSENTEÍSMO (PONTO)</span>
          <h2 style={{ fontSize: 32, margin: '8px 0', color: '#4F484A' }}>6.5%</h2>
          <span style={{ fontSize: 12, color: '#B42318' }}>↑ 0.5% vs mês anterior</span>
        </div>
      </div>
    </div>
  );
}
