import React from 'react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="shell-footer">
      <span>Grupo Tombini — Sistema de Gestão Tombini</span>
      <span>© {year}</span>
    </footer>
  );
}
