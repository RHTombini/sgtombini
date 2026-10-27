import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="shell-error">
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe.</p>
      <Link to="/" className="ds-button ds-button--primary">Voltar ao início</Link>
    </div>
  );
}
