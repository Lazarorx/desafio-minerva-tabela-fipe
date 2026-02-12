import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    { 
      icon: <svg className="step-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
      title: 'Escolha a Marca', 
      description: 'Selecione a marca do veículo que deseja consultar' 
    },
    { 
      icon: <svg className="step-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14v2H5z"/><path d="M16 6l3 5H5l3-5h8z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 11V8h14v3"/></svg>,
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
