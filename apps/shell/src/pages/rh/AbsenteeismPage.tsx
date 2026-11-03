import React, { useState } from 'react';

export function AbsenteeismPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Selecione um arquivo Excel ou PDF do sistema de ponto.');
    alert(`Arquivo "${file.name}" importado! O sistema vai processar as faltas e atrasos.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="shell-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Absenteísmo (Ponto)</h1>
          <p style={{ color: '#6E6869', margin: 0, fontSize: 14 }}>Suba o relatório do ponto para calcular as faltas.</p>
        </div>
        <button className="ds-button ds-button--secondary" onClick={handlePrint}>
          🖨️ Imprimir Relatório
        </button>
      </div>

      <div className="ds-card" style={{ padding: 40, textAlign: 'center', maxWidth: 800 }}>
        <form onSubmit={handleUpload} style={{ display: 'grid', gap: 20, justifyContent: 'center' }}>
          <div style={{ border: '2px dashed #E5E9E1', padding: '40px 60px', borderRadius: 8, background: '#F9FAFB' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📄</div>
            <p style={{ marginBottom: 16, fontWeight: 500 }}>Arraste o relatório do ponto (Excel ou PDF) aqui</p>
            <input type="file" accept=".xlsx, .xls, .pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" className="ds-button ds-button--primary" disabled={!file} style={{ padding: '12px 24px' }}>
            ↑ Importar e Processar Dados
          </button>
        </form>
      </div>
    </div>
  );
}
