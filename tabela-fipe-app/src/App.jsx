import { useState } from 'react';
import VehicleSearch from './components/VehicleSearch';
import VehicleResult from './components/VehicleResult';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('search');
  const [vehicleData, setVehicleData] = useState(null);

  const handleSearchComplete = (data) => {
    setVehicleData(data);
    setCurrentView('result');
  };

  const handleNewSearch = () => {
    setVehicleData(null);
    setCurrentView('search');
  };

  return (
    <div className="app">
      <header>
        <div className="logo">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="12" fill="white" fillOpacity="0.2"/>
            <path d="M15 20h20M15 25h15M15 30h20M15 35h12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="35" cy="32" r="8" fill="#2ecc71"/>
            <path d="M32 32l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>FipeCheck</h1>
        </div>
        <p className="subtitle">Consulta rápida e precisa de preços de veículos</p>
      </header>
      <main>
        {currentView === 'search' ? (
          <VehicleSearch onSearchComplete={handleSearchComplete} />
        ) : (
          <VehicleResult 
            vehicleData={vehicleData} 
            onNewSearch={handleNewSearch} 
          />
        )}
      </main>
      <footer>
        <p>Desenvolvido para o Desafio Minerva 2026</p>
        <p className="footer-note">Dados fornecidos pela API Fipe oficial</p>
      </footer>
    </div>
  );
}

export default App;
