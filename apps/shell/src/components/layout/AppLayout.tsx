import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <div className="shell-layout">
      <Header />
      <div className="shell-layout__body">
        <Sidebar />
        <main className="shell-layout__content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
