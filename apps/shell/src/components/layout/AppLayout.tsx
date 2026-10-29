import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '../../app/auth-context';

export function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="shell-layout">
      <Header />
      <div className="shell-layout__body">
        <Sidebar userRole={user?.role || 'consulta'} />
        <main className="shell-layout__content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
