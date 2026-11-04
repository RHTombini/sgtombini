import React, { useEffect, useState } from 'react';
import { medicalCertificatesApi } from './rh-api';

export function MedicalCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    employee_name: '',
    certificate_date: new Date().toISOString().split('T')[0],
    days_off: 1,
    reason_type: 'Consulta',
    document_in_hand: false,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await medicalCertificatesApi.list();
      setCertificates(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await medicalCertificatesApi.create(form);
      setForm({
        employee_name: '',
        certificate_date: new Date().toISOString().split('T')[0],
        days_off: 1,
        reason_type: 'Consulta',
        document_in_hand: false,
      });
      await loadData();
      alert('Atestado salvo com sucesso!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Controle de Atestados</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Registre os atestados e mantenha o histórico organizado.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ds-button ds-button--secondary" onClick={() => window.print()}>🖨️ Imprimir</button>
        </div>
      </div>

      {error && <div className="ds-field-error" style={{ marginBottom: 16 }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="ds-card" style={{ display: 'grid', gap: 16, alignSelf: 'start' }}>
          <h3 style={{ margin: 0 }}>Novo Atestado</h3>
          
          <div>
            <label className="ds-label">Nome do Colaborador</label>
            <input className="ds-input" value={form.employee_name} onChange={e => setForm({...form, employee_name: e.target.value})} required />
          </div>
          <div>
            <label className="ds-label">Data do Atestado</label>
            <input type="date" className="ds-input" value={form.certificate_date} onChange={e => setForm({...form, certificate_date: e.target.value})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="ds-label">Dias</label>
              <input type="number" className="ds-input" min="1" value={form.days_off} onChange={e => setForm({...form, days_off: Number(e.target.value)})} />
            </div>
            <div>
              <label className="ds-label">Motivo</label>
              <select className="ds-input" value={form.reason_type} onChange={e => setForm({...form, reason_type: e.target.value})}>
                <option value="Consulta">Consulta</option>
                <option value="Cirurgia">Cirurgia</option>
                <option value="Lesão">Lesão</option>
                <option value="Saúde Mental">Saúde Mental</option>
              </select>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <input type="checkbox" checked={form.document_in_hand} onChange={e => setForm({...form, document_in_hand: e.target.checked})} />
            <span style={{ fontSize: 14 }}>Documento físico em mãos?</span>
          </label>

          <button type="submit" className="ds-button ds-button--primary" disabled={busy} style={{ marginTop: 8 }}>
            {busy ? 'Salvando...' : '💾 Salvar Atestado'}
          </button>
        </form>

        {/* Lista */}
        <div className="ds-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="ds-table">
            <thead>
              <tr>
                <th>Colaborador</th>
                <th>Data</th>
                <th>Dias</th>
                <th>Motivo</th>
                <th>Papel em mãos</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Carregando...</td></tr>
              ) : certificates.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Nenhum atestado registrado.</td></tr>
              ) : (
                certificates.map(c => (
                  <tr key={c.id}>
                    <td>{c.employee_name}</td>
                    <td>{new Date(c.certificate_date).toLocaleDateString('pt-BR')}</td>
                    <td>{c.days_off}</td>
                    <td>{c.reason_type}</td>
                    <td>{c.document_in_hand ? '✅ Sim' : '❌ Não'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
