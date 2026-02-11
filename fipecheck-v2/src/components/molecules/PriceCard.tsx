import React from 'react';
import Card from '../atoms/Card';
import { formatPrice } from '../../utils/priceCalculations';
import type { PriceRange } from '../../types/fipe.types';

interface PriceCardProps {
  priceRange: PriceRange;
  title?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ 
  priceRange,
  title = 'Faixa de Preço de Mercado'
}) => {
  return (
    <Card className="bg-gradient-to-br from-primary-50 to-blue-50">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {/* Preço Mínimo */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Preço Mínimo:</span>
          <span className="text-xl font-bold text-green-600">
            {formatPrice(priceRange.min)}
          </span>
        </div>

        {/* Preço Médio */}
        <div className="flex justify-between items-center py-3 border-y border-gray-200">
          <span className="text-gray-600 font-medium">Preço Justo:</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(priceRange.average)}
          </span>
        </div>

        {/* Preço Máximo */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Preço Máximo:</span>
          <span className="text-xl font-bold text-red-600">
            {formatPrice(priceRange.max)}
          </span>
        </div>

        {/* Valor Fipe */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Valor Fipe:</span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(priceRange.fipeValue)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          💡 A faixa de preço considera variações de mercado baseadas no valor Fipe
        </p>
      </div>
    </Card>
  );
};

export default PriceCard;
