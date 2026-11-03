import React, { useState } from 'react';

export function AbsenteeismPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Selecione um arquivo Excel ou PDF do sistema de ponto.');
    alert(`Arquivo "${file.name}" importado! O sistema vai processar as faltas e atrasos.`);
  };

  return (
    <div className="shell-page">
      <h1>Absenteísmo (Ponto)</h1>
      <p style={{ color: '#6E6869', marginBottom: 20 }}>
        Suba o relatório de ponto para calcular as faltas e atrasos do mês. O sistema cruza os dados com o cadastro de colaboradores.
      </p>

      <div className="ds-card" style={{ padding: 32, textAlign: 'center', maxWidth: 600 }}>
        <form onSubmit={handleUpload} style={{ display: 'grid', gap: 16, justifyContent: 'center' }}>
          <div style={{ border: '2px dashed #E5E9E1', padding: 40, borderRadius: 8 }}>
            <p style={{ marginBottom: 16 }}>Arraste o relatório do ponto aqui</p>
            <input type="file" accept=".xlsx, .xls, .pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" className="ds-button ds-button--primary" disabled={!file}>
            Importar e Processar
          </button>
        </form>
      </div>
    </div>
  );
}
