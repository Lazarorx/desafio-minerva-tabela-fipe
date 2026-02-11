import { useState } from 'react';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';

type View = 'home' | 'search' | 'result';

interface SearchParams {
  brandCode: string;
  modelCode: string;
  yearCode: string;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const handleStartSearch = () => {
    setCurrentView('search');
  };

  const handleSearch = (brandCode: string, modelCode: string, yearCode: string) => {
    setSearchParams({ brandCode, modelCode, yearCode });
    setCurrentView('result');
  };

  const handleNewSearch = () => {
    setSearchParams(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage onStartSearch={handleStartSearch} />
        )}
        
        {currentView === 'search' && (
          <SearchPage onSearch={handleSearch} />
        )}
        
        {currentView === 'result' && searchParams && (
          <ResultPage
            brandCode={searchParams.brandCode}
            modelCode={searchParams.modelCode}
            yearCode={searchParams.yearCode}
            onNewSearch={handleNewSearch}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
