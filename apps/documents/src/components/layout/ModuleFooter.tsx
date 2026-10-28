import React from 'react';

export function ModuleFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="doc-footer">
      <span>Grupo Tombini — Central de Aprovação</span>
      <span>© {year}</span>
    </footer>
  );
}
