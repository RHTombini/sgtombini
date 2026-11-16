import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPartnerById } from './benefits-data';
import './benefits.css';

export function BenefitPartnerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const partner = id ? getPartnerById(id) : undefined;

  if (!partner) {
    return (
      <div className="intra-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Parceiro não encontrado</h2>
        <button className="intra-btn-back" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="intra-container" style={{ padding: '60px 24px' }}>
      <button className="intra-btn-back" onClick={() => navigate(-1)}>
        ← Voltar para a Intranet
      </button>

      <div className="intra-partner-card">
        <div className="intra-partner-card__header">
          {partner.logo_url ? (
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="intra-partner-card__logo"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div
            className={`intra-partner-card__fallback ${partner.logo_url ? 'hidden' : ''}`}
          >
            {partner.name.charAt(0)}
          </div>
          <h1>{partner.name}</h1>
        </div>

        <div className="intra-partner-card__body">
          {partner.description && (
            <p className="intra-partner-desc">{partner.description}</p>
          )}

          {partner.discount && (
            <div className="intra-partner-highlight">
              <span>🔥 Oferta especial:</span> {partner.discount}
            </div>
          )}

          {partner.offers && partner.offers.length > 0 && (
            <div className="intra-partner-section">
              <h3>O que oferece:</h3>
              <ul>
                {partner.offers.map((offer, idx) => (
                  <li key={idx}>{offer}</li>
                ))}
              </ul>
            </div>
          )}

          {partner.coupon && (
            <div className="intra-partner-section">
              <h3>Cupom:</h3>
              <div className="intra-partner-coupon">{partner.coupon}</div>
            </div>
          )}

          <div className="intra-partner-contacts">
            {partner.website && (
              <a href={partner.website} target="_blank" rel="noopener noreferrer" className="intra-partner-btn">
                🌐 Acessar Site
              </a>
            )}
            {partner.whatsapp && (
              <a
                href={`https://wa.me/${partner.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="intra-partner-btn intra-partner-btn--whats"
              >
                💬 WhatsApp
              </a>
            )}
            {partner.phone && (
              <a href={`tel:${partner.phone.replace(/\D/g, '')}`} className="intra-partner-btn">
                📞 {partner.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
