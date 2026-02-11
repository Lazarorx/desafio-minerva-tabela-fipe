import '../styles/Hero.css';

function Hero({ onStartSearch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">
          A MAIOR empresa de precificação de veículos <span className="highlight">usados e 0km</span> do mundo
        </h2>
        <p className="hero-subtitle">Pesquise o preço certo do seu carro na FipeCheck</p>
        
        <div className="search-box">
          <h3>Consulte o valor do seu veículo</h3>
          <div className="search-form">
            <div className="form-field">
              <label>Digite o modelo do veículo</label>
              <input type="text" placeholder="Ex: Fiat Uno" />
            </div>
            <div className="form-field">
              <label>Selecione o ano</label>
              <input type="text" placeholder="2023" />
            </div>
            <div className="form-field">
              <label>Escolha a versão</label>
              <input type="text" placeholder="Selecione" />
            </div>
            <button className="btn-search" onClick={onStartSearch}>
              Ver Preço
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
