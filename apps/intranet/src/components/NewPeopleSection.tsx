import React from 'react';
import novos from '../content/novos.json';

interface Novo {
  nome: string;
  funcao: string;
  tipoVinculo: string;
  foto: string | null;
  autorizado: boolean;
}

export function NewPeopleSection() {
  const items = novos.items as Novo[];

  return (
    <div className="intra-block">
      <div className="intra-block__header">
        <div className="intra-block__icon intra-block__icon--green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div>
          <h3 className="intra-block__title">NOVOS NA EQUIPE</h3>
          <p className="intra-block__desc">Sejam muito bem-vindos! É um prazer ter vocês conosco.</p>
        </div>
      </div>

      <div className="intra-people-grid">
        {items.map((n, i) => (
          <div key={i} className="intra-person">
            <div className="intra-person__photo">
              {n.foto && n.autorizado ? (
                <img src={n.foto} alt={`Foto de ${n.nome}`} />
              ) : (
                <div className="intra-person__placeholder">
                  {n.nome.charAt(0)}
                </div>
              )}
            </div>
            <strong className="intra-person__name">{n.nome}</strong>
            <span className="intra-person__role">{n.funcao}</span>
            <span className={`intra-badge intra-badge--${n.tipoVinculo.toLowerCase()}`}>
              {n.tipoVinculo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
