import { useAuth } from '../../app/auth-context';

export function ModuleFooter() {
  const { user } = useAuth();
  const year = new Date().getFullYear();
  return (
    <footer className="emp-footer">
      <span>Grupo Tombini — Gestão de Colaboradores</span>
      <span>© {year}</span>
      {user && <span>{user.email}</span>}
    </footer>
  );
}
