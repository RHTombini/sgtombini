import { useState } from 'react';
import { downloadVcard } from './vcard';

interface Props {
  employeeId: string;
  label?: string;
}

const EMPLOYEES_BASE = import.meta.env.VITE_EMPLOYEES_API_URL as string;
const TOKEN_KEY = 'sgt.access_token';

export function VcardButton({ employeeId, label = 'Adicionar à agenda' }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setBusy(true);
    setError(null);
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${EMPLOYEES_BASE}/v1/employees/${employeeId}/vcard`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Falha ao obter dados do colaborador');
      const payload = (await res.json()) as {
        data: { fullName: string; role: string | null; email: string | null; phone: string | null };
      };
      downloadVcard({
        fullName: payload.data.fullName,
        role: payload.data.role,
        email: payload.data.email,
        phone: payload.data.phone,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="vcard-button">
      <button className="ds-button ds-button--secondary" onClick={handleClick} disabled={busy}>
        {busy ? 'Gerando…' : label}
      </button>
      {error && <span className="ds-field-error">{error}</span>}
    </div>
  );
}
