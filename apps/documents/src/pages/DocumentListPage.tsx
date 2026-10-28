import React from 'react';

interface Props {
  onlyPending?: boolean;
}

export function DocumentListPage({ onlyPending = false }: Props) {
  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <h1>{onlyPending ? 'Aprovações pendentes' : 'Documentos'}</h1>
      </div>
      <p>Nenhum documento encontrado.</p>
      <p style={{ color: '#6E6869', fontSize: 14 }}>
        A lista será carregada quando o Supabase e o Worker de documentos estiverem configurados.
      </p>
    </div>
  );
}
