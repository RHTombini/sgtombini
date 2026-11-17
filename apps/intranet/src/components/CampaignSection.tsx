import React from 'react';
// Importa a imagem da pasta src/assets
import bannerNovembro from '../assets/banner-novembro-azul.png';

export function CampaignSection() {
  return (
    <section className="intra-container" style={{ marginTop: 40, marginBottom: 40 }}>
      <div className="intra-campaign-wrapper">
        <img 
          src={bannerNovembro} 
          alt="Campanha Novembro Azul - Cuide da sua saúde" 
          className="intra-campaign-img" 
        />
      </div>
    </section>
  );
}
