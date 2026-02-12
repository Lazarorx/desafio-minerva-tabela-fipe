import { useState, useEffect } from 'react';
import fipeApi from '../services/fipeApi';
import '../styles/VehicleSearch.css';

function VehicleSearch({ onSearchComplete }) {
  // States
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carrega marcas ao montar componente
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await fipeApi.fetchBrands();
      setBrands(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar marcas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega modelos quando marca é selecionada
  const handleBrandChange = async (e) => {
    const brandCode = e.target.value;
    setSelectedBrand(brandCode);
    setSelectedModel('');
    setSelectedYear('');
    setModels([]);
    setYears([]);

    if (!brandCode) return;

    try {
      setLoading(true);
      const data = await fipeApi.fetchModels(brandCode);
      setModels(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar modelos.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega anos quando modelo é selecionado
  const handleModelChange = async (e) => {
    const modelCode = e.target.value;
    setSelectedModel(modelCode);
    setSelectedYear('');
    setYears([]);

    if (!modelCode) return;

    try {
      setLoading(true);
      const data = await fipeApi.fetchYears(selectedBrand, modelCode);
      setYears(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar anos.');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza ano selecionado
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Submete consulta
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBrand || !selectedModel || !selectedYear) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      const data = await fipeApi.fetchPrice(
        selectedBrand,
        selectedModel,
        selectedYear
      );
      onSearchComplete(data);
    } catch (err) {
      setError('Erro ao consultar preço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-search">
      <h2>Consultar Veículo</h2>

      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Dropdown Marca */}
        <div className="form-group">
          <label htmlFor="brand">Marca:</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            disabled={loading}
          >
            <option value="">Selecione...</option>
            {brands.map((brand) => (
              <option key={brand.codigo} value={brand.codigo}>
                {brand.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Modelo */}
        <div className="form-group">
          <label htmlFor="model">Modelo:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={handleModelChange}
            disabled={loading || !selectedBrand}
          >
            <option value="">Selecione...</option>
            {models.map((model) => (
              <option key={model.codigo} value={model.codigo}>
                {model.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Ano */}
        <div className="form-group">
          <label htmlFor="year">Ano:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            disabled={loading || !selectedModel}
          >
            <option value="">Selecione...</option>
            {years.map((year) => (
              <option key={year.codigo} value={year.codigo}>
                {year.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={loading || !selectedBrand || !selectedModel || !selectedYear}
        >
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>
    </div>
  );
}

export default VehicleSearch;
