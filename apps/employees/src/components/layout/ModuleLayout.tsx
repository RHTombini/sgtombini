import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { ModuleHeader } from './ModuleHeader';
import { ModuleFooter } from './ModuleFooter';

export function ModuleLayout() {
  return (
    <div className="emp-layout">
      <ModuleHeader />
      <div className="emp-layout__body">
        <Sidebar userRole="admin" />
        <main className="emp-layout__content">
          <Outlet />
        </main>
      </div>
      <ModuleFooter />
    </div>
  );
}
