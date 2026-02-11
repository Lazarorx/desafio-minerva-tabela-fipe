import '../styles/Hero.css';

function Hero({ onStartSearch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">
          A MAIOR empresa de precificação de veículos <span className="highlight">usados e 0km</span> do mundo
        </h2>
        <p className="hero-subtitle">Pesquise o preço certo do seu carro na FipeCheck</p>
        
        <button className="btn-hero-main" onClick={onStartSearch}>
          Consultar Preço Agora
        </button>
      </div>
    </section>
  );
}

export default Hero;
