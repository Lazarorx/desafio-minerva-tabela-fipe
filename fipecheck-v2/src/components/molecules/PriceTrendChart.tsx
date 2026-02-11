import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '../atoms/Card';
import type { PriceTrend } from '../../types/fipe.types';
import { formatPrice } from '../../utils/priceCalculations';

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

interface PriceTrendChartProps {
  data: PriceTrend[];
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Valor Fipe',
        data: data.map(d => d.value),
        borderColor: 'rgb(52, 152, 219)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(52, 152, 219)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return formatPrice(context.parsed.y);
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return formatPrice(value);
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        Evolução de Preço (Últimos 12 Meses)
      </h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Dados simulados baseados em tendências históricas de depreciação
        </p>
      </div>
    </Card>
  );
};

export default PriceTrendChart;
