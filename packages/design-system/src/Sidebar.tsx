import { NavLink } from 'react-router-dom';

export interface SidebarModule {
  to: string;
  label: string;
  roles: string[];
  end?: boolean;
}

export interface SidebarProps {
  userRole: string;
  modules?: SidebarModule[];
  className?: string;
}

const DEFAULT_MODULES: SidebarModule[] = [
  { to: '/', label: 'Início', roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'], end: true },
  { to: '/colaboradores', label: 'Colaboradores', roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
  { to: '/colaboradores/importar', label: 'Importar colaboradores', roles: ['admin', 'rh'] },
  { to: '/colaboradores/ferias', label: 'Férias', roles: ['admin', 'rh', 'gestor', 'auditor'] },
  { to: '/documentos', label: 'Documentos', roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
  { to: '/documentos/pendentes', label: 'Aprovações pendentes', roles: ['admin', 'rh', 'gestor', 'auditor'] },
];

export function Sidebar({ userRole, modules = DEFAULT_MODULES, className }: SidebarProps) {
  const visible = modules.filter((m) => m.roles.includes(userRole));

  return (
    <aside className={'ds-sidebar' + (className ? ` ${className}` : '')}>
      <nav aria-label="Menu principal">
        <ul className="ds-sidebar__list">
          {visible.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  'ds-sidebar__link' + (isActive ? ' ds-sidebar__link--active' : '')
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
