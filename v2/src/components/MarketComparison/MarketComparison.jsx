import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import marketApi from '../../services/marketApi';
import { ChartIcon, AlertIcon, CheckIcon, TrendingUpIcon, TrendingDownIcon } from '../Icons/Icons';
import './MarketComparison.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function MarketComparison({ vehicleData, onClose }) {
  const [loading, setLoading] = useState(true);
  const [comparison, setComparison] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadMarketData();
  }, [vehicleData]);

  const loadMarketData = async () => {
    setLoading(true);
    try {
      const data = await marketApi.getMarketPrices(vehicleData);
      setComparison(data);
      setRecommendation(marketApi.generateRecommendation(data));
      setInsights(marketApi.generateInsights(data));
    } catch (error) {
      console.error('Erro ao carregar dados de mercado:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="market-comparison-modal">
        <div className="market-comparison-content loading">
          <div className="spinner"></div>
          <p>Analisando mercado...</p>
        </div>
      </div>
    );
  }

  if (!comparison) {
    return null;
  }

  // Dados para o gráfico
  const chartData = {
    labels: ['Fipe', ...comparison.market.map(m => m.source)],
    datasets: [
      {
        label: 'Preços',
        data: [
          comparison.fipe.price,
          ...comparison.market.map(m => m.price)
        ],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: (context) => {
          const index = context.dataIndex;
          if (index === 0) return '#8b5cf6'; // Fipe em roxo
          const marketItem = comparison.market[index - 1];
          return marketItem.isOpportunity ? '#10b981' : '#3b82f6';
        }
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `R$ ${(value / 1000).toFixed(0)}k`
        }
      }
    }
  };

  const opportunities = marketApi.findOpportunities(comparison);

  return (
    <div className="market-comparison-modal" onClick={onClose}>
      <div className="market-comparison-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2><ChartIcon size={28} /> Análise de Mercado</h2>
          <p className="vehicle-info">
            {comparison.vehicle.marca} {comparison.vehicle.modelo} - {comparison.vehicle.ano}
          </p>
        </div>

        {/* Recomendação */}
        <div className="recommendation-card" style={{ borderColor: recommendation.color }}>
          <div className="recommendation-icon" style={{ color: recommendation.color }}>
            {recommendation.type === 'excellent' || recommendation.type === 'good' ? (
              <CheckIcon size={32} />
            ) : (
              <AlertIcon size={32} />
            )}
          </div>
          <div className="recommendation-content">
            <h3 style={{ color: recommendation.color }}>{recommendation.title}</h3>
            <p>{recommendation.message}</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Tabela Fipe</span>
            <span className="stat-value fipe">{comparison.fipe.formattedPrice}</span>
            <span className="stat-ref">{comparison.fipe.mesReferencia}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Média de Mercado</span>
            <span className="stat-value">{comparison.analysis.formattedAvgPrice}</span>
            <span className={`stat-variation ${parseFloat(comparison.analysis.fipeVsMarket) < 0 ? 'positive' : 'negative'}`}>
              {parseFloat(comparison.analysis.fipeVsMarket) < 0 ? '↓' : '↑'} {Math.abs(comparison.analysis.fipeVsMarket)}%
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Menor Preço</span>
            <span className="stat-value best">{comparison.analysis.formattedMinPrice}</span>
            <span className="stat-source">{comparison.analysis.bestDeal.source}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Variação</span>
            <span className="stat-value">{comparison.analysis.formattedSpread}</span>
            <span className="stat-percentage">{comparison.analysis.spreadPercentage}%</span>
          </div>
        </div>

        {/* Gráfico */}
        <div className="chart-container">
          <h3>Comparação de Preços</h3>
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="insights-section">
            <h3>💡 Insights</h3>
            <div className="insights-grid">
              {insights.map((insight, index) => (
                <div key={index} className={`insight-card insight-${insight.type}`}>
                  <span className="insight-icon">{insight.icon}</span>
                  <span className="insight-text">{insight.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Oportunidades */}
        {opportunities.length > 0 && (
          <div className="opportunities-section">
            <h3><CheckIcon size={24} /> Oportunidades Encontradas</h3>
            <div className="opportunities-grid">
              {opportunities.map((opp, index) => (
                <div key={index} className="opportunity-card">
                  <div className="opportunity-header">
                    <span className="opportunity-source">{opp.source}</span>
                    <span className="opportunity-badge">-{Math.abs(opp.variation)}%</span>
                  </div>
                  <div className="opportunity-price">{opp.formattedPrice}</div>
                  <div className="opportunity-savings">
                    Economia de {marketApi.formatPrice(comparison.fipe.price - opp.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detalhes por fonte */}
        <div className="sources-section">
          <h3>Preços por Fonte</h3>
          <div className="sources-list">
            {comparison.market.map((item, index) => (
              <div key={index} className={`source-item ${item.isOpportunity ? 'opportunity' : ''}`}>
                <div className="source-info">
                  <span className="source-name">{item.source}</span>
                  {item.isOpportunity && <span className="opportunity-tag">Oportunidade</span>}
                </div>
                <div className="source-price-info">
                  <span className="source-price">{item.formattedPrice}</span>
                  <span className={`source-variation ${parseFloat(item.variation) < 0 ? 'positive' : 'negative'}`}>
                    {parseFloat(item.variation) < 0 ? '↓' : '↑'} {Math.abs(item.variation)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <p className="disclaimer">
            Dados simulados baseados em padrões reais de mercado. Em produção, integrado com APIs de Webmotors, OLX, Mercado Livre e iCarros.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketComparison;
