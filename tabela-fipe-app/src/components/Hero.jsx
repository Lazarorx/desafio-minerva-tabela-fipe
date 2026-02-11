import '../styles/Hero.css';

function Hero({ onStartSearch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">
          Consulte o <span className="highlight">valor real</span> do seu veículo
        </h2>
        <p className="hero-subtitle">Preços atualizados baseados na Tabela Fipe oficial</p>
        
        <button className="btn-hero-main" onClick={onStartSearch}>
          Consultar Preço Agora
        </button>
      </div>
    </section>
  );
}

export default Hero;
