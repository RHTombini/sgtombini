import React from 'react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const moduleName = location.pathname.startsWith('/crm')
    ? 'CRM'
    : location.pathname.startsWith('/qrcode')
    ? 'QR Code'
    : location.pathname.startsWith('/intranet')
    ? 'Painel da Intranet'
    : location.pathname.startsWith('/admin')
    ? 'Perfis de Acesso'
    : 'SGT';

  return (
    <header className="shell-header">
      <div className="shell-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="ds-logo" />
        <span className="shell-header__module">{moduleName}</span>
      </div>
    </header>
  );
}
