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

        <button 
          className="btn-new-search" 
          onClick={onNewSearch}
        >
          Nova Consulta
        </button>
      </div>
    </div>
  );
}

export default VehicleResult;
