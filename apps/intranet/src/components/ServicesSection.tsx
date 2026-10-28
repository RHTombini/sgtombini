import servicos from '../content/servicos.json';

interface Servico {
  titulo: string;
  descricao: string;
  imagem: string | null;
  autorizado: boolean;
}

export function ServicesSection() {
  const itens = servicos.itens as Servico[];

  return (
    <section className="intra-section">
      <h2>O que fazemos</h2>
      <p className="intra-section__subtitle">
        Conheça um pouco mais sobre nossas atividades e o trabalho desenvolvido por nossas
        equipes.
      </p>

      <div className="intra-cards-grid">
        {itens.map((s) => (
          <div key={s.titulo} className="ds-card">
            {s.imagem && <img src={s.imagem} alt={s.titulo} />}
            <h3>{s.titulo}</h3>
            <p>{s.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
