import { Routes, Route, Navigate } from 'react-router-dom';
import { ModuleLayout } from '../components/layout/ModuleLayout';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { EmployeeFormPage } from '../pages/EmployeeFormPage';
import { EmployeeViewPage } from '../pages/EmployeeViewPage';
import { EmployeeImportPage } from '../pages/EmployeeImportPage';
import { VacationDashboardPage } from '../pages/VacationDashboardPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ModuleLayout />}>
        <Route index element={<Navigate to="colaboradores" replace />} />
        <Route path="colaboradores" element={<EmployeeListPage />} />
        <Route path="colaboradores/novo" element={<EmployeeFormPage mode="create" />} />
        <Route path="colaboradores/:id" element={<EmployeeViewPage />} />
        <Route path="colaboradores/:id/editar" element={<EmployeeFormPage mode="edit" />} />
        <Route path="colaboradores/importar" element={<EmployeeImportPage />} />
        <Route path="colaboradores/ferias" element={<VacationDashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
