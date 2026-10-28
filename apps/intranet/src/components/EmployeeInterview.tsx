import entrevista from '../content/entrevista.json';

interface Pergunta {
  pergunta: string;
  resposta: string;
}

export function EmployeeInterview() {
  const data = entrevista as {
    nomeApresentacao: string;
    funcao: string;
    foto: string | null;
    apresentacao: string;
    perguntas: Pergunta[];
    autorizado: boolean;
  };

  return (
    <section className="intra-section">
      <h2>Além do crachá</h2>
      <p className="intra-section__subtitle">
        Histórias de quem faz parte da nossa empresa.
      </p>

      <div className="ds-card intra-interview">
        <h3>{data.nomeApresentacao}</h3>
        <p className="intra-interview__role">{data.funcao}</p>
        <p>{data.apresentacao}</p>
        <details>
          <summary className="intra-news__more">Ler entrevista completa</summary>
          <ul>
            {data.perguntas.map((p) => (
              <li key={p.pergunta}>
                <strong>{p.pergunta}</strong>
                <p>{p.resposta || '—'}</p>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
