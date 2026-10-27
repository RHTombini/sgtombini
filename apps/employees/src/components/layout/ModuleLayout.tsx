import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { useAuth } from '../../app/auth-context';
import { ModuleHeader } from './ModuleHeader';
import { ModuleFooter } from './ModuleFooter';

export function ModuleLayout() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="emp-layout">
      <ModuleHeader />
      <div className="emp-layout__body">
        <Sidebar userRole={user.role} />
        <main className="emp-layout__content">
          <Outlet />
        </main>
      </div>
      <ModuleFooter />
    </div>
  );
}
