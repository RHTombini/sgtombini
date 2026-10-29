import React from 'react';
import { useAuth } from '../../app/auth-context';

export function Footer() {
  const { user } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="shell-footer">
      <span>Grupo Tombini — Sistema de Gestão Tombini</span>
      <span>© {year}</span>
      {user && <span>Usuário: {user.email}</span>}
    </footer>
  );
}
