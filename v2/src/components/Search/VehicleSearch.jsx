import { useState, useEffect } from 'react';
import fipeApi from '../../services/fipeApi';
import storageService from '../../services/storageService';
import './VehicleSearch.css';

function VehicleSearch({ onNavigate }) {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await fipeApi.fetchBrands();
      setBrands(data);
    } catch (err) {
      setError('Erro ao carregar marcas');
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = async (e) => {
    const brandCode = e.target.value;
    setSelectedBrand(brandCode);
    setSelectedModel('');
    setSelectedYear('');
    setModels([]);
    setYears([]);
    setResult(null);

    if (!brandCode) return;

    try {
      setLoading(true);
      const data = await fipeApi.fetchModels(brandCode);
      setModels(data);
    } catch (err) {
      setError('Erro ao carregar modelos');
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = async (e) => {
    const modelCode = e.target.value;
    setSelectedModel(modelCode);
    setSelectedYear('');
    setYears([]);
    setResult(null);

    if (!modelCode) return;

    try {
      setLoading(true);
      const data = await fipeApi.fetchYears(selectedBrand, modelCode);
      setYears(data);
    } catch (err) {
      setError('Erro ao carregar anos');
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBrand || !selectedModel || !selectedYear) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fipeApi.fetchPrice(selectedBrand, selectedModel, selectedYear);
      setResult(data);
      
      // Salva no histórico
      storageService.saveToHistory(data);
    } catch (err) {
      setError('Erro ao consultar preço');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    if (result) {
      storageService.addToFavorites(result);
      alert('Veículo adicionado aos favoritos!');
    }
  };

  const handleAddToComparison = () => {
    if (result) {
      const success = storageService.addToComparison(result);
      if (success) {
        alert('Veículo adicionado à comparação!');
      } else {
        alert('Você já tem 3 veículos na comparação. Remova um para adicionar outro.');
      }
    }
  };

  return (
    <div className="vehicle-search-page">
      <div className="search-container">
        <div className="search-header">
          <h1>🔍 Consultar Veículo</h1>
          <p>Consulte o preço de qualquer veículo pela Tabela Fipe</p>
        </div>

        <div className="search-card">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="brand">Marca</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                disabled={loading}
              >
                <option value="">Selecione a marca...</option>
                {brands.map((brand) => (
                  <option key={brand.codigo} value={brand.codigo}>
                    {brand.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="model">Modelo</label>
              <select
                id="model"
                value={selectedModel}
                onChange={handleModelChange}
                disabled={loading || !selectedBrand}
              >
                <option value="">Selecione o modelo...</option>
                {models.map((model) => (
                  <option key={model.codigo} value={model.codigo}>
                    {model.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Ano</label>
              <select
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                disabled={loading || !selectedModel}
              >
                <option value="">Selecione o ano...</option>
                {years.map((year) => (
                  <option key={year.codigo} value={year.codigo}>
                    {year.nome}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading || !selectedBrand || !selectedModel || !selectedYear}
            >
              {loading ? 'Consultando...' : 'Consultar Preço'}
            </button>
          </form>
        </div>

        {result && (
          <div className="result-card">
            <div className="result-header">
              <h2>Resultado da Consulta</h2>
            </div>

            <div className="result-content">
              <div className="result-info">
                <h3>{result.Marca}</h3>
                <p className="result-model">{result.Modelo}</p>
                <div className="result-details">
                  <span>📅 {result.AnoModelo}</span>
                  <span>⛽ {result.Combustivel}</span>
                  <span>🔢 {result.CodigoFipe}</span>
                </div>
              </div>

              <div className="result-price">
                <span className="price-label">Valor Fipe</span>
                <span className="price-value">{result.Valor}</span>
                <span className="price-ref">Ref: {result.MesReferencia}</span>
              </div>
            </div>

            <div className="result-actions">
              <button className="btn btn-success" onClick={handleAddToFavorites}>
                ⭐ Adicionar aos Favoritos
              </button>
              <button className="btn btn-secondary" onClick={handleAddToComparison}>
                ⚖️ Adicionar à Comparação
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate('history')}>
                📋 Ver Histórico
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehicleSearch;
