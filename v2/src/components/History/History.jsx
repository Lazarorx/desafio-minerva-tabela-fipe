import { useState, useEffect } from 'react';
import storageService from '../../services/storageService';
import MarketComparison from '../MarketComparison/MarketComparison';
import { HistoryIcon, TrashIcon, XIcon, CalendarIcon, FuelIcon, StarIcon, CompareIcon, ChartIcon } from '../Icons/Icons';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = storageService.getHistory();
    setHistory(data);
  };

  const handleDelete = (id) => {
    if (confirm('Deseja remover esta consulta do histórico?')) {
      storageService.deleteFromHistory(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm('Deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      storageService.clearHistory();
      loadHistory();
    }
  };

  const handleAddToFavorites = (item) => {
    storageService.addToFavorites(item);
    alert('Veículo adicionado aos favoritos!');
  };

  const handleAddToComparison = (item) => {
    const success = storageService.addToComparison(item);
    if (success) {
      alert('Veículo adicionado à comparação!');
    } else {
      alert('Você já tem 3 veículos na comparação.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredHistory = history.filter(item =>
    item.Marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Modelo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <h1><HistoryIcon size={32} /> Histórico de Consultas</h1>
          <p>Todas as suas consultas anteriores</p>
        </div>
        {history.length > 0 && (
          <button className="btn btn-danger" onClick={handleClearAll}>
            <TrashIcon size={18} /> Limpar Histórico
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por marca ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {filteredHistory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><HistoryIcon size={64} /></div>
          <h2>Nenhuma consulta encontrada</h2>
          <p>
            {history.length === 0
              ? 'Você ainda não fez nenhuma consulta'
              : 'Nenhum resultado para sua busca'}
          </p>
        </div>
      ) : (
        <div className="history-grid">
          {filteredHistory.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-card-header">
                <div>
                  <h3>{item.Marca}</h3>
                  <p className="history-model">{item.Modelo}</p>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
                  title="Remover"
                >
                  <XIcon size={18} />
                </button>
              </div>

              <div className="history-details">
                <span><CalendarIcon size={16} /> {item.AnoModelo}</span>
                <span><FuelIcon size={16} /> {item.Combustivel}</span>
              </div>

              <div className="history-price">
                <span className="price-label">Valor Fipe</span>
                <span className="price-value">{item.Valor}</span>
              </div>

              <div className="history-date">
                Consultado em {formatDate(item.consultedAt)}
              </div>

              <div className="history-actions">
                <button
                  className="btn-action"
                  onClick={() => setSelectedVehicle(item)}
                  title="Analisar mercado"
                >
                  <ChartIcon size={18} />
                </button>
                <button
                  className="btn-action"
                  onClick={() => handleAddToFavorites(item)}
                  title="Adicionar aos favoritos"
                >
                  <StarIcon size={18} />
                </button>
                <button
                  className="btn-action"
                  onClick={() => handleAddToComparison(item)}
                  title="Adicionar à comparação"
                >
                  <CompareIcon size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredHistory.length > 0 && (
        <div className="history-stats">
          <p>
            Mostrando {filteredHistory.length} de {history.length} consultas
          </p>
        </div>
      )}

      {selectedVehicle && (
        <MarketComparison 
          vehicleData={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
        />
      )}
    </div>
  );
}

export default History;
