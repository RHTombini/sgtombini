import React from 'react';

const STAGES = ['Inscritos', 'Triagem', 'Entrevista', 'Aprovado para Admissão'];

export function RecruitmentPage() {
  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Recrutamento e Seleção</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Acompanhe os candidatos no processo seletivo.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ds-button ds-button--secondary" onClick={() => alert('Importar currículos...')}>↑ Importar</button>
          <button className="ds-button ds-button--primary">+ Novo Candidato</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
        {STAGES.map(stage => (
          <div key={stage} style={{ minWidth: 280, background: '#F4F6F2', borderRadius: 8, padding: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#4F484A', marginBottom: 16, textTransform: 'uppercase' }}>{stage}</h3>
            
            {/* Cartão de Candidato */}
            <div className="ds-card" style={{ marginBottom: 12, padding: 16, display: 'grid', gap: 8 }}>
              <strong style={{ fontSize: 15, color: '#4F484A' }}>Candidato Exemplo</strong>
              <span style={{ fontSize: 12, color: '#6E6869' }}>Vaga: Operador</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, borderTop: '1px solid #E5E9E1', paddingTop: 8 }}>
                <button className="ds-button ds-button--ghost ds-button--icon" title="Visualizar">👁️</button>
                <button className="ds-button ds-button--ghost ds-button--icon" title="Editar">✏️</button>
                <button className="ds-button ds-button--ghost ds-button--icon" title="Imprimir">🖨️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
