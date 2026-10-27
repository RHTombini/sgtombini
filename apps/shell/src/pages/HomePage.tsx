import { Link } from 'react-router-dom';
import { useAuth } from '../app/auth-context';

export function HomePage() {
  const { user } = useAuth();
  return (
    <div className="shell-home">
      <h1>Bem-vindo, {user?.name}</h1>
      <p>Selecione um módulo para começar.</p>

      <div className="shell-home__cards">
        <Link to="/colaboradores" className="ds-card shell-home__card">
          <h2>Gestão de Colaboradores</h2>
          <p>Cadastro, importação e férias.</p>
        </Link>
        <Link to="/documentos" className="ds-card shell-home__card">
          <h2>Central de Aprovação</h2>
          <p>Envio, tramitação e decisões.</p>
        </Link>
      </div>
    </div>
  );
}
