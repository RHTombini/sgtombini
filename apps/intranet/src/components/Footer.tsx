export function Footer() {
  const whatsapp = import.meta.env.VITE_WHATSAPP_RH_URL as string;
  const linkedin = import.meta.env.VITE_LINKEDIN_URL as string;
  const instagram = import.meta.env.VITE_INSTAGRAM_URL as string;
  const site = import.meta.env.VITE_SITE_URL as string;
  const year = new Date().getFullYear();

  return (
    <footer className="intra-footer">
      <div className="intra-footer__brand">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" className="ds-logo" />
        <p>Pessoas que constroem, histórias que conectam.</p>
      </div>

      <div className="intra-footer__links">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer">
          <span className="intra-footer__icon intra-footer__icon--whatsapp" aria-hidden="true" />
          Fale com nosso RH
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={site} target="_blank" rel="noopener noreferrer">Site institucional</a>
      </div>

      <div className="intra-footer__legal">
        <span>© {year} Grupo Tombini</span>
        <span>Conteúdo interno — não reproduzir sem autorização.</span>
      </div>
    </footer>
  );
}
