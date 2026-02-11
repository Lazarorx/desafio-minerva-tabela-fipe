import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    { 
      icon: <svg className="step-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
      title: 'Escolha a Marca', 
      description: 'Selecione a marca do veículo que deseja consultar' 
    },
    { 
      icon: <svg className="step-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17h14v-5H5v5zm7-13C6.48 4 2 6.24 2 9v10c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h14v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V9c0-2.76-4.48-5-10-5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>,
      title: 'Selecione o Modelo', 
      description: 'Escolha o modelo específico do carro' 
    },
    { 
      icon: <svg className="step-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      title: 'Informe o Ano', 
      description: 'Selecione o ano e tipo de combustível' 
    },
    { 
      icon: <svg className="step-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      title: 'Veja o Preço', 
      description: 'Receba o valor atualizado da Tabela Fipe' 
    },
  ];

  return (
    <section className="how-it-works">
      <h2>Como Funciona</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{index + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
