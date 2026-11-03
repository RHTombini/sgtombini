import React, { useState } from 'react';

export function MedicalCertificatesPage() {
  const [form, setForm] = useState({
    employeeName: '',
    date: new Date().toISOString().split('T')[0],
    days: 1,
    reason: 'Consulta',
    inHand: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Atestado registrado com sucesso! (Integração com banco na próxima etapa)');
  };

  const handleImport = () => {
    alert('Abrindo seletor de arquivos para importar Excel/PDF do ponto...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Controle de Atestados</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Registre os atestados e mantenha o histórico organizado.</p>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ds-button ds-button--secondary" onClick={handleImport}>
            ↑ Importar (Excel/PDF)
          </button>
          <button className="ds-button ds-button--secondary" onClick={handlePrint}>
            🖨️ Imprimir
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="ds-card" style={{ display: 'grid', gap: 16, maxWidth: 800 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <div>
            <label className="ds-label">Nome do Colaborador</label>
            <input className="ds-input" value={form.employeeName} onChange={e => setForm({...form, employeeName: e.target.value})} required />
          </div>
          <div>
            <label className="ds-label">Data do Atestado</label>
            <input type="date" className="ds-input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          <div>
            <label className="ds-label">Dias de Afastamento</label>
            <input type="number" className="ds-input" min="1" value={form.days} onChange={e => setForm({...form, days: Number(e.target.value)})} />
          </div>
          <div>
            <label className="ds-label">Motivo Principal</label>
            <select className="ds-input" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})}>
              <option value="Consulta">Consulta Médica</option>
              <option value="Cirurgia">Cirurgia</option>
              <option value="Lesão">Lesão / Fratura</option>
              <option value="Saúde Mental">Saúde Mental</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: 12, background: '#F9FAFB', borderRadius: 6 }}>
          <input type="checkbox" checked={form.inHand} onChange={e => setForm({...form, inHand: e.target.checked})} />
          <span style={{ fontSize: 14 }}>Documento físico em mãos (arquivado na pasta do colaborador)?</span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16, borderTop: '1px solid #E5E9E1', paddingTop: 16 }}>
          <button type="button" className="ds-button ds-button--ghost" onClick={() => setForm({ employeeName: '', date: new Date().toISOString().split('T')[0], days: 1, reason: 'Consulta', inHand: false })}>
            Cancelar
          </button>
          <button type="submit" className="ds-button ds-button--primary">
            💾 Salvar Atestado
          </button>
        </div>
      </form>
    </div>
  );
}
