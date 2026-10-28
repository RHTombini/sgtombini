import React from 'react';

export function ModuleHeader() {
  return (
    <header className="doc-header">
      <div className="doc-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="ds-logo" />
        <span className="doc-header__module">Central de Aprovação</span>
      </div>
    </header>
  );
}
