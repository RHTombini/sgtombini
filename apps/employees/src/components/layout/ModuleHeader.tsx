import { useAuth } from '../../app/auth-context';

export function ModuleHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="emp-header">
      <div className="emp-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="ds-logo" />
        <span className="emp-header__module">Gestão de Colaboradores</span>
      </div>
      {user && (
        <div className="emp-header__account">
          <span className="emp-header__user">{user.name}</span>
          <button className="ds-button ds-button--ghost" onClick={logout}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
