import React, { useEffect, useState } from 'react';

// TODO: substituir por dados do Supabase (tabela intra_employees) quando conectar
const MOCK_USER = {
  displayName: 'Raul Ramalho',
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function Hero() {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60 * 1000); // atualiza a cada 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="intra-hero">
      <div className="intra-hero__content">
        <div className="intra-hero__text">
          <p className="intra-hero__welcome">
            {greeting}, <strong>{MOCK_USER.displayName}</strong>
          </p>
          <h1 className="intra-hero__title">INTRANET</h1>
          <p className="intra-hero__subtitle">
            Um espaço para informar, conectar e valorizar quem faz parte da nossa história.
          </p>
          <p className="intra-hero__phrase">Juntos fazemos mais e melhor!</p>
        </div>

        <div className="intra-hero__actions">
          <a
            href="https://sgt-shell.pages.dev"
            className="intra-btn-sgt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="intra-btn-sgt__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="intra-btn-sgt__text">
              <span className="intra-btn-sgt__small">ACESSAR SISTEMA DE GESTÃO</span>
              <span className="intra-btn-sgt__large">TOMBINI</span>
            </div>
          </a>

          <a
            href="https://wa.me/5511999999999"
            className="intra-btn-whats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="intra-btn-whats__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div className="intra-btn-whats__text">
              <span className="intra-btn-whats__small">FALE COM O RH</span>
              <span className="intra-btn-whats__large">WhatsApp</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
