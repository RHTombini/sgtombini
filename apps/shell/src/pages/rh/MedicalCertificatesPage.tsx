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
    alert('Atestado registrado com sucesso! (A integração com o banco será ativada na etapa final)');
  };

  return (
    <div className="shell-page">
      <h1>Controle de Atestados</h1>
      <p style={{ color: '#6E6869', marginBottom: 20 }}>
        Registre os atestados recebidos. O documento físico deve ser arquivado na pasta do colaborador.
      </p>

      <form onSubmit={handleSubmit} className="ds-card" style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
        <div>
          <label className="ds-label">Nome do Colaborador</label>
          <input className="ds-input" value={form.employeeName} onChange={e => setForm({...form, employeeName: e.target.value})} required />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label className="ds-label">Data do Atestado</label>
            <input type="date" className="ds-input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </div>
          <div>
            <label className="ds-label">Dias de Afastamento</label>
            <input type="number" className="ds-input" min="1" value={form.days} onChange={e => setForm({...form, days: Number(e.target.value)})} />
          </div>
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

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <input type="checkbox" checked={form.inHand} onChange={e => setForm({...form, inHand: e.target.checked})} />
          <span>Documento físico em mãos (arquivado na pasta)?</span>
        </label>

        <button type="submit" className="ds-button ds-button--primary" style={{ marginTop: 16 }}>Salvar Atestado</button>
      </form>
    </div>
  );
}
