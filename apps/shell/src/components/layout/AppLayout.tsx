import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <div className="shell-layout">
      <Header />
      <div className="shell-layout__body">
        <Sidebar userRole="admin" />
        <main className="shell-layout__content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
