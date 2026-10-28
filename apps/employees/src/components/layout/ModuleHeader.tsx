import React from 'react';

export function ModuleHeader() {
  return (
    <header className="emp-header">
      <div className="emp-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="ds-logo" />
        <span className="emp-header__module">Gestão de Colaboradores</span>
      </div>
    </header>
  );
}
