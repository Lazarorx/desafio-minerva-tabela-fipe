// Tipos para a API da Fipe

export interface Brand {
  codigo: string;
  nome: string;
}

export interface Model {
  codigo: string;
  nome: string;
}

export interface Year {
  codigo: string;
  nome: string;
}

export interface VehiclePrice {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

export interface PriceRange {
  min: number;
  max: number;
  average: number;
  fipeValue: number;
}

export interface PriceTrend {
  month: string;
  value: number;
}

export interface SearchState {
  selectedBrand: string;
  selectedModel: string;
  selectedYear: string;
}
