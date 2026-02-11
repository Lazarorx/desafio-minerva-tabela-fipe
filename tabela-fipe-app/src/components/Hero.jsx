import '../styles/Hero.css';

function Hero({ onStartSearch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Descubra o Valor Real do Seu Veículo</h2>
        <p>Consulte preços atualizados da Tabela Fipe de forma rápida e gratuita</p>
        <button className="btn-hero" onClick={onStartSearch}>
          🚗 Consultar Agora
        </button>
      </div>
      <div className="hero-image">
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="120" width="300" height="100" rx="10" fill="white" opacity="0.1"/>
          <rect x="70" y="140" width="80" height="60" rx="5" fill="white" opacity="0.2"/>
          <rect x="170" y="140" width="80" height="60" rx="5" fill="white" opacity="0.2"/>
          <rect x="270" y="140" width="60" height="60" rx="5" fill="white" opacity="0.2"/>
          <circle cx="100" cy="230" r="20" fill="white" opacity="0.3"/>
          <circle cx="300" cy="230" r="20" fill="white" opacity="0.3"/>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
