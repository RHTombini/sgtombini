import { NavLink } from 'react-router-dom';
import { useAuth } from '../../app/auth-context';

const ITEMS = [
  { to: '/', label: 'Início', roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
  { to: '/colaboradores', label: 'Colaboradores', roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
  { to: '/colaboradores/importar', label: 'Importar', roles: ['admin', 'rh'] },
  { to: '/colaboradores/ferias', label: 'Férias', roles: ['admin', 'rh', 'gestor', 'auditor'] },
  { to: '/documentos', label: 'Documentos', roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
  { to: '/documentos/pendentes', label: 'Pendentes', roles: ['admin', 'rh', 'gestor', 'auditor'] },
];

export function Sidebar() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <aside className="shell-sidebar">
      <nav>
        <ul className="shell-sidebar__list">
          {ITEMS.filter((i) => i.roles.includes(user.role)).map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  'shell-sidebar__link' + (isActive ? ' shell-sidebar__link--active' : '')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
