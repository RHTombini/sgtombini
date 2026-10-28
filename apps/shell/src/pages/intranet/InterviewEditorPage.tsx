import { ContentEditor } from './content-editor';

interface Pergunta {
  pergunta: string;
  resposta: string;
}

interface EntrevistaFile {
  nomeApresentacao: string;
  funcao: string;
  foto: string | null;
  apresentacao: string;
  perguntas: Pergunta[];
  autorizado: boolean;
}

const empty: EntrevistaFile = {
  nomeApresentacao: '',
  funcao: '',
  foto: null,
  apresentacao: '',
  perguntas: [
    { pergunta: 'Como você gosta de ser chamado?', resposta: '' },
    { pergunta: 'Qual atividade desenvolve junto à Tombini?', resposta: '' },
    { pergunta: 'O que mais gosta no seu trabalho?', resposta: '' },
    { pergunta: 'O que gosta de fazer nas horas vagas?', resposta: '' },
    { pergunta: 'Qual aprendizado gostaria de compartilhar?', resposta: '' },
    { pergunta: 'O que significa trabalhar em equipe para você?', resposta: '' },
  ],
  autorizado: false,
};

export function InterviewEditorPage() {
  return (
    <ContentEditor<EntrevistaFile>
      title="Além do crachá"
      fileName="entrevista.json"
      initial={empty}
      validate={(v) => {
        if (!v.nomeApresentacao.trim()) return 'Nome obrigatório.';
        if (!v.autorizado) return 'Confirme a autorização do entrevistado.';
        return null;
      }}
    >
      {(value, setValue) => (
        <div className="shell-editor-list">
          <label className="ds-label">Nome de apresentação</label>
          <input
            className="ds-input"
            value={value.nomeApresentacao}
            onChange={(e) => setValue({ ...value, nomeApresentacao: e.target.value })}
          />
          <label className="ds-label">Função</label>
          <input
            className="ds-input"
            value={value.funcao}
            onChange={(e) => setValue({ ...value, funcao: e.target.value })}
          />
          <label className="ds-label">Apresentação</label>
          <textarea
            className="ds-input"
            rows={3}
            value={value.apresentacao}
            onChange={(e) => setValue({ ...value, apresentacao: e.target.value })}
          />

          <h2>Perguntas</h2>
          {value.perguntas.map((p, idx) => (
            <div key={idx} className="ds-card shell-editor-item">
              <strong>{p.pergunta}</strong>
              <textarea
                className="ds-input"
                rows={2}
                value={p.resposta}
                onChange={(e) => {
                  const perguntas = [...value.perguntas];
                  perguntas[idx] = { ...p, resposta: e.target.value };
                  setValue({ ...value, perguntas });
                }}
              />
            </div>
          ))}

          <label className="ds-label">
            <input
              type="checkbox"
              checked={value.autorizado}
              onChange={(e) => setValue({ ...value, autorizado: e.target.checked })}
            />{' '}
            Entrevista aprovada pelo entrevistado
          </label>
        </div>
      )}
    </ContentEditor>
  );
}
