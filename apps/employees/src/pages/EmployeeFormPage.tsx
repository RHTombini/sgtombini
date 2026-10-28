import React from 'react';

interface Props {
  mode: 'create' | 'edit';
}

export function EmployeeFormPage({ mode }: Props) {
  return (
    <div className="emp-page">
      <h1>{mode === 'create' ? 'Novo colaborador' : 'Editar colaborador'}</h1>
      <p style={{ color: '#6E6869', fontSize: 14 }}>
        O formulário será habilitado quando o Supabase e o Worker de colaboradores estiverem configurados.
      </p>
    </div>
  );
}
