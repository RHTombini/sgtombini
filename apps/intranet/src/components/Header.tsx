export function Header() {
  const sgtUrl = import.meta.env.VITE_SGT_URL as string;

  return (
    <header className="intra-header">
      <div className="intra-header__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="ds-logo" />
        <span className="intra-header__name">Nossa Gente</span>
      </div>
      <a
        className="intra-header__cta ds-button ds-button--primary"
        href={sgtUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Acessar Sistema de Gestão Tombini
      </a>
    </header>
  );
}
