import React from 'react';

export function Header() {
  return (
    <header className="intra-header">
      <div className="intra-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="intra-header__logo" />
        <div className="intra-header__text">
          <span className="intra-header__name">TOMBINI</span>
          <span className="intra-header__slogan">PESSOAS QUE CONSTRÓEM</span>
        </div>
      </div>
      <div className="intra-header__tagline">
        <span>Nossa gente,</span>
        <span>segue construindo.</span>
        <div className="intra-header__line"></div>
      </div>
    </header>
  );
}
