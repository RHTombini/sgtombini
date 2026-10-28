import { Routes, Route, Navigate } from 'react-router-dom';
import { ModuleLayout } from '../components/layout/ModuleLayout';
import { AuthGuard } from './AuthGuard';
import { DocumentListPage } from '../pages/DocumentListPage';
import { DocumentFormPage } from '../pages/DocumentFormPage';
import { DocumentViewPage } from '../pages/DocumentViewPage';
import { DocumentApprovalPage } from '../pages/DocumentApprovalPage';
import { DocumentDashboardPage } from '../pages/DocumentDashboardPage';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <ModuleLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="documentos" replace />} />
        <Route path="documentos" element={<DocumentListPage />} />
        <Route path="documentos/novo" element={<DocumentFormPage />} />
        <Route path="documentos/:id" element={<DocumentViewPage />} />
        <Route path="documentos/:id/aprovar" element={<DocumentApprovalPage />} />
        <Route path="documentos/pendentes" element={<DocumentListPage onlyPending />} />
        <Route path="documentos/painel" element={<DocumentDashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
