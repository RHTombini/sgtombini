import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/auth-context';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      setError(err instanceof Error ? err.message : 'Falha no login. Verifique suas credenciais.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="shell-login">
      <div className="shell-login__card ds-card">
        <div className="shell-login__brand">
          <img src="/assets/brand/logo-sgt.svg" alt="SGT" className="shell-login__logo" />
          <h1 className="shell-login__title">SGT</h1>
          <p className="shell-login__subtitle">Sistema de Gestão Tombini</p>
        </div>

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
          <div className="shell-login__password-group">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="ds-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="shell-login__eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          {error && <span className="ds-field-error">{error}</span>}
          
          <button type="submit" className="ds-button ds-button--primary shell-login__submit" disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
