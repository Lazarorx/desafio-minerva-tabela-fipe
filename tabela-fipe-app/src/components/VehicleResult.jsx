import '../styles/VehicleResult.css';

function VehicleResult({ vehicleData, onNewSearch }) {
  if (!vehicleData) return null;

  const formatReferenceMonth = (month) => {
    return month.charAt(0).toUpperCase() + month.slice(1);
  };

  return (
    <div className="vehicle-result">
      <h2>Resultado da Consulta</h2>
      
      <div className="result-card">
        <div className="vehicle-title">
          <h3>{vehicleData.Marca} {vehicleData.Modelo}</h3>
        </div>

        <div className="vehicle-info">
          <div className="info-row">
            <span className="label">Ano:</span>
            <span className="value">{vehicleData.AnoModelo}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Combustível:</span>
            <span className="value">{vehicleData.Combustivel}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Código Fipe:</span>
            <span className="value">{vehicleData.CodigoFipe}</span>
          </div>
        </div>

        <div className="vehicle-price">
          <span className="price-label">Valor Fipe</span>
          <span className="price-value">{vehicleData.Valor}</span>
        </div>

        <div className="reference-month">
          <small>
            Referência: {formatReferenceMonth(vehicleData.MesReferencia)}
          </small>
        </div>

        <div className="action-buttons">
          <button 
            className="btn-new-search" 
            onClick={onNewSearch}
          >
            <svg style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Nova Consulta
          </button>
          <button 
            className="btn-share"
            onClick={() => {
              const text = `${vehicleData.Marca} ${vehicleData.Modelo} (${vehicleData.AnoModelo}) - ${vehicleData.Valor}`;
              if (navigator.share) {
                navigator.share({ title: 'FipeCheck', text });
              } else {
                navigator.clipboard.writeText(text);
                alert('Informações copiadas!');
              }
            }}
          >
            <svg style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleResult;
