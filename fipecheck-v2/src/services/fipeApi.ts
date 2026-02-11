import axios from 'axios';
import type { Brand, Model, Year, VehiclePrice } from '../types/fipe.types';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1';
const VEHICLE_TYPE = 'carros';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Busca todas as marcas de veículos
 */
export const fetchBrands = async (): Promise<Brand[]> => {
  try {
    const response = await api.get<Brand[]>(`/${VEHICLE_TYPE}/marcas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    throw new Error('Não foi possível carregar as marcas. Tente novamente.');
  }
};

/**
 * Busca todos os modelos de uma marca específica
 */
export const fetchModels = async (brandCode: string): Promise<Model[]> => {
  try {
    const response = await api.get(`/${VEHICLE_TYPE}/marcas/${brandCode}/modelos`);
    return response.data.modelos;
  } catch (error) {
    console.error('Erro ao buscar modelos:', error);
    throw new Error('Não foi possível carregar os modelos. Tente novamente.');
  }
};

/**
 * Busca todos os anos disponíveis para um modelo específico
 */
export const fetchYears = async (
  brandCode: string,
  modelCode: string
): Promise<Year[]> => {
  try {
    const response = await api.get<Year[]>(
      `/${VEHICLE_TYPE}/marcas/${brandCode}/modelos/${modelCode}/anos`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar anos:', error);
    throw new Error('Não foi possível carregar os anos. Tente novamente.');
  }
};

/**
 * Busca o preço de um veículo específico
 */
export const fetchPrice = async (
  brandCode: string,
  modelCode: string,
  yearCode: string
): Promise<VehiclePrice> => {
  try {
    const response = await api.get<VehiclePrice>(
      `/${VEHICLE_TYPE}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar preço:', error);
    throw new Error('Não foi possível consultar o preço. Tente novamente.');
  }
};

export default {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchPrice,
};
