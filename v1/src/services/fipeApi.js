import axios from 'axios';

const API_BASE = 'https://parallelum.com.br/fipe/api/v1';

const fipeApi = {
  // Buscar marcas
  fetchBrands: async () => {
    try {
      const response = await axios.get(`${API_BASE}/carros/marcas`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
      throw new Error('Falha ao carregar marcas');
    }
  },

  // Buscar modelos
  fetchModels: async (brandCode) => {
    try {
      const response = await axios.get(
        `${API_BASE}/carros/marcas/${brandCode}/modelos`
      );
      return response.data.modelos;
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
      throw new Error('Falha ao carregar modelos');
    }
  },

  // Buscar anos
  fetchYears: async (brandCode, modelCode) => {
    try {
      const response = await axios.get(
        `${API_BASE}/carros/marcas/${brandCode}/modelos/${modelCode}/anos`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
      throw new Error('Falha ao carregar anos');
    }
  },

  // Buscar preço
  fetchPrice: async (brandCode, modelCode, yearCode) => {
    try {
      const response = await axios.get(
        `${API_BASE}/carros/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar preço:', error);
      throw new Error('Falha ao consultar preço');
    }
  }
};

export default fipeApi;
