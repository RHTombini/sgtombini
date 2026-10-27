import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/auth-context';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const moduleName = location.pathname.startsWith('/documentos')
    ? 'Central de Aprovação'
    : location.pathname.startsWith('/colaboradores')
    ? 'Gestão de Colaboradores'
    : 'SGT';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="shell-header">
      <div className="shell-header__brand">
        <img
          src="/assets/brand/logo.svg"
          alt="Grupo Tombini"
          className="shell-header__logo"
        />
        <span className="shell-header__module">{moduleName}</span>
      </div>
      {user && (
        <div className="shell-header__account">
          <span className="shell-header__user">{user.name}</span>
          <button className="ds-button ds-button--ghost" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
