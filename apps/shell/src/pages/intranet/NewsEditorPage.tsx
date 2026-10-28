import { ContentEditor } from './content-editor';

interface Noticia {
  id: string;
  categoria: string;
  data: string;
  titulo: string;
  resumo: string;
  corpo: string;
  imagem: string | null;
  autorizado: boolean;
}

interface NoticiasFile {
  items: Noticia[];
}

const empty: NoticiasFile = {
  items: [
    {
      id: '',
      categoria: '',
      data: new Date().toISOString().slice(0, 10),
      titulo: '',
      resumo: '',
      corpo: '',
      imagem: null,
      autorizado: false,
    },
  ],
};

export function NewsEditorPage() {
  return (
    <ContentEditor<NoticiasFile>
      title="Notícias da intranet"
      fileName="noticias.json"
      initial={empty}
      validate={(v) => {
        if (v.items.length === 0) return 'Adicione ao menos uma notícia.';
        if (v.items.length > 3) return 'Máximo de 3 notícias.';
        for (const n of v.items) {
          if (!n.titulo.trim()) return 'Título obrigatório.';
          if (!n.resumo.trim()) return 'Resumo obrigatório.';
          if (!n.data) return 'Data obrigatória.';
        }
        return null;
      }}
    >
      {(value, setValue) => (
        <div className="shell-editor-list">
          {value.items.map((n, idx) => (
            <div key={idx} className="ds-card shell-editor-item">
              <h2>Notícia {idx + 1}</h2>
              <label className="ds-label">Título</label>
              <input
                className="ds-input"
                value={n.titulo}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, titulo: e.target.value, id: n.id || `noticia-${idx + 1}` };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Categoria</label>
              <input
                className="ds-input"
                value={n.categoria}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, categoria: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Data (AAAA-MM-DD)</label>
              <input
                type="date"
                className="ds-input"
                value={n.data}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, data: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Resumo</label>
              <textarea
                className="ds-input"
                rows={2}
                value={n.resumo}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, resumo: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Corpo</label>
              <textarea
                className="ds-input"
                rows={4}
                value={n.corpo}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, corpo: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">
                <input
                  type="checkbox"
                  checked={n.autorizado}
                  onChange={(e) => {
                    const items = [...value.items];
                    items[idx] = { ...n, autorizado: e.target.checked };
                    setValue({ items });
                  }}
                />{' '}
                Conteúdo aprovado pelo RH
              </label>
            </div>
          ))}
        </div>
      )}
    </ContentEditor>
  );
}
