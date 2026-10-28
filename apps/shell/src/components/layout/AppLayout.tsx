import { Outlet } from 'react-router-dom';
import { Sidebar } from '@sgt/design-system';
import { useAuth } from '../../app/auth-context';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppLayout() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="shell-layout">
      <Header />
      <div className="shell-layout__body">
        <Sidebar userRole={user.role} />
        <main className="shell-layout__content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
