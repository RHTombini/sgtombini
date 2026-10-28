export function Hero() {
  return (
    <section className="intra-hero">
      <div className="intra-hero__text">
        <h1>Nossa gente, nossa história.</h1>
        <p className="intra-hero__subtitle">
          Um espaço para compartilhar informações, valorizar pessoas e fortalecer nossa conexão.
        </p>
        <p className="intra-hero__phrase">Juntos, fazemos a diferença todos os dias.</p>
      </div>
      <div className="intra-hero__image" aria-hidden="true">
        {/* Imagem institucional autorizada será adicionada em public/assets/hero.jpg */}
      </div>
    </section>
  );
}
