import React from 'react';

export function CampaignSection() {
  return (
    <section className="intra-container" style={{ marginTop: 40, marginBottom: 40 }}>
      <div className="intra-premium-banner">
        {/* Certifique-se de subir a imagem com este nome na pasta public/assets */}
        <img 
          src="/assets/banner-novembro-azul.png" 
          alt="Campanha Novembro Azul" 
          className="intra-premium-banner__img" 
        />
      </div>
    </section>
  );
}
