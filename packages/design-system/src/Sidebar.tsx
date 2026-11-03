import React from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
  end?: boolean;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  userRole: string;
  className?: string;
}

const ICONS = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  file: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  medical: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>,
  calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  kanban: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  qrcode: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  briefcase: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
};

const MENU_GROUPS: SidebarGroup[] = [
  {
    title: 'Visão Geral',
    items: [
      { to: '/', label: 'Início', icon: ICONS.home, roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'], end: true },
      { to: '/rh', label: 'Dashboard RH', icon: ICONS.chart, roles: ['admin', 'rh', 'gestor', 'auditor'] },
    ],
  },
  {
    title: 'Gestão de Pessoas',
    items: [
      { to: '/colaboradores', label: 'Colaboradores', icon: ICONS.users, roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
      { to: '/rh/atestados', label: 'Atestados', icon: ICONS.medical, roles: ['admin', 'rh'] },
      { to: '/rh/absenteismo', label: 'Absenteísmo', icon: ICONS.calendar, roles: ['admin', 'rh', 'gestor'] },
      { to: '/rh/recrutamento', label: 'Recrutamento', icon: ICONS.kanban, roles: ['admin', 'rh', 'gestor'] },
    ],
  },
  {
    title: 'Saúde e Segurança (SMS)',
    items: [
      { to: '/sms', label: 'Dashboard SMS', icon: ICONS.shield, roles: ['admin', 'rh', 'gestor', 'auditor'] },
      { to: '/sms/exames', label: 'Exames Periódicos', icon: ICONS.medical, roles: ['admin', 'rh'] },
    ],
  },
  {
    title: 'Documentos e Processos',
    items: [
      { to: '/documentos', label: 'Documentos', icon: ICONS.file, roles: ['admin', 'rh', 'gestor', 'auditor', 'consulta'] },
      { to: '/documentos/pendentes', label: 'Aprovações', icon: ICONS.file, roles: ['admin', 'rh', 'gestor', 'auditor'] },
    ],
  },
  {
    title: 'Ferramentas',
    items: [
      { to: '/crm', label: 'CRM', icon: ICONS.briefcase, roles: ['admin', 'rh', 'gestor', 'consulta'] },
      { to: '/qrcode', label: 'Gerador QR Code', icon: ICONS.qrcode, roles: ['admin', 'rh', 'gestor', 'consulta'] },
    ],
  },
  {
    title: 'Administração',
    items: [
      { to: '/intranet', label: 'Painel da Intranet', icon: ICONS.globe, roles: ['admin', 'rh'] },
      { to: '/admin/perfis', label: 'Perfis de Acesso', icon: ICONS.settings, roles: ['admin'] },
    ],
  },
];

export function Sidebar({ userRole, className }: SidebarProps) {
  const visibleGroups = MENU_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.includes(userRole)),
  })).filter((group) => group.items.length > 0);

  return (
    <aside className={'ds-sidebar' + (className ? ` ${className}` : '')}>
      <nav aria-label="Menu principal">
        {visibleGroups.map((group) => (
          <div key={group.title} className="ds-sidebar__group">
            <span className="ds-sidebar__group-title">{group.title}</span>
            <ul className="ds-sidebar__list">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      'ds-sidebar__link' + (isActive ? ' ds-sidebar__link--active' : '')
                    }
                  >
                    <span className="ds-sidebar__icon">{item.icon}</span>
                    <span className="ds-sidebar__label">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
