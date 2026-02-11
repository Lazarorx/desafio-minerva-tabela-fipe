import React, { useState, useEffect } from 'react';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import fipeApi from '../../services/fipeApi';
import type { Brand, Model, Year } from '../../types/fipe.types';

interface SearchFormProps {
  onSearch: (brandCode: string, modelCode: string, yearCode: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<Year[]>([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega marcas ao montar
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
      setError(err instanceof Error ? err.message : 'Erro ao carregar marcas');
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      setError(err instanceof Error ? err.message : 'Erro ao carregar modelos');
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      setError(err instanceof Error ? err.message : 'Erro ao carregar anos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBrand || !selectedModel || !selectedYear) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    onSearch(selectedBrand, selectedModel, selectedYear);
  };

  if (loading && brands.length === 0) {
    return <LoadingSpinner message="Carregando marcas..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      <Select
        label="Marca"
        options={brands.map(b => ({ value: b.codigo, label: b.nome }))}
        value={selectedBrand}
        onChange={handleBrandChange}
        disabled={loading}
      />

      <Select
        label="Modelo"
        options={models.map(m => ({ value: m.codigo, label: m.nome }))}
        value={selectedModel}
        onChange={handleModelChange}
        disabled={loading || !selectedBrand}
      />

      <Select
        label="Ano"
        options={years.map(y => ({ value: y.codigo, label: y.nome }))}
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        disabled={loading || !selectedModel}
      />

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={loading || !selectedBrand || !selectedModel || !selectedYear}
        isLoading={loading}
      >
        Consultar Preço
      </Button>
    </form>
  );
};

export default SearchForm;
