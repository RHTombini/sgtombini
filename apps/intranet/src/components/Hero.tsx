import React from 'react';

export function Hero() {
  const sgtUrl = import.meta.env.VITE_SGT_URL || '#';

  return (
    <section className="intra-hero">
      <div className="intra-hero__bg"></div>
      <div className="intra-hero__content">
        <div className="intra-hero__text">
          <p className="intra-hero__welcome">BEM-VINDO(A) À NOSSA</p>
          <h1 className="intra-hero__title">INTRANET</h1>
          <p className="intra-hero__subtitle">
            Um espaço para informar, conectar e valorizar quem faz parte da nossa história.
          </p>
          <p className="intra-hero__phrase">Juntos fazemos mais e melhor!</p>
        </div>
        
        <div className="intra-hero__action">
          <a href={sgtUrl} className="intra-btn-sgt" target="_blank" rel="noopener noreferrer">
            <div className="intra-btn-sgt__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <div className="intra-btn-sgt__text">
              <span className="intra-btn-sgt__small">ACESSAR SISTEMA DE GESTÃO</span>
              <span className="intra-btn-sgt__large">TOMBINI</span>
            </div>
            <div className="intra-btn-sgt__arrow">→</div>
          </a>
        </div>
      </div>
    </section>
  );
}
