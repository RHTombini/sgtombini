import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './auth-context';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="shell-loading">Carregando…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
