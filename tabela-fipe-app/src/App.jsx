import { useState } from 'react';
import VehicleSearch from './components/VehicleSearch';
import VehicleResult from './components/VehicleResult';
import Hero from './components/Hero';
import PopularCars from './components/PopularCars';
import HowItWorks from './components/HowItWorks';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [vehicleData, setVehicleData] = useState(null);

  const handleSearchComplete = (data) => {
    setVehicleData(data);
    setCurrentView('result');
  };

  const handleNewSearch = () => {
    setVehicleData(null);
    setCurrentView('home');
  };

  const handleStartSearch = () => {
    setCurrentView('search');
  };

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="50" rx="12" fill="#667eea"/>
              <path d="M15 20h20M15 25h15M15 30h20M15 35h12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="35" cy="32" r="8" fill="#2ecc71"/>
              <path d="M32 32l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>FipeCheck</h1>
          </div>
        </div>
      </header>
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero onStartSearch={handleStartSearch} />
            <PopularCars onStartSearch={handleStartSearch} />
            <HowItWorks />
          </>
        )}
        
        {currentView === 'search' && (
          <VehicleSearch onSearchComplete={handleSearchComplete} />
        )}
        
        {currentView === 'result' && (
          <VehicleResult 
            vehicleData={vehicleData} 
            onNewSearch={handleNewSearch} 
          />
        )}
      </main>
      
      <footer>
        <div className="footer-content">
          <p>© 2026 FipeCheck - Desenvolvido para o Desafio Minerva 2026</p>
          <p className="footer-note">Dados fornecidos pela API Fipe oficial</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
