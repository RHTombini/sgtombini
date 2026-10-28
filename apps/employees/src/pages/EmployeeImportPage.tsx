import React from 'react';

export function EmployeeImportPage() {
  return (
    <div className="emp-page">
      <h1>Importar colaboradores</h1>
      <p style={{ color: '#6E6869', fontSize: 14 }}>
        A importação será habilitada quando o Supabase e o Worker de colaboradores estiverem configurados.
      </p>
    </div>
  );
}
