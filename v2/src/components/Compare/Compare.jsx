import { useState, useEffect } from 'react';
import storageService from '../../services/storageService';
import { CompareIcon, TrashIcon, XIcon, ChartIcon, PlusIcon } from '../Icons/Icons';
import './Compare.css';

function Compare() {
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    loadComparisons();
  }, []);

  const loadComparisons = () => {
    const data = storageService.getComparisons();
    setComparisons(data);
  };

  const handleRemove = (id) => {
    storageService.removeFromComparison(id);
    loadComparisons();
  };

  const handleClearAll = () => {
    if (confirm('Deseja limpar toda a comparação?')) {
      storageService.clearComparisons();
      loadComparisons();
    }
  };

  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace('R$', '').replace('.', '').replace(',', '.').trim());
  };

  const getPriceDifference = () => {
    if (comparisons.length < 2) return null;
    
    const prices = comparisons.map(item => parsePrice(item.Valor));
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const difference = maxPrice - minPrice;
    
    return {
      max: maxPrice,
      min: minPrice,
      difference: difference.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      percentage: ((difference / minPrice) * 100).toFixed(1)
    };
  };

  const priceDiff = getPriceDifference();

  return (
    <div className="compare-page">
      <div className="compare-header">
        <div>
          <h1><CompareIcon size={32} /> Comparar Veículos</h1>
          <p>Compare até 3 veículos lado a lado</p>
        </div>
        {comparisons.length > 0 && (
          <button className="btn btn-danger" onClick={handleClearAll}>
            <TrashIcon size={18} /> Limpar Comparação
          </button>
        )}
      </div>

      {comparisons.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><CompareIcon size={64} /></div>
          <h2>Nenhum veículo para comparar</h2>
          <p>Adicione veículos à comparação para ver as diferenças</p>
        </div>
      ) : (
        <>
          {priceDiff && comparisons.length >= 2 && (
            <div className="price-analysis">
              <h3><ChartIcon size={24} /> Análise de Preços</h3>
              <div className="analysis-grid">
                <div className="analysis-item">
                  <span className="analysis-label">Diferença</span>
                  <span className="analysis-value">{priceDiff.difference}</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">Variação</span>
                  <span className="analysis-value">{priceDiff.percentage}%</span>
                </div>
              </div>
            </div>
          )}

          <div className="compare-grid">
            {comparisons.map((item, index) => (
              <div key={item.id} className="compare-card">
                <div className="compare-badge">Veículo {index + 1}</div>
                
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                  title="Remover da comparação"
                >
                  <XIcon size={18} />
                </button>

                <div className="compare-header-info">
                  <h3>{item.Marca}</h3>
                  <p className="compare-model">{item.Modelo}</p>
                </div>

                <div className="compare-details">
                  <div className="compare-row">
                    <span className="row-label">Ano</span>
                    <span className="row-value">{item.AnoModelo}</span>
                  </div>
                  <div className="compare-row">
                    <span className="row-label">Combustível</span>
                    <span className="row-value">{item.Combustivel}</span>
                  </div>
                  <div className="compare-row">
                    <span className="row-label">Código Fipe</span>
                    <span className="row-value">{item.CodigoFipe}</span>
                  </div>
                  <div className="compare-row">
                    <span className="row-label">Mês Referência</span>
                    <span className="row-value">{item.MesReferencia}</span>
                  </div>
                </div>

                <div className="compare-price">
                  <span className="price-label">Valor Fipe</span>
                  <span className="price-value">{item.Valor}</span>
                </div>
              </div>
            ))}

            {comparisons.length < 3 && (
              <div className="compare-card compare-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon"><PlusIcon size={48} /></div>
                  <p>Adicione mais veículos para comparar</p>
                  <span className="placeholder-hint">
                    {3 - comparisons.length} {comparisons.length === 2 ? 'vaga disponível' : 'vagas disponíveis'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {comparisons.length >= 2 && (
            <div className="comparison-table">
              <h3><HistoryIcon size={24} /> Comparação Detalhada</h3>
              <table>
                <thead>
                  <tr>
                    <th>Característica</th>
                    {comparisons.map((item, index) => (
                      <th key={item.id}>Veículo {index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-label">Marca</td>
                    {comparisons.map(item => (
                      <td key={item.id}>{item.Marca}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="table-label">Modelo</td>
                    {comparisons.map(item => (
                      <td key={item.id}>{item.Modelo}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="table-label">Ano</td>
                    {comparisons.map(item => (
                      <td key={item.id}>{item.AnoModelo}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="table-label">Combustível</td>
                    {comparisons.map(item => (
                      <td key={item.id}>{item.Combustivel}</td>
                    ))}
                  </tr>
                  <tr className="highlight-row">
                    <td className="table-label">Valor Fipe</td>
                    {comparisons.map(item => (
                      <td key={item.id} className="price-cell">{item.Valor}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Compare;
