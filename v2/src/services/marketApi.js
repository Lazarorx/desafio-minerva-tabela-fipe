import axios from 'axios';

// Serviço que simula dados de mercado baseados na Fipe
// Em produção, isso seria integrado com APIs reais de Webmotors, OLX, etc.

class MarketAPI {
  constructor() {
    this.sources = ['Webmotors', 'OLX', 'Mercado Livre', 'iCarros'];
  }

  // Gera variação realista de preço baseado na Fipe
  generateMarketVariation(fipePrice, source) {
    const numericPrice = this.parseFipePrice(fipePrice);
    
    // Cada fonte tem um padrão de variação diferente
    const variations = {
      'Webmotors': { min: -0.08, max: 0.15 }, // -8% a +15%
      'OLX': { min: -0.15, max: 0.10 }, // -15% a +10% (mais variação)
      'Mercado Livre': { min: -0.12, max: 0.12 }, // -12% a +12%
      'iCarros': { min: -0.05, max: 0.18 } // -5% a +18%
    };

    const range = variations[source];
    const variation = Math.random() * (range.max - range.min) + range.min;
    const marketPrice = numericPrice * (1 + variation);

    return {
      source,
      price: marketPrice,
      formattedPrice: this.formatPrice(marketPrice),
      variation: (variation * 100).toFixed(1),
      isOpportunity: variation < -0.05 // Oportunidade se 5% abaixo da Fipe
    };
  }

  // Converte preço Fipe para número
  parseFipePrice(priceString) {
    return parseFloat(
      priceString
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim()
    );
  }

  // Formata número para preço brasileiro
  formatPrice(price) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // Busca preços de mercado para um veículo
  async getMarketPrices(vehicleData) {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 800));

    const fipePrice = vehicleData.Valor;
    const marketData = this.sources.map(source => 
      this.generateMarketVariation(fipePrice, source)
    );

    // Calcula estatísticas
    const prices = marketData.map(d => d.price);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const fipeNumeric = this.parseFipePrice(fipePrice);

    return {
      vehicle: {
        marca: vehicleData.Marca,
        modelo: vehicleData.Modelo,
        ano: vehicleData.AnoModelo,
        combustivel: vehicleData.Combustivel
      },
      fipe: {
        price: fipeNumeric,
        formattedPrice: fipePrice,
        mesReferencia: vehicleData.MesReferencia
      },
      market: marketData,
      analysis: {
        avgPrice,
        formattedAvgPrice: this.formatPrice(avgPrice),
        minPrice,
        formattedMinPrice: this.formatPrice(minPrice),
        maxPrice,
        formattedMaxPrice: this.formatPrice(maxPrice),
        spread: maxPrice - minPrice,
        formattedSpread: this.formatPrice(maxPrice - minPrice),
        spreadPercentage: (((maxPrice - minPrice) / minPrice) * 100).toFixed(1),
        fipeVsMarket: (((avgPrice - fipeNumeric) / fipeNumeric) * 100).toFixed(1),
        hasOpportunities: marketData.some(d => d.isOpportunity),
        bestDeal: marketData.reduce((best, current) => 
          current.price < best.price ? current : best
        )
      }
    };
  }

  // Detecta oportunidades (preços abaixo da Fipe)
  findOpportunities(marketComparison) {
    return marketComparison.market.filter(item => item.isOpportunity);
  }

  // Gera recomendação de compra
  generateRecommendation(marketComparison) {
    const { analysis } = marketComparison;
    const fipeVsMarket = parseFloat(analysis.fipeVsMarket);

    if (fipeVsMarket < -5) {
      return {
        type: 'excellent',
        title: 'Excelente Oportunidade!',
        message: `O mercado está ${Math.abs(fipeVsMarket).toFixed(1)}% abaixo da Fipe. Ótimo momento para comprar!`,
        color: '#10b981'
      };
    } else if (fipeVsMarket < 0) {
      return {
        type: 'good',
        title: 'Boa Oportunidade',
        message: `Preços ${Math.abs(fipeVsMarket).toFixed(1)}% abaixo da Fipe. Vale a pena considerar.`,
        color: '#3b82f6'
      };
    } else if (fipeVsMarket < 5) {
      return {
        type: 'neutral',
        title: 'Preço Justo',
        message: 'Preços próximos à tabela Fipe. Mercado equilibrado.',
        color: '#f59e0b'
      };
    } else {
      return {
        type: 'caution',
        title: 'Atenção',
        message: `Mercado ${fipeVsMarket}% acima da Fipe. Considere negociar ou aguardar.`,
        color: '#ef4444'
      };
    }
  }
}

export default new MarketAPI();
