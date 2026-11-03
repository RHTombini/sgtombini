import React from 'react';

export function SmsDashboardPage() {
  return (
    <div className="shell-page">
      <h1>SMS — Saúde, Meio Ambiente e Segurança</h1>
      <p style={{ color: '#6E6869', marginBottom: 20 }}>Visão geral de conformidade e segurança.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div className="ds-card" style={{ borderLeft: '4px solid #65A70A' }}>
          <span style={{ fontSize: 12, color: '#6E6869', fontWeight: 600 }}>EXAMES EM DIA</span>
          <h2 style={{ fontSize: 32, margin: '8px 0', color: '#4F484A' }}>120</h2>
        </div>
        <div className="ds-card" style={{ borderLeft: '4px solid #B42318' }}>
          <span style={{ fontSize: 12, color: '#6E6869', fontWeight: 600 }}>EXAMES VENCIDOS</span>
          <h2 style={{ fontSize: 32, margin: '8px 0', color: '#4F484A' }}>5</h2>
        </div>
        <div className="ds-card" style={{ borderLeft: '4px solid #E9A23B' }}>
          <span style={{ fontSize: 12, color: '#6E6869', fontWeight: 600 }}>ACIDENTES NO MÊS</span>
          <h2 style={{ fontSize: 32, margin: '8px 0', color: '#4F484A' }}>1</h2>
        </div>
      </div>
    </div>
  );
}
