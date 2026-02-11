import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">FipeCheck</h3>
            <p className="text-sm text-gray-400">
              Consulta de preços de veículos baseada na Tabela Fipe oficial. 
              Informações confiáveis para compra e venda de veículos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre a Fipe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
            <p className="text-sm text-gray-400 mb-2">
              Desenvolvido para o Desafio Minerva 2026
            </p>
            <p className="text-xs text-gray-500">
              Dados fornecidos pela API Fipe oficial
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2026 FipeCheck. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
