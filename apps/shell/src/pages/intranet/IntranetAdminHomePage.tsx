import { Link } from 'react-router-dom';
import { useAuth } from '../../app/auth-context';

export function IntranetAdminHomePage() {
  const { user } = useAuth();
  const canEdit = user?.role === 'admin' || user?.role === 'rh';

  if (!canEdit) {
    return (
      <div className="shell-error">
        <h1>Acesso negado</h1>
        <p>Apenas admin e RH podem editar o conteúdo da intranet.</p>
      </div>
    );
  }

  const items = [
    { to: '/intranet/noticias', label: 'Notícias', desc: 'Até 3 notícias em destaque' },
    { to: '/intranet/aniversariantes', label: 'Aniversariantes', desc: 'Nome, dia e mês' },
    { to: '/intranet/novos', label: 'Novos na equipe', desc: 'Boas-vindas' },
    { to: '/intranet/entrevista', label: 'Além do crachá', desc: 'Entrevista da edição' },
    { to: '/intranet/campanhas', label: 'Campanhas', desc: 'Cuidar é importante' },
    { to: '/intranet/servicos', label: 'O que fazemos', desc: 'Serviços e atividades' },
  ];

  return (
    <div className="shell-home">
      <h1>Painel da intranet</h1>
      <p>Edite o conteúdo da intranet "Nossa Gente".</p>

      <div className="shell-home__cards">
        {items.map((i) => (
          <Link key={i.to} to={i.to} className="ds-card shell-home__card">
            <h2>{i.label}</h2>
            <p>{i.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
