import React from 'react';

export function ModuleHeader() {
  return (
    <header className="doc-header">
      <div className="doc-header__brand">
        <img src="/assets/brand/logo-sgt.svg" alt="SGT" className="ds-logo" />
        <span className="doc-header__module">Central de Aprovação</span>
      </div>
    </header>
  );
}
