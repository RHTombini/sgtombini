import noticias from '../content/noticias.json';

interface Noticia {
  id: string;
  categoria: string;
  data: string;
  titulo: string;
  resumo: string;
  corpo: string;
  imagem: string | null;
  autorizado: boolean;
}

export function NewsSection() {
  const items = (noticias.items as Noticia[]).slice(0, 3);

  return (
    <section className="intra-section">
      <h2>Acontece na Tombini</h2>
      <p className="intra-section__subtitle">
        Informações, novidades e acontecimentos do nosso dia a dia.
      </p>

      <div className="intra-news-grid">
        {items.map((n) => (
          <article key={n.id} className="ds-card intra-news">
            <span className="ds-badge ds-badge--neutral">{n.categoria}</span>
            <time dateTime={n.data} className="intra-news__date">
              {new Date(n.data).toLocaleDateString('pt-BR')}
            </time>
            <h3>{n.titulo}</h3>
            <p>{n.resumo}</p>
            <details>
              <summary className="intra-news__more">Ler notícia</summary>
              <p>{n.corpo}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
