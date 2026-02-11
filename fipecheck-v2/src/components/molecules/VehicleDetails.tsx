import React from 'react';
import Card from '../atoms/Card';
import type { VehiclePrice } from '../../types/fipe.types';

interface VehicleDetailsProps {
  vehicle: VehiclePrice;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {
  const iconStyle = { width: '24px', height: '24px' };
  
  const details = [
    { 
      label: 'Marca', 
      value: vehicle.Marca, 
      icon: <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
    },
    { 
      label: 'Modelo', 
      value: vehicle.Modelo, 
      icon: <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17h14v-5H5v5zm7-13C6.48 4 2 6.24 2 9v10c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h14v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V9c0-2.76-4.48-5-10-5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>
    },
    { 
      label: 'Ano', 
      value: vehicle.AnoModelo.toString(), 
      icon: <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    },
    { 
      label: 'Combustível', 
      value: vehicle.Combustivel, 
      icon: <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22h12"/><path d="M4 9h10"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
    },
    { 
      label: 'Código Fipe', 
      value: vehicle.CodigoFipe, 
      icon: <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h2"/><path d="M6 14h2"/><path d="M16 10h2"/><path d="M16 14h2"/></svg>
    },
    { 
      label: 'Referência', 
      value: vehicle.MesReferencia, 
      icon: <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        Detalhes do Veículo
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
