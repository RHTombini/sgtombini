import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '../pages/benefits-data';

export function BenefitsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pausa a animação no hover
  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  // Para fazer o loop infinito, duplicamos a lista de parceiros
  const carouselItems = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div className="intra-block" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="intra-benefits-header">
        <img
          src="/assets/brand/tombinimais.png"
          alt="Tombini+ Clube de Benefícios"
          className="intra-benefits-logo"
        />
        <p className="intra-benefits-desc">
          Clique em um parceiro para ver as ofertas exclusivas.
        </p>
      </div>

      <div
        className="intra-benefits-track-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="intra-benefits-track" ref={trackRef}>
          {carouselItems.map((partner, index) => (
            <Link
              key={`${partner.id}-${index}`}
              to={`/beneficios/${partner.id}`}
              className="intra-benefits-item"
            >
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="intra-benefits-img"
                  onError={(e) => {
                    // Se a imagem não existir, esconde ela e mostra a inicial
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div
                className={`intra-benefits-fallback ${partner.logo_url ? 'hidden' : ''}`}
              >
                {partner.name.charAt(0)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
