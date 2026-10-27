import { Link } from 'react-router-dom';

export function AccessDeniedPage() {
  return (
    <div className="shell-error">
      <h1>Acesso negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <Link to="/" className="ds-button ds-button--primary">Voltar ao início</Link>
    </div>
  );
}
