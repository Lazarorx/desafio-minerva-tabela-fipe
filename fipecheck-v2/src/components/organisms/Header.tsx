import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 50 50" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="50" height="50" rx="8" fill="#3498db"/>
                <path 
                  d="M15 20h20M15 25h15M15 30h20M15 35h12" 
                  stroke="white" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                <circle cx="35" cy="32" r="8" fill="#2ecc71"/>
                <path 
                  d="M32 32l2 2 4-4" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FipeCheck</h1>
              <p className="text-xs text-blue-100">Preços Justos e Confiáveis</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#consulta" 
              className="text-white hover:text-blue-100 font-medium transition-colors"
            >
              Consultar
            </a>
            <a 
              href="#sobre" 
              className="text-white hover:text-blue-100 font-medium transition-colors"
            >
              Sobre
            </a>
            <a 
              href="#contato" 
              className="text-white hover:text-blue-100 font-medium transition-colors"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
