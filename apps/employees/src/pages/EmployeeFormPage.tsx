import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeCreateSchema } from '@sgt/validation';
import type { EmployeeCreateInput } from '@sgt/shared-types';
import { employeesApi } from '../services/api';
import { downloadVcard } from '../../../shell/src/pages/crm/vcard';

interface Props {
  mode: 'create' | 'edit';
}

export function EmployeeFormPage({ mode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<EmployeeCreateInput>({
    fullName: '',
    role: '',
    departmentId: '',
    unitId: '',
    birthDate: '',
    startDate: '',
    corporateEmail: '',
    mobilePhone: '',
  });
  const [addToAgenda, setAddToAgenda] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      employeesApi.get(id).then((e) =>
        setForm({
          fullName: e.fullName,
          role: e.role,
          departmentId: e.departmentId,
          unitId: e.unitId,
          birthDate: e.birthDate,
          startDate: e.startDate,
          corporateEmail: e.corporateEmail ?? '',
          mobilePhone: e.mobilePhone ?? '',
        })
      );
    }
  }, [id, mode]);

  const set = (field: keyof EmployeeCreateInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = employeeCreateSchema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[String(issue.path[0])] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      if (mode === 'create') {
        await employeesApi.create(parsed.data);
      } else if (id) {
        await employeesApi.update(id, parsed.data);
      }
      if (addToAgenda) {
        downloadVcard({
          fullName: parsed.data.fullName,
          role: parsed.data.role,
          email: parsed.data.corporateEmail ?? null,
          phone: parsed.data.mobilePhone ?? null,
        });
      }
      navigate('/colaboradores');
    } catch (err) {
      setErrors({ _form: err instanceof Error ? err.message : 'Erro' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="emp-page">
      <h1>{mode === 'create' ? 'Novo colaborador' : 'Editar colaborador'}</h1>
      <form onSubmit={submit} className="emp-form">
        <div className="emp-form__section">
          <h2>Identificação</h2>
          <label className="ds-label">Nome completo</label>
          <input className="ds-input" value={form.fullName} onChange={set('fullName')} />
          {errors.fullName && <span className="ds-field-error">{errors.fullName}</span>}

          <label className="ds-label">Cargo</label>
          <input className="ds-input" value={form.role} onChange={set('role')} />
          {errors.role && <span className="ds-field-error">{errors.role}</span>}

          <label className="ds-label">Data de nascimento</label>
          <input type="date" className="ds-input" value={form.birthDate} onChange={set('birthDate')} />
          {errors.birthDate && <span className="ds-field-error">{errors.birthDate}</span>}
        </div>

        <div className="emp-form__section">
          <h2>Vínculo</h2>
          <label className="ds-label">Unidade (UUID)</label>
          <input className="ds-input" value={form.unitId} onChange={set('unitId')} />
          {errors.unitId && <span className="ds-field-error">{errors.unitId}</span>}

          <label className="ds-label">Setor (UUID)</label>
          <input className="ds-input" value={form.departmentId} onChange={set('departmentId')} />
          {errors.departmentId && <span className="ds-field-error">{errors.departmentId}</span>}

          <label className="ds-label">Data de início</label>
          <input type="date" className="ds-input" value={form.startDate} onChange={set('startDate')} />
          {errors.startDate && <span className="ds-field-error">{errors.startDate}</span>}
        </div>

        <div className="emp-form__section">
          <h2>Contato</h2>
          <label className="ds-label">E-mail corporativo</label>
          <input className="ds-input" value={form.corporateEmail ?? ''} onChange={set('corporateEmail')} />

          <label className="ds-label">Celular</label>
          <input className="ds-input" value={form.mobilePhone ?? ''} onChange={set('mobilePhone')} />

          <label className="ds-label emp-checkbox">
            <input
              type="checkbox"
              checked={addToAgenda}
              onChange={(e) => setAddToAgenda(e.target.checked)}
            />
            Adicionar à agenda após salvar (gera arquivo .vcf)
          </label>
        </div>

        {errors._form && <div className="ds-field-error">{errors._form}</div>}

        <div className="emp-form__actions">
          <button type="button" className="ds-button ds-button--secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="ds-button ds-button--primary" disabled={busy}>
            {busy ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
