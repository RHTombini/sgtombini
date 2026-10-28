import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { useAuth } from '../../app/auth-context';
import { ModuleHeader } from './ModuleHeader';
import { ModuleFooter } from './ModuleFooter';

export function ModuleLayout() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="doc-layout">
      <ModuleHeader />
      <div className="doc-layout__body">
        <Sidebar userRole={user.role} />
        <main className="doc-layout__content">
          <Outlet />
        </main>
      </div>
      <ModuleFooter />
    </div>
  );
}
