import React from 'react';

export function EmployeeListPage() {
  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <h1>Colaboradores</h1>
      </div>
      <p>Nenhum colaborador encontrado.</p>
      <p style={{ color: '#6E6869', fontSize: 14 }}>
        A lista será carregada quando o Supabase e o Worker de colaboradores estiverem configurados.
      </p>
    </div>
  );
}
