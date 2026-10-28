import React from 'react';

export function ModuleFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="emp-footer">
      <span>Grupo Tombini — Gestão de Colaboradores</span>
      <span>© {year}</span>
    </footer>
  );
}
