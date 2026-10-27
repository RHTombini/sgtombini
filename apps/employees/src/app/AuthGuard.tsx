import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './auth-context';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 32 }}>Carregando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
