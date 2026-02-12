import { useEffect, useState } from 'react';
import storageService from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { ChartIcon, StarIcon, ClockIcon, SearchIcon, HistoryIcon, CompareIcon } from '../Icons/Icons';
import './Dashboard.css';

function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalConsultas: 0,
    totalFavoritos: 0,
    ultimaConsulta: null,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const history = storageService.getHistory();
    const favorites = storageService.getFavorites();

    setStats({
      totalConsultas: history.length,
      totalFavoritos: favorites.length,
      ultimaConsulta: history[0] || null,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Bem-vindo, {user?.name}!</h1>
          <p>Gerencie suas consultas e acompanhe seus veículos favoritos</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <ChartIcon size={32} color="white" />
          </div>
          <div className="stat-content">
            <h3>Total de Consultas</h3>
            <p className="stat-value">{stats.totalConsultas}</p>
            <span className="stat-label">consultas realizadas</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <StarIcon size={32} color="white" filled />
          </div>
          <div className="stat-content">
            <h3>Favoritos</h3>
            <p className="stat-value">{stats.totalFavoritos}</p>
            <span className="stat-label">veículos salvos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <ClockIcon size={32} color="white" />
          </div>
          <div className="stat-content">
            <h3>Última Consulta</h3>
            <p className="stat-value-small">
              {stats.ultimaConsulta ? stats.ultimaConsulta.Modelo : 'Nenhuma'}
            </p>
            <span className="stat-label">
              {formatDate(stats.ultimaConsulta?.consultedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => onNavigate('search')}>
            <div className="action-icon">
              <SearchIcon size={48} color="#667eea" />
            </div>
            <h3>Nova Consulta</h3>
            <p>Consultar preço de um veículo</p>
          </button>

          <button className="action-card" onClick={() => onNavigate('history')}>
            <div className="action-icon">
              <HistoryIcon size={48} color="#667eea" />
            </div>
            <h3>Ver Histórico</h3>
            <p>Acessar consultas anteriores</p>
          </button>

          <button className="action-card" onClick={() => onNavigate('compare')}>
            <div className="action-icon">
              <CompareIcon size={48} color="#667eea" />
            </div>
            <h3>Comparar Veículos</h3>
            <p>Compare até 3 veículos</p>
          </button>

          <button className="action-card" onClick={() => onNavigate('favorites')}>
            <div className="action-icon">
              <StarIcon size={48} color="#667eea" />
            </div>
            <h3>Meus Favoritos</h3>
            <p>Veículos que você salvou</p>
          </button>
        </div>
      </div>

      {stats.ultimaConsulta && (
        <div className="recent-section">
          <h2>Última Consulta</h2>
          <div className="recent-card">
            <div className="recent-info">
              <h3>{stats.ultimaConsulta.Marca}</h3>
              <p className="recent-model">{stats.ultimaConsulta.Modelo}</p>
              <p className="recent-details">
                {stats.ultimaConsulta.AnoModelo} • {stats.ultimaConsulta.Combustivel}
              </p>
            </div>
            <div className="recent-price">
              <span className="price-label">Valor Fipe</span>
              <span className="price-value">{stats.ultimaConsulta.Valor}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
