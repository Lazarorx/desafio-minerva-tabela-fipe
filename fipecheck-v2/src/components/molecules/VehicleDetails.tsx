import React from 'react';
import Card from '../atoms/Card';
import type { VehiclePrice } from '../../types/fipe.types';

interface VehicleDetailsProps {
  vehicle: VehiclePrice;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {
  const details = [
    { label: 'Marca', value: vehicle.Marca, icon: '🏢' },
    { label: 'Modelo', value: vehicle.Modelo, icon: '🚗' },
    { label: 'Ano', value: vehicle.AnoModelo.toString(), icon: '📅' },
    { label: 'Combustível', value: vehicle.Combustivel, icon: '⛽' },
    { label: 'Código Fipe', value: vehicle.CodigoFipe, icon: '🔢' },
    { label: 'Referência', value: vehicle.MesReferencia, icon: '📊' },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        📋 Detalhes do Veículo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">{detail.icon}</span>
            <div>
              <p className="text-xs text-gray-500 font-medium">{detail.label}</p>
              <p className="text-sm font-semibold text-gray-800">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VehicleDetails;
