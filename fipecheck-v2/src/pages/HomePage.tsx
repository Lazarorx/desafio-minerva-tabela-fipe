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
            🚗 Consultar Preço Agora
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
              <div className="text-5xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Dados Oficiais
              </h4>
              <p className="text-gray-600">
                Informações direto da Tabela Fipe, a referência oficial do mercado automotivo
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Consulta Rápida
              </h4>
              <p className="text-gray-600">
                Resultado em segundos. Selecione marca, modelo e ano para ver o preço
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💰</div>
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
