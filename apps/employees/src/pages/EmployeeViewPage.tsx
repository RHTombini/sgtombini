import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Employee } from '@sgt/shared-types';
import { employeesApi } from '../services/api';
import { PrintLayout } from '@sgt/design-system/src/print/PrintLayout';
import { useAuth } from '../app/auth-context';

export function EmployeeViewPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    employeesApi.get(id).then(setEmployee).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="ds-field-error">{error}</div>;
  if (!employee) return <p>Carregando…</p>;

  const canWrite = user?.role === 'admin' || user?.role === 'rh';

  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <h1>{employee.fullName}</h1>
        <div>
          {canWrite && (
            <Link to={`/colaboradores/${employee.id}/editar`} className="ds-button ds-button--secondary">
              Editar
            </Link>
          )}
        </div>
      </div>

      <PrintLayout title="Ficha do colaborador" subtitle={employee.fullName}>
        <table className="ds-table">
          <tbody>
            <tr><th>Cargo</th><td>{employee.role}</td></tr>
            <tr><th>Status</th><td>{employee.status}</td></tr>
            <tr><th>Data de nascimento</th><td>{employee.birthDate}</td></tr>
            <tr><th>Data de início</th><td>{employee.startDate}</td></tr>
            <tr><th>Data de registro</th><td>{new Date(employee.registrationDate).toLocaleString('pt-BR')}</td></tr>
            <tr><th>E-mail corporativo</th><td>{employee.corporateEmail ?? '—'}</td></tr>
            <tr><th>Celular</th><td>{employee.mobilePhone ?? '—'}</td></tr>
          </tbody>
        </table>
      </PrintLayout>
    </div>
  );
}
