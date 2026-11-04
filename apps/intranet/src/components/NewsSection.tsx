import React, { useEffect, useState } from 'react';
import { intraApi } from '../services/api';

export function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    intraApi.getNews()
      .then(data => setNews(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="intra-section intra-section--bg-light">
      <div className="intra-container">
        <div className="intra-section__header">
          <h2 className="intra-section__title">
            <svg className="intra-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            ACONTECE POR AQUI
          </h2>
          <p className="intra-section__subtitle">Fique por dentro das principais informações, campanhas e novidades.</p>
        </div>

        {loading ? (
          <p>Carregando notícias...</p>
        ) : news.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6E6869' }}>Nenhuma notícia publicada no momento.</p>
        ) : (
          <div className="intra-news-grid">
            {news.map((item, index) => (
              <div key={item.id} className={`intra-news-card ${index === 1 ? 'intra-news-card--pink' : 'intra-news-card--green'}`}>
                <div className="intra-news-card__content">
                  <span className={`intra-news-card__tag ${index === 1 ? 'text-pink' : ''}`}>
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="intra-news-card__title">{item.title}</h3>
                  <p style={{ fontSize: 13, color: '#4F484A', marginTop: 8, opacity: 0.8 }}>
                    {item.content.substring(0, 80)}...
                  </p>
                </div>
                <div className={`intra-news-card__arrow ${index === 1 ? 'text-pink' : ''}`}>›</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
