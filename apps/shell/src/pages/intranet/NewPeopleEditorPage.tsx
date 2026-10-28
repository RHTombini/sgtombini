import { ContentEditor } from './content-editor';

interface Novo {
  nomeApresentacao: string;
  funcao: string;
  foto: string | null;
  autorizado: boolean;
}

interface NovosFile {
  items: Novo[];
}

const empty: NovosFile = { items: [] };

export function NewPeopleEditorPage() {
  return (
    <ContentEditor<NovosFile>
      title="Novos na equipe"
      fileName="novos.json"
      initial={empty}
      validate={(v) => {
        for (const n of v.items) {
          if (!n.nomeApresentacao.trim()) return 'Nome obrigatório.';
          if (!n.autorizado) return 'Confirme a autorização de cada pessoa.';
        }
        return null;
      }}
    >
      {(value, setValue) => (
        <div className="shell-editor-list">
          {value.items.map((n, idx) => (
            <div key={idx} className="ds-card shell-editor-item">
              <label className="ds-label">Nome de apresentação</label>
              <input
                className="ds-input"
                value={n.nomeApresentacao}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, nomeApresentacao: e.target.value };
                  setValue({ items });
                }}
              />
              <label className="ds-label">Função / área</label>
              <input
                className="ds-input"
                value={n.funcao}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...n, funcao: e.target.value };
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
                Autorizado pela pessoa
              </label>
            </div>
          ))}
          <button
            className="ds-button ds-button--secondary"
            onClick={() =>
              setValue({
                items: [
                  ...value.items,
                  { nomeApresentacao: '', funcao: '', foto: null, autorizado: false },
                ],
              })
            }
          >
            Adicionar pessoa
          </button>
        </div>
      )}
    </ContentEditor>
  );
}
