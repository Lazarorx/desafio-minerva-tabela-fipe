import type { PriceRange, PriceTrend } from '../types/fipe.types';

/**
 * Converte string de preço Fipe (ex: "R$ 45.000,00") para número
 */
export const parseFipePrice = (priceString: string): number => {
  return parseFloat(
    priceString
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  );
};

/**
 * Formata número para string de preço brasileiro
 */
export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Calcula faixa de preço baseada no valor Fipe
 * Simula variação de mercado de -8% a +12%
 */
export const calculatePriceRange = (fipeValue: number): PriceRange => {
  const min = Math.round(fipeValue * 0.92); // -8%
  const max = Math.round(fipeValue * 1.12); // +12%
  const average = Math.round((min + max) / 2);

  return {
    min,
    max,
    average,
    fipeValue,
  };
};

/**
 * Gera dados simulados de tendência de preço dos últimos 12 meses
 * Simula depreciação natural do veículo
 */
export const generatePriceTrend = (currentPrice: number): PriceTrend[] => {
  const months = [
    'Fev/26', 'Jan/26', 'Dez/25', 'Nov/25', 'Out/25', 'Set/25',
    'Ago/25', 'Jul/25', 'Jun/25', 'Mai/25', 'Abr/25', 'Mar/25'
  ].reverse();

  // Simula depreciação de ~0.5% ao mês nos últimos 12 meses
  return months.map((month, index) => {
    const monthsAgo = 11 - index;
    const depreciation = 1 + (monthsAgo * 0.005); // 0.5% por mês
    const historicalPrice = Math.round(currentPrice * depreciation);
    
    // Adiciona pequena variação aleatória para parecer mais real
    const variation = (Math.random() - 0.5) * 0.02; // ±1%
    const finalPrice = Math.round(historicalPrice * (1 + variation));

    return {
      month,
      value: finalPrice,
    };
  });
};

/**
 * Calcula a depreciação percentual
 */
export const calculateDepreciation = (
  currentPrice: number,
  originalPrice: number
): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
