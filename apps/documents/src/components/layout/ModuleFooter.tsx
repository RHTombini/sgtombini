import { useAuth } from '../../app/auth-context';

export function ModuleFooter() {
  const { user } = useAuth();
  const year = new Date().getFullYear();
  return (
    <footer className="doc-footer">
      <span>Grupo Tombini — Central de Aprovação</span>
      <span>© {year}</span>
      {user && <span>{user.email}</span>}
    </footer>
  );
}
