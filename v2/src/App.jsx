import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import storageService from './services/storageService';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Carrega tema salvo
    const savedTheme = storageService.getTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storageService.saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="app">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
        {currentPage === 'search' && <div className="placeholder">🔍 Consulta - Em desenvolvimento...</div>}
        {currentPage === 'history' && <div className="placeholder">📋 Histórico - Em desenvolvimento...</div>}
        {currentPage === 'compare' && <div className="placeholder">⚖️ Comparação - Em desenvolvimento...</div>}
        {currentPage === 'favorites' && <div className="placeholder">⭐ Favoritos - Em desenvolvimento...</div>}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
