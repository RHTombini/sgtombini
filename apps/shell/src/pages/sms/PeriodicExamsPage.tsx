import React, { useEffect, useState } from 'react';
import { examsApi } from './sms-api';

export function PeriodicExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    examsApi.list()
      .then(data => setExams(data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Controle de Exames Periódicos</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Acompanhe o vencimento dos exames dos colaboradores.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ds-button ds-button--secondary">↑ Importar</button>
          <button className="ds-button ds-button--primary">+ Novo Exame</button>
        </div>
      </div>

      {error && <div className="ds-field-error" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="ds-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Tipo de Exame</th>
              <th>Último Exame</th>
              <th>Vencimento</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Carregando...</td></tr>
            ) : exams.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Nenhum exame registrado.</td></tr>
            ) : (
              exams.map(exam => (
                <tr key={exam.id}>
                  <td>{exam.employee_name}</td>
                  <td>{exam.exam_type}</td>
                  <td>{new Date(exam.last_exam_date).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(exam.expiration_date).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <span className={`ds-badge ${exam.status === 'Em dia' ? 'ds-badge--success' : 'ds-badge--danger'}`}>
                      {exam.status}
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
