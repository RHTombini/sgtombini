import { ContentEditor } from './content-editor';

interface Aniversariante {
  dia: number;
  mes: number;
  nomeApresentacao: string;
}

interface AniversariantesFile {
  mesReferencia: string;
  items: Aniversariante[];
}

const empty: AniversariantesFile = {
  mesReferencia: new Date().toISOString().slice(0, 7),
  items: [],
};

export function BirthdayEditorPage() {
  return (
    <ContentEditor<AniversariantesFile>
      title="Aniversariantes"
      fileName="aniversariantes.json"
      initial={empty}
      validate={(v) => {
        for (const a of v.items) {
          if (!a.nomeApresentacao.trim()) return 'Nome de apresentação obrigatório.';
          if (a.dia < 1 || a.dia > 31) return 'Dia inválido.';
          if (a.mes < 1 || a.mes > 12) return 'Mês inválido.';
        }
        return null;
      }}
    >
      {(value, setValue) => (
        <div className="shell-editor-list">
          <label className="ds-label">Mês de referência (AAAA-MM)</label>
          <input
            className="ds-input"
            value={value.mesReferencia}
            onChange={(e) => setValue({ ...value, mesReferencia: e.target.value })}
          />

          {value.items.map((a, idx) => (
            <div key={idx} className="ds-card shell-editor-item">
              <label className="ds-label">Nome de apresentação</label>
              <input
                className="ds-input"
                value={a.nomeApresentacao}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...a, nomeApresentacao: e.target.value };
                  setValue({ ...value, items });
                }}
              />
              <label className="ds-label">Dia</label>
              <input
                type="number"
                className="ds-input"
                min={1}
                max={31}
                value={a.dia}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...a, dia: Number(e.target.value) };
                  setValue({ ...value, items });
                }}
              />
              <label className="ds-label">Mês</label>
              <input
                type="number"
                className="ds-input"
                min={1}
                max={12}
                value={a.mes}
                onChange={(e) => {
                  const items = [...value.items];
                  items[idx] = { ...a, mes: Number(e.target.value) };
                  setValue({ ...value, items });
                }}
              />
            </div>
          ))}

          <button
            className="ds-button ds-button--secondary"
            onClick={() =>
              setValue({
                ...value,
                items: [...value.items, { dia: 1, mes: 1, nomeApresentacao: '' }],
              })
            }
          >
            Adicionar aniversariante
          </button>
        </div>
      )}
    </ContentEditor>
  );
}
