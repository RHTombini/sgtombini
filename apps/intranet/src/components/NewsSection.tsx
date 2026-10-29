import React from 'react';

export function NewsSection() {
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

        <div className="intra-news-grid">
          <div className="intra-news-card intra-news-card--green">
            <div className="intra-news-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
            <div className="intra-news-card__content">
              <span className="intra-news-card__tag">COMUNICADO</span>
              <h3 className="intra-news-card__title">Mantenha seus dados sempre atualizados.</h3>
            </div>
            <div className="intra-news-card__arrow">›</div>
          </div>

          <div className="intra-news-card intra-news-card--pink">
            <div className="intra-news-card__icon intra-news-card__icon--pink"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
            <div className="intra-news-card__content">
              <span className="intra-news-card__tag text-pink">OUTUBRO ROSA</span>
              <h3 className="intra-news-card__title">Prevenção, informação e cuidado sempre.</h3>
            </div>
            <div className="intra-news-card__arrow text-pink">›</div>
          </div>

          <div className="intra-news-card intra-news-card--green">
            <div className="intra-news-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
            <div className="intra-news-card__content">
              <span className="intra-news-card__tag">NOVEMBRO AZUL</span>
              <h3 className="intra-news-card__title">Saúde também é atitude.</h3>
            </div>
            <div className="intra-news-card__arrow">›</div>
          </div>
        </div>
      </div>
    </section>
  );
}
