import novos from '../content/novos.json';

interface Novo {
  nomeApresentacao: string;
  funcao: string;
  foto: string | null;
  autorizado: boolean;
}

export function NewPeopleSection() {
  const items = novos.items as Novo[];

  return (
    <section className="intra-section">
      <h2>Sejam bem-vindos!</h2>
      <p className="intra-section__subtitle">
        É muito bom ter vocês conosco. Desejamos uma trajetória de respeito, aprendizado e
        colaboração.
      </p>

      <div className="intra-cards-grid">
        {items.map((n) => (
          <div key={n.nomeApresentacao} className="ds-card intra-new-person">
            {n.foto && <img src={n.foto} alt={`Foto de ${n.nomeApresentacao}`} />}
            <h3>{n.nomeApresentacao}</h3>
            <p>{n.funcao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
