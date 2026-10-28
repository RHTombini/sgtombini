import aniversariantes from '../content/aniversariantes.json';

interface Aniversariante {
  dia: number;
  mes: number;
  nomeApresentacao: string;
}

export function BirthdaySection() {
  const items = (aniversariantes.items as Aniversariante[]).slice().sort(
    (a, b) => a.dia - b.dia
  );

  return (
    <section className="intra-section">
      <h2>Celebrando a vida</h2>
      <p className="intra-section__subtitle">
        Hoje é dia de celebrar quem faz parte da nossa história! Desejamos aos aniversariantes
        do mês muita saúde, felicidade e realizações.
      </p>

      <ul className="intra-birthdays">
        {items.map((a) => (
          <li key={`${a.dia}-${a.nomeApresentacao}`} className="intra-birthday">
            <span className="intra-birthday__date">
              {String(a.dia).padStart(2, '0')}/{String(a.mes).padStart(2, '0')}
            </span>
            <span className="intra-birthday__name">{a.nomeApresentacao}</span>
          </li>
        ))}
      </ul>
      <p className="intra-note">
        Lista com nome de apresentação, dia e mês, mediante consentimento. Solicitações de
        retirada podem ser feitas ao RH.
      </p>
    </section>
  );
}
