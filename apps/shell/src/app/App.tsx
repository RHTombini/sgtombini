import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { AccessDeniedPage } from '../pages/auth/AccessDeniedPage';
import { NotFoundPage } from '../pages/errors/NotFoundPage';
import { HomePage } from '../pages/HomePage';
import { AuthGuard } from './AuthGuard';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/acesso-negado" element={<AccessDeniedPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
