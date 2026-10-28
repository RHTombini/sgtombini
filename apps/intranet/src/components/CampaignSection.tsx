import campanhas from '../content/campanhas.json';

interface Campanha {
  mes: number;
  titulo: string;
  texto: string;
  cor: string;
}

export function CampaignSection() {
  const items = campanhas.items as Campanha[];
  const mesAtual = new Date().getMonth() + 1;
  const atual = items.find((c) => c.mes === mesAtual);
  const outros = items.filter((c) => c.mes !== mesAtual);

  return (
    <section className="intra-section">
      <h2>Cuidar é importante</h2>
      <p className="intra-section__subtitle">
        Informação, prevenção e bem-estar fazem parte do nosso dia a dia.
      </p>

      {atual && (
        <div
          className="ds-card intra-campaign intra-campaign--highlight"
          style={{ borderTopColor: atual.cor }}
        >
          <span className="ds-badge ds-badge--info">Campanha do mês</span>
          <h3>{atual.titulo}</h3>
          <p>{atual.texto}</p>
        </div>
      )}

      <details className="intra-campaigns-details">
        <summary className="intra-news__more">Ver todas as campanhas do ano</summary>
        <ul className="intra-campaigns">
          {outros.map((c) => (
            <li key={c.mes} className="intra-campaign">
              <span className="intra-campaign__month">
                {new Date(2026, c.mes - 1, 1).toLocaleDateString('pt-BR', { month: 'long' })}
              </span>
              <strong>{c.titulo}</strong>
              <p>{c.texto}</p>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
