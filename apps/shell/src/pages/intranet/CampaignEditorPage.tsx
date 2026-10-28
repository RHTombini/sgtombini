import { ContentEditor } from './content-editor';

interface Campanha {
  mes: number;
  titulo: string;
  texto: string;
  cor: string;
}

interface CampanhasFile {
  items: Campanha[];
}

const empty: CampanhasFile = {
  items: Array.from({ length: 12 }, (_, i) => ({
    mes: i + 1,
    titulo: '',
    texto: '',
    cor: '#65A70A',
  })),
};

export function CampaignEditorPage() {
  return (
    <ContentEditor<CampanhasFile>
      title="Campanhas — Cuidar é importante"
      fileName="campanhas.json"
      initial={empty}
      validate={(v) => {
        if (v.items.length !== 12) return 'Deve haver 12 campanhas (uma por mês).';
        for (const c of v.items) {
          if (!c.titulo.trim()) return `Campanha do mês ${c.mes} sem título.`;
        }
        return null;
      }}
    >
      {(value, setValue) => (
        <div className="shell-editor-list">
          {value.items.map((c, idx) => (
            <div key={c.mes} className="ds-card shell-editor-item">
              <h2>Mês {c.mes}</h2>
              <label className="ds-label">Título</label>
              <input
                className="ds-input"
                value={c.titulo}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...c, titulo: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Texto</label>
              <textarea
                className="ds-input"
                rows={2}
                value={c.texto}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...c, texto: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Cor de destaque</label>
              <input
                type="color"
                value={c.cor}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...c, cor: e.target.value };
                  setValue({ items });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </ContentEditor>
  );
}
