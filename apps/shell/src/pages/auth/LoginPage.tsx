import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/auth-context';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no login');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="shell-login">
      <div className="shell-login__card ds-card">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" height={40} />
        <h1>SGT — Sistema de Gestão Tombini</h1>
        <form onSubmit={handleSubmit}>
          <label className="ds-label" htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            className="ds-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="ds-label" htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            className="ds-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <span className="ds-field-error">{error}</span>}
          <button className="ds-button ds-button--primary" disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
