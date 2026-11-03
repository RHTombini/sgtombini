import React from 'react';

const STAGES = ['Inscritos', 'Triagem', 'Entrevista', 'Aprovado para Admissão'];

export function RecruitmentPage() {
  return (
    <div className="shell-page">
      <h1>Recrutamento e Seleção</h1>
      <p style={{ color: '#6E6869', marginBottom: 20 }}>
        Acompanhe os candidatos. A admissão só é feita no módulo de Colaboradores.
      </p>

      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
        {STAGES.map(stage => (
          <div key={stage} style={{ minWidth: 280, background: '#F4F6F2', borderRadius: 8, padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#4F484A', marginBottom: 12, textTransform: 'uppercase' }}>{stage}</h3>
            <div className="ds-card" style={{ marginBottom: 8, padding: 12 }}>
              <strong style={{ display: 'block', fontSize: 14 }}>Candidato Exemplo</strong>
              <span style={{ fontSize: 12, color: '#6E6869' }}>Vaga: Operador</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
