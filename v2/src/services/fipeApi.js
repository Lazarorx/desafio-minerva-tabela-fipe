import axios from 'axios';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros';

class FipeApi {
  // Buscar marcas
  async fetchBrands() {
    const response = await axios.get(`${BASE_URL}/marcas`);
    return response.data;
  }

  // Buscar modelos
  async fetchModels(brandCode) {
    const response = await axios.get(`${BASE_URL}/marcas/${brandCode}/modelos`);
    return response.data.modelos;
  }

  // Buscar anos
  async fetchYears(brandCode, modelCode) {
    const response = await axios.get(
      `${BASE_URL}/marcas/${brandCode}/modelos/${modelCode}/anos`
    );
    return response.data;
  }

  // Buscar preço
  async fetchPrice(brandCode, modelCode, yearCode) {
    const response = await axios.get(
      `${BASE_URL}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
    );
    return response.data;
  }
}

export default new FipeApi();
