import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

export function IntranetAdminHomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', category: 'Comunicado', content: '' });
  const [busy, setBusy] = useState(false);

  const loadNews = () => {
    supabase.from('intra_news').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setNews(data || []));
  };

  useEffect(() => { loadNews(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from('intra_news').insert([form]);
    setBusy(false);
    if (error) alert('Erro: ' + error.message);
    else {
      alert('Notícia publicada com sucesso!');
      setForm({ title: '', category: 'Comunicado', content: '' });
      loadNews();
    }
  };

  return (
    <div className="shell-page">
      <h1>Painel da Intranet</h1>
      <p style={{ color: '#6E6869', marginBottom: 24 }}>Gerencie o conteúdo que aparece na tela inicial dos colaboradores.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        <form onSubmit={handleSubmit} className="ds-card" style={{ display: 'grid', gap: 16, alignSelf: 'start' }}>
          <h3 style={{ margin: 0 }}>Publicar Nova Notícia</h3>
          <div>
            <label className="ds-label">Título</label>
            <input className="ds-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>
          <div>
            <label className="ds-label">Categoria</label>
            <select className="ds-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="Comunicado">Comunicado</option>
              <option value="Campanha">Campanha</option>
              <option value="Evento">Evento</option>
              <option value="Novidade">Novidade</option>
            </select>
          </div>
          <div>
            <label className="ds-label">Conteúdo</label>
            <textarea className="ds-input" rows={4} value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
          </div>
          <button type="submit" className="ds-button ds-button--primary" disabled={busy}>
            {busy ? 'Publicando...' : 'Publicar Notícia'}
          </button>
        </form>

        <div className="ds-card" style={{ padding: 0 }}>
          <table className="ds-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {news.map(n => (
                <tr key={n.id}>
                  <td>{n.title}</td>
                  <td><span className="ds-badge ds-badge--neutral">{n.category}</span></td>
                  <td>{new Date(n.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
