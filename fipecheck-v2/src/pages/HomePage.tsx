import React from 'react';
import Button from '../components/atoms/Button';

interface HomePageProps {
  onStartSearch: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartSearch }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-blue-400 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Descubra o <span className="text-yellow-300">Valor Real</span> do Seu Veículo
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-50">
            Consulta rápida, precisa e baseada na Tabela Fipe oficial
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={onStartSearch}
            className="text-xl px-12 py-4"
          >
            <svg style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 17h14v-5H5v5zm7-13C6.48 4 2 6.24 2 9v10c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h14v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V9c0-2.76-4.48-5-10-5z"/>
              <circle cx="7.5" cy="14.5" r="1.5"/>
              <circle cx="16.5" cy="14.5" r="1.5"/>
            </svg>
            Consultar Preço Agora
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Por que usar o FipeCheck?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">
                <svg style={{ margin: '0 auto' }} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="2">
                  <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Dados Oficiais
              </h4>
              <p className="text-gray-600">
                Informações direto da Tabela Fipe, a referência oficial do mercado automotivo
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">
                <svg style={{ margin: '0 auto' }} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Consulta Rápida
              </h4>
              <p className="text-gray-600">
                Resultado em segundos. Selecione marca, modelo e ano para ver o preço
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">
                <svg style={{ margin: '0 auto' }} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Faixa de Preço
              </h4>
              <p className="text-gray-600">
                Veja não só o valor Fipe, mas também a faixa de preço de mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Como Funciona
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Selecione a Marca</h4>
                <p className="text-gray-600">Escolha a marca do veículo que deseja consultar</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Escolha o Modelo</h4>
                <p className="text-gray-600">Selecione o modelo específico do veículo</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Defina o Ano</h4>
                <p className="text-gray-600">Informe o ano do modelo desejado</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                ✓
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Veja o Resultado</h4>
                <p className="text-gray-600">Receba o valor Fipe, faixa de preço e gráfico de tendência</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={onStartSearch}
            >
              Começar Consulta
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
