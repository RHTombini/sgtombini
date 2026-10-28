import { useEffect, useState } from 'react';
import { useAuth } from '../../app/auth-context';
import './profiles.css';

interface UserRow {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

const IDENTITY_BASE = import.meta.env.VITE_IDENTITY_URL as string;
const TOKEN_KEY = 'sgt.access_token';

const ROLES = ['admin', 'rh', 'gestor', 'auditor', 'consulta'] as const;

export function ProfilesPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    const token = localStorage.getItem(TOKEN_KEY);
    fetch(`${IDENTITY_BASE}/v1/admin/users`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Falha ao listar'))))
      .then((p: { data: UserRow[] }) => setUsers(p.data))
      .catch((e) => setError(e.message));
  }, [user]);

  if (user?.role !== 'admin') {
    return (
      <div className="shell-error">
        <h1>Acesso negado</h1>
        <p>Apenas admin pode gerenciar perfis.</p>
      </div>
    );
  }

  const changeRole = async (userId: string, role: string) => {
    setSaving(userId);
    setError(null);
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${IDENTITY_BASE}/v1/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar papel');
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="admin-page">
      <h1>Perfis de acesso</h1>
      <p className="admin-page__hint">
        Altere o papel de cada usuário. A alteração é imediata no Supabase Auth.
      </p>

      {error && <div className="ds-field-error">{error}</div>}

      <table className="ds-table">
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email ?? '—'}</td>
              <td>
                <select
                  className="ds-input"
                  value={u.role}
                  disabled={saving === u.id}
                  onChange={(e) => changeRole(u.id, e.target.value)}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </td>
              <td>{saving === u.id ? 'Salvando…' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
