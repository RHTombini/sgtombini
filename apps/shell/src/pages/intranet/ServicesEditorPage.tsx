import { ContentEditor } from './content-editor';

interface Servico {
  titulo: string;
  descricao: string;
  imagem: string | null;
  autorizado: boolean;
}

interface ServicosFile {
  itens: Servico[];
}

const empty: ServicosFile = { itens: [] };

export function ServicesEditorPage() {
  return (
    <ContentEditor<ServicosFile>
      title="O que fazemos"
      fileName="servicos.json"
      initial={empty}
      validate={(v) => {
        for (const s of v.itens) {
          if (!s.titulo.trim()) return 'Título obrigatório.';
          if (!s.descricao.trim()) return 'Descrição obrigatória.';
          if (!s.autorizado) return 'Confirme que o conteúdo não expõe informação confidencial.';
        }
        return null;
      }}
    >
      {(value, setValue) => (
        <div className="shell-editor-list">
          {value.itens.map((s, idx) => (
            <div key={idx} className="ds-card shell-editor-item">
              <label className="ds-label">Título</label>
              <input
                className="ds-input"
                value={s.titulo}
                onChange={(e) => {
                  const itens = [...value.itens];
                  itens[idx] = { ...s, titulo: e.target.value };
                  setValue({ itens });
                }}
              />
              <label className="ds-label">Descrição</label>
              <textarea
                className="ds-input"
                rows={3}
                value={s.descricao}
                onChange={(e) => {
                  const itens = [...value.itens];
                  itens[idx] = { ...s, descricao: e.target.value };
                  setValue({ itens });
                }}
              />
              <label className="ds-label">
                <input
                  type="checkbox"
                  checked={s.autorizado}
                  onChange={(e) => {
                    const itens = [...value.itens];
                    itens[idx] = { ...s, autorizado: e.target.checked };
                    setValue({ itens });
                  }}
                />{' '}
                Conteúdo aprovado, sem informação confidencial
              </label>
            </div>
          ))}
          <button
            className="ds-button ds-button--secondary"
            onClick={() =>
              setValue({
                itens: [
                  ...value.itens,
                  { titulo: '', descricao: '', imagem: null, autorizado: false },
                ],
              })
            }
          >
            Adicionar serviço
          </button>
        </div>
      )}
    </ContentEditor>
  );
}
