import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { documentCreateSchema } from '@sgt/validation';
import type { DocumentCreateInput } from '@sgt/shared-types';
import { documentsApi } from '../services/api';
import { uploadDocumentFile } from '../services/storage';

export function DocumentFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<DocumentCreateInput>({
    title: '',
    documentType: '',
    description: '',
    unitId: '',
    departmentId: '',
    confidentialityLevel: null,
    deadline: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const set = (field: keyof DocumentCreateInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = documentCreateSchema.safeParse(form);
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
      const created = await documentsApi.create(parsed.data);
      if (file) {
        await uploadDocumentFile(created.id, file);
      }
      navigate(`/documentos/${created.id}`);
    } catch (err) {
      setErrors({ _form: err instanceof Error ? err.message : 'Erro' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="doc-page">
      <h1>Novo documento</h1>
      <form onSubmit={submit} className="doc-form">
        <div className="doc-form__section">
          <label className="ds-label">Título</label>
          <input className="ds-input" value={form.title} onChange={set('title')} />
          {errors.title && <span className="ds-field-error">{errors.title}</span>}

          <label className="ds-label">Tipo de documento</label>
          <input className="ds-input" value={form.documentType} onChange={set('documentType')} />
          {errors.documentType && <span className="ds-field-error">{errors.documentType}</span>}

          <label className="ds-label">Descrição / justificativa</label>
          <textarea className="ds-input" rows={4} value={form.description} onChange={set('description')} />
          {errors.description && <span className="ds-field-error">{errors.description}</span>}
        </div>

        <div className="doc-form__section">
          <label className="ds-label">Unidade (UUID)</label>
          <input className="ds-input" value={form.unitId} onChange={set('unitId')} />
          {errors.unitId && <span className="ds-field-error">{errors.unitId}</span>}

          <label className="ds-label">Setor (UUID)</label>
          <input className="ds-input" value={form.departmentId} onChange={set('departmentId')} />
          {errors.departmentId && <span className="ds-field-error">{errors.departmentId}</span>}
        </div>

        <div className="doc-form__section">
          <label className="ds-label">Anexo (PDF, imagem, planilha ou outro)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <p className="doc-hint">
            O arquivo é enviado diretamente ao armazenamento; apenas os metadados passam pela API.
          </p>
        </div>

        {errors._form && <div className="ds-field-error">{errors._form}</div>}

        <div className="doc-form__actions">
          <button type="button" className="ds-button ds-button--secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="ds-button ds-button--primary" disabled={busy}>
            {busy ? 'Salvando…' : 'Salvar rascunho'}
          </button>
        </div>
      </form>
    </div>
  );
}
