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
        <h1>Consulta Tabela Fipe</h1>
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
    </div>
  );
}

export default App;
