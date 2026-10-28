import { useAuth } from '../../app/auth-context';

export function ModuleHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="doc-header">
      <div className="doc-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="doc-header__logo" />
        <span className="doc-header__module">Central de Aprovação</span>
      </div>
      {user && (
        <div className="doc-header__account">
          <span className="doc-header__user">{user.name}</span>
          <button className="ds-button ds-button--ghost" onClick={logout}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
