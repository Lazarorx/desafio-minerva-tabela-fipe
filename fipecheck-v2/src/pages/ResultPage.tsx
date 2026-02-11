import React, { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import VehicleDetails from '../components/molecules/VehicleDetails';
import PriceCard from '../components/molecules/PriceCard';
import PriceTrendChart from '../components/molecules/PriceTrendChart';
import fipeApi from '../services/fipeApi';
import { 
  parseFipePrice, 
  calculatePriceRange, 
  generatePriceTrend 
} from '../utils/priceCalculations';
import type { VehiclePrice, PriceRange, PriceTrend } from '../types/fipe.types';

interface ResultPageProps {
  brandCode: string;
  modelCode: string;
  yearCode: string;
  onNewSearch: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  brandCode,
  modelCode,
  yearCode,
  onNewSearch,
}) => {
  const [vehicleData, setVehicleData] = useState<VehiclePrice | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [priceTrend, setPriceTrend] = useState<PriceTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicleData();
  }, [brandCode, modelCode, yearCode]);

  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      const data = await fipeApi.fetchPrice(brandCode, modelCode, yearCode);
      setVehicleData(data);

      // Calcula faixa de preço
      const fipeValue = parseFipePrice(data.Valor);
      const range = calculatePriceRange(fipeValue);
      setPriceRange(range);

      // Gera tendência de preço
      const trend = generatePriceTrend(fipeValue);
      setPriceTrend(trend);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Consultando preço..." />
      </div>
    );
  }

  if (error || !vehicleData || !priceRange) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Erro na Consulta</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <Button variant="primary" onClick={onNewSearch}>
              Tentar Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Resultado da Consulta
          </h2>
          <p className="text-lg text-gray-600">
            {vehicleData.Marca} {vehicleData.Modelo}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Price Card */}
          <PriceCard priceRange={priceRange} />

          {/* Vehicle Details */}
          <VehicleDetails vehicle={vehicleData} />
        </div>

        {/* Price Trend Chart */}
        <div className="mb-6">
          <PriceTrendChart data={priceTrend} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={onNewSearch}
          >
            <svg style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Nova Consulta
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.print()}
          >
            <svg style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
            </svg>
            Imprimir Resultado
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            <strong>Aviso:</strong> Os valores apresentados são baseados na Tabela Fipe e 
            servem como referência de mercado. O preço final pode variar conforme o estado 
            de conservação, quilometragem e região do veículo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
