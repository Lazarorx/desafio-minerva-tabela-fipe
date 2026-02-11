import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    { icon: '🔍', title: 'Escolha a Marca', description: 'Selecione a marca do veículo que deseja consultar' },
    { icon: '🚙', title: 'Selecione o Modelo', description: 'Escolha o modelo específico do carro' },
    { icon: '📅', title: 'Informe o Ano', description: 'Selecione o ano e tipo de combustível' },
    { icon: '💰', title: 'Veja o Preço', description: 'Receba o valor atualizado da Tabela Fipe' },
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
