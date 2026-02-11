function Hero({ onStartSearch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Descubra o Valor Real do Seu Veículo</h2>
        <p>Consulte preços atualizados da Tabela Fipe de forma rápida, gratuita e confiável</p>
        <button className="btn-hero" onClick={onStartSearch}>
          Consultar Preço Agora
        </button>
      </div>
    </section>
  );
}

export default Hero;
