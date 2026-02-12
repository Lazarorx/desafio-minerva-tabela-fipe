import { useState, useEffect } from 'react';
import storageService from '../../services/storageService';
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const data = storageService.getFavorites();
    setFavorites(data);
  };

  const handleRemove = (id) => {
    if (confirm('Deseja remover este veículo dos favoritos?')) {
      storageService.removeFromFavorites(id);
      loadFavorites();
    }
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
    });
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div>
          <h1>⭐ Meus Favoritos</h1>
          <p>Veículos que você salvou para acompanhar</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h2>Nenhum favorito ainda</h2>
          <p>Adicione veículos aos favoritos para acompanhá-los facilmente</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-card">
              <div className="favorite-badge">⭐ Favorito</div>
              
              <div className="favorite-header">
                <div>
                  <h3>{item.Marca}</h3>
                  <p className="favorite-model">{item.Modelo}</p>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                  title="Remover dos favoritos"
                >
                  ✕
                </button>
              </div>

              <div className="favorite-details">
                <div className="detail-item">
                  <span className="detail-label">Ano</span>
                  <span className="detail-value">{item.AnoModelo}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Combustível</span>
                  <span className="detail-value">{item.Combustivel}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Código Fipe</span>
                  <span className="detail-value">{item.CodigoFipe}</span>
                </div>
              </div>

              <div className="favorite-price">
                <span className="price-label">Valor Fipe</span>
                <span className="price-value">{item.Valor}</span>
                <span className="price-ref">{item.MesReferencia}</span>
              </div>

              <div className="favorite-date">
                Adicionado em {formatDate(item.favoritedAt)}
              </div>

              <button
                className="btn btn-secondary btn-block"
                onClick={() => handleAddToComparison(item)}
              >
                ⚖️ Adicionar à Comparação
              </button>
            </div>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites-stats">
          <p>Total de {favorites.length} veículos favoritos</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
