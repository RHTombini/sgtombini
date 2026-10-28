import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { ModuleHeader } from './ModuleHeader';
import { ModuleFooter } from './ModuleFooter';

export function ModuleLayout() {
  return (
    <div className="doc-layout">
      <ModuleHeader />
      <div className="doc-layout__body">
        <Sidebar userRole="admin" />
        <main className="doc-layout__content">
          <Outlet />
        </main>
      </div>
      <ModuleFooter />
    </div>
  );
}
