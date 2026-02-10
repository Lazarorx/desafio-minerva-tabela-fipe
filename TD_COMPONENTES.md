# Technical Design - Componentes React

## 1. Visão Geral da Arquitetura

**Tipo:** Aplicação Web SPA (Single Page Application)
**Framework:** React 18+ com Vite
**Linguagem:** JavaScript 
**Estilo:** CSS Modules ou CSS puro

---

## 2. Estrutura de Componentes

```
src/
├── components/
│   ├── App.jsx                 # Componente raiz
│   ├── VehicleSearch.jsx       # Formulário de busca
│   ├── VehicleResult.jsx       # Exibição do resultado
│   └── Loading.jsx             # Componente de loading (opcional)
├── services/
│   └── fipeApi.js              # Serviço de integração com API
├── styles/
│   ├── App.css
│   ├── VehicleSearch.css
│   └── VehicleResult.css
└── main.jsx                    # Entry point
```

---

## 3. Componente: App

### 3.1 Responsabilidades
- Gerenciar navegação entre telas (busca/resultado)
- Manter estado global do veículo consultado
- Orquestrar comunicação entre componentes

### 3.2 Props
Nenhuma (componente raiz)

### 3.3 State
```javascript
const [currentView, setCurrentView] = useState('search'); // 'search' | 'result'
const [vehicleData, setVehicleData] = useState(null);
```

### 3.4 Métodos
```javascript
// Callback quando busca é concluída
const handleSearchComplete = (data) => {
  setVehicleData(data);
  setCurrentView('result');
};

// Callback para nova consulta
const handleNewSearch = () => {
  setVehicleData(null);
  setCurrentView('search');
};
```


### 3.5 Renderização
```javascript
function App() {
  const [currentView, setCurrentView] = useState('search');
  const [vehicleData, setVehicleData] = useState(null);

  const handleSearchComplete = (data) => {
    setVehicleData(data);
    setCurrentView('result');
  };

  const handleNewSearch = () => {
    setVehicleData(null);
    setCurrentView('search');
  };

  return (
    <div className="app">
      <header>
        <h1>Consulta Tabela Fipe</h1>
      </header>
      <main>
        {currentView === 'search' ? (
          <VehicleSearch onSearchComplete={handleSearchComplete} />
        ) : (
          <VehicleResult 
            vehicleData={vehicleData} 
            onNewSearch={handleNewSearch} 
          />
        )}
      </main>
    </div>
  );
}
```

### 3.6 Dependências
- React (useState)
- VehicleSearch component
- VehicleResult component

---

## 4. Componente: VehicleSearch

### 4.1 Responsabilidades
- Gerenciar formulário de busca (3 dropdowns)
- Fazer chamadas à API da Fipe em cascata
- Validar seleções do usuário
- Exibir estados de loading e erro
- Notificar componente pai quando consulta finalizar

### 4.2 Props
```javascript
{
  onSearchComplete: PropTypes.func.isRequired
  // Callback chamada com dados do veículo quando consulta finaliza
}
```

### 4.3 State
```javascript
const [brands, setBrands] = useState([]);           // Lista de marcas
const [models, setModels] = useState([]);           // Lista de modelos
const [years, setYears] = useState([]);             // Lista de anos

const [selectedBrand, setSelectedBrand] = useState('');   // Marca selecionada
const [selectedModel, setSelectedModel] = useState('');   // Modelo selecionado
const [selectedYear, setSelectedYear] = useState('');     // Ano selecionado

const [loading, setLoading] = useState(false);      // Estado de carregamento
const [error, setError] = useState(null);           // Mensagem de erro
```


### 4.4 Métodos Principais

```javascript
// Carrega marcas ao montar componente
useEffect(() => {
  loadBrands();
}, []);

const loadBrands = async () => {
  try {
    setLoading(true);
    const data = await fipeApi.fetchBrands();
    setBrands(data);
    setError(null);
  } catch (err) {
    setError('Erro ao carregar marcas. Tente novamente.');
  } finally {
    setLoading(false);
  }
};

// Carrega modelos quando marca é selecionada
const handleBrandChange = async (e) => {
  const brandCode = e.target.value;
  setSelectedBrand(brandCode);
  setSelectedModel('');
  setSelectedYear('');
  setModels([]);
  setYears([]);

  if (!brandCode) return;

  try {
    setLoading(true);
    const data = await fipeApi.fetchModels(brandCode);
    setModels(data);
    setError(null);
  } catch (err) {
    setError('Erro ao carregar modelos.');
  } finally {
    setLoading(false);
  }
};

// Carrega anos quando modelo é selecionado
const handleModelChange = async (e) => {
  const modelCode = e.target.value;
  setSelectedModel(modelCode);
  setSelectedYear('');
  setYears([]);

  if (!modelCode) return;

  try {
    setLoading(true);
    const data = await fipeApi.fetchYears(selectedBrand, modelCode);
    setYears(data);
    setError(null);
  } catch (err) {
    setError('Erro ao carregar anos.');
  } finally {
    setLoading(false);
  }
};

// Atualiza ano selecionado
const handleYearChange = (e) => {
  setSelectedYear(e.target.value);
};

// Submete consulta
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedBrand || !selectedModel || !selectedYear) {
    setError('Preencha todos os campos.');
    return;
  }

  try {
    setLoading(true);
    const data = await fipeApi.fetchPrice(
      selectedBrand, 
      selectedModel, 
      selectedYear
    );
    onSearchComplete(data); // Notifica componente pai
  } catch (err) {
    setError('Erro ao consultar preço. Tente novamente.');
  } finally {
    setLoading(false);
  }
};
```


### 4.5 Renderização
```javascript
function VehicleSearch({ onSearchComplete }) {
  // ... states e métodos ...

  return (
    <div className="vehicle-search">
      <h2>Consultar Veículo</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Dropdown Marca */}
        <div className="form-group">
          <label htmlFor="brand">Marca:</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            disabled={loading}
          >
            <option value="">Selecione...</option>
            {brands.map(brand => (
              <option key={brand.codigo} value={brand.codigo}>
                {brand.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Modelo */}
        <div className="form-group">
          <label htmlFor="model">Modelo:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={handleModelChange}
            disabled={loading || !selectedBrand}
          >
            <option value="">Selecione...</option>
            {models.map(model => (
              <option key={model.codigo} value={model.codigo}>
                {model.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Ano */}
        <div className="form-group">
          <label htmlFor="year">Ano:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            disabled={loading || !selectedModel}
          >
            <option value="">Selecione...</option>
            {years.map(year => (
              <option key={year.codigo} value={year.codigo}>
                {year.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Botão Submit */}
        <button 
          type="submit" 
          disabled={loading || !selectedBrand || !selectedModel || !selectedYear}
        >
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>
    </div>
  );
}
```

### 4.6 Validações
- Dropdown de modelo só habilitado se marca selecionada
- Dropdown de ano só habilitado se modelo selecionado
- Botão de consulta só habilitado se todos os campos preenchidos
- Previne submit se campos vazios

### 4.7 Dependências
- React (useState, useEffect)
- fipeApi service
- PropTypes (validação de props)


---

## 5. Componente: VehicleResult

### 5.1 Responsabilidades
- Exibir dados do veículo consultado
- Formatar preço e informações
- Permitir nova consulta

### 5.2 Props
```javascript
{
  vehicleData: PropTypes.object.isRequired,
  // Objeto com dados do veículo da API Fipe
  
  onNewSearch: PropTypes.func.isRequired
  // Callback para voltar à tela de busca
}
```

### 5.3 State
Nenhum (componente stateless/apresentacional)

### 5.4 Métodos
```javascript
// Formatar mês de referência (capitalizar)
const formatReferenceMonth = (month) => {
  return month.charAt(0).toUpperCase() + month.slice(1);
};
```

### 5.5 Renderização
```javascript
function VehicleResult({ vehicleData, onNewSearch }) {
  if (!vehicleData) return null;

  return (
    <div className="vehicle-result">
      <h2>Resultado da Consulta</h2>
      
      <div className="result-card">
        {/* Título do veículo */}
        <div className="vehicle-title">
          <h3>{vehicleData.Marca} {vehicleData.Modelo}</h3>
        </div>

        {/* Informações do veículo */}
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

        {/* Preço em destaque */}
        <div className="vehicle-price">
          <span className="price-label">Valor Fipe</span>
          <span className="price-value">{vehicleData.Valor}</span>
        </div>

        {/* Mês de referência */}
        <div className="reference-month">
          <small>
            Referência: {formatReferenceMonth(vehicleData.MesReferencia)}
          </small>
        </div>

        {/* Botão nova consulta */}
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
```

### 5.6 Dependências
- React
- PropTypes


---

## 6. Serviço: fipeApi

### 6.1 Responsabilidades
- Centralizar todas as chamadas à API da Fipe
- Tratar erros de rede
- Fornecer interface limpa para componentes

### 6.2 Estrutura
```javascript
// src/services/fipeApi.js
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
```

### 6.3 Tratamento de Erros
- Try/catch em todas as chamadas
- Logs no console para debug
- Throw de erros com mensagens amigáveis
- Componentes tratam erros e exibem ao usuário


---

## 7. Fluxo de Comunicação entre Componentes

```
┌─────────────────────────────────────────────────────┐
│                      App                            │
│                                                     │
│  State:                                             │
│  - currentView: 'search' | 'result'                 │
│  - vehicleData: Vehicle | null                      │
│                                                     │
│  Methods:                                           │
│  - handleSearchComplete(data)                       │
│  - handleNewSearch()                                │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
               │ props                │ props
               ▼                      ▼
    ┌──────────────────┐   ┌──────────────────┐
    │ VehicleSearch    │   │ VehicleResult    │
    │                  │   │                  │
    │ Props:           │   │ Props:           │
    │ - onSearchComplete│   │ - vehicleData    │
    │                  │   │ - onNewSearch    │
    │ State:           │   │                  │
    │ - brands[]       │   │ State: nenhum    │
    │ - models[]       │   │                  │
    │ - years[]        │   │                  │
    │ - selected*      │   │                  │
    │ - loading        │   │                  │
    │ - error          │   │                  │
    └────────┬─────────┘   └──────────────────┘
             │
             │ usa
             ▼
    ┌──────────────────┐
    │   fipeApi        │
    │                  │
    │ - fetchBrands()  │
    │ - fetchModels()  │
    │ - fetchYears()   │
    │ - fetchPrice()   │
    └────────┬─────────┘
             │
             │ HTTP
             ▼
    ┌──────────────────┐
    │  API da Fipe     │
    └──────────────────┘
```

---

## 8. Ciclo de Vida e Hooks

### 8.1 App Component
```javascript
// Nenhum hook de ciclo de vida necessário
// Apenas useState para gerenciar estado
```

### 8.2 VehicleSearch Component
```javascript
// useEffect para carregar marcas ao montar
useEffect(() => {
  loadBrands();
}, []); // Array vazio = executa apenas na montagem

// useState para gerenciar múltiplos estados
const [brands, setBrands] = useState([]);
const [models, setModels] = useState([]);
// ... etc
```

### 8.3 VehicleResult Component
```javascript
// Nenhum hook necessário
// Componente puramente apresentacional
```


---

## 9. Estilização (CSS)

### 9.1 Abordagem
- CSS puro (sem framework no MVP)
- Classes BEM ou convenção simples
- Responsivo (mobile-first)

### 9.2 Estrutura de Estilos

**App.css**
```css
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  color: #2c3e50;
  font-size: 2rem;
}
```

**VehicleSearch.css**
```css
.vehicle-search {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

button[type="submit"] {
  width: 100%;
  padding: 14px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

button[type="submit"]:hover:not(:disabled) {
  background: #2980b9;
}

button[type="submit"]:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  background: #e74c3c;
  color: white;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}
```

**VehicleResult.css**
```css
.vehicle-result {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.result-card {
  text-align: center;
}

.vehicle-title h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.vehicle-info {
  margin: 30px 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ecf0f1;
}

.info-row .label {
  font-weight: 600;
  color: #7f8c8d;
}

.info-row .value {
  color: #2c3e50;
}

.vehicle-price {
  background: #3498db;
  color: white;
  padding: 30px;
  border-radius: 8px;
  margin: 30px 0;
}

.price-label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.price-value {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
}

.reference-month {
  color: #7f8c8d;
  margin: 20px 0;
}

.btn-new-search {
  width: 100%;
  padding: 14px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
}

.btn-new-search:hover {
  background: #27ae60;
}
```

### 9.3 Responsividade
```css
/* Mobile */
@media (max-width: 768px) {
  .app {
    padding: 10px;
  }
  
  header h1 {
    font-size: 1.5rem;
  }
  
  .vehicle-search,
  .vehicle-result {
    padding: 20px;
  }
  
  .price-value {
    font-size: 2rem;
  }
}
```


---

## 10. Configuração do Projeto

### 10.1 Dependências (package.json)
```json
{
  "name": "tabela-fipe",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

### 10.2 Comandos
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### 10.3 Entry Point (main.jsx)
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 10.4 HTML Base (index.html)
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consulta Tabela Fipe</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 11. Testes Manuais

### 11.1 Cenários de Teste

**CT01: Fluxo Completo com Sucesso**
1. Abrir aplicação
2. Verificar se marcas carregam
3. Selecionar marca "Fiat"
4. Verificar se modelos carregam
5. Selecionar modelo "Uno"
6. Verificar se anos carregam
7. Selecionar ano "2023 Gasolina"
8. Clicar em "Consultar"
9. Verificar se resultado é exibido com preço
10. Clicar em "Nova Consulta"
11. Verificar se volta para tela de busca

**CT02: Validação de Campos**
1. Abrir aplicação
2. Verificar que modelo está desabilitado
3. Selecionar marca
4. Verificar que modelo está habilitado
5. Verificar que ano está desabilitado
6. Selecionar modelo
7. Verificar que ano está habilitado
8. Verificar que botão só habilita com todos os campos

**CT03: Tratamento de Erro**
1. Desconectar internet
2. Tentar fazer consulta
3. Verificar mensagem de erro amigável
4. Reconectar internet
5. Tentar novamente
6. Verificar sucesso


---

## 12. Performance e Otimizações

### 12.1 Otimizações Implementadas
- **Lazy loading de dados:** Modelos só carregam após selecionar marca
- **Desabilitar campos:** Previne seleções inválidas
- **Loading states:** Feedback visual durante requisições
- **Error boundaries:** Tratamento de erros em cada componente

### 12.2 Otimizações Futuras (V2)
- **Memoização:** useMemo pra listas grandes
- **Debounce:** Se adicionar busca por texto
- **Cache:** Guardar marcas no localStorage
- **Code splitting:** Lazy load de componentes

---

## 13. Acessibilidade

### 13.1 Boas Práticas Implementadas
- Labels associados a inputs (htmlFor)
- Estados disabled claros
- Mensagens de erro visíveis
- Contraste adequado de cores
- Tamanho de fonte legível (16px+)

### 13.2 Melhorias Futuras
- ARIA labels
- Navegação por teclado
- Screen reader support
- Focus management

---

## 14. Segurança

### 14.1 Considerações
- **XSS:** React escapa automaticamente valores
- **CORS:** API da Fipe tem CORS liberado
- **HTTPS:** API usa HTTPS
- **Validação:** Validação de campos no frontend

### 14.2 Não Aplicável no MVP
- Autenticação (não tem login)
- Autorização (consulta é pública)
- Rate limiting (API pública)
- Sanitização de input (só selects)

---

## 15. Deploy

### 15.1 Opções de Deploy
- **Vercel:** Deploy automático via Git (recomendado)
- **Netlify:** Alternativa simples
- **GitHub Pages:** Gratuito para projetos públicos

### 15.2 Processo de Deploy (Vercel)
```bash
# 1. Build do projeto
npm run build

# 2. Deploy via CLI
npx vercel

# Ou conectar repositório Git no painel da Vercel
```

---

## 16. Checklist de Implementação

### Componentes
- [ ] App.jsx
- [ ] VehicleSearch.jsx
- [ ] VehicleResult.jsx
- [ ] fipeApi.js

### Funcionalidades
- [ ] Carregamento de marcas
- [ ] Carregamento de modelos
- [ ] Carregamento de anos
- [ ] Consulta de preço
- [ ] Navegação entre telas
- [ ] Loading states
- [ ] Tratamento de erros
- [ ] Validação de campos

### Estilos
- [ ] App.css
- [ ] VehicleSearch.css
- [ ] VehicleResult.css
- [ ] Responsividade mobile

### Testes
- [ ] Fluxo completo
- [ ] Validação
- [ ] Erro

### Deploy
- [ ] Build funcional
- [ ] Deploy em produção
- [ ] URL acessível

---

## 17. Resumo Técnico

**Arquitetura:** SPA com React  
**Componentes:** 3 principais (App, VehicleSearch, VehicleResult)  
**Estado:** Local com useState  
**API:** Integração direta com API da Fipe  
**Estilo:** CSS puro, responsivo  
**Build:** Vite  
**Deploy:** Vercel ou Netlify

**Tempo estimado:** 2 dias
- Quarta: Setup + VehicleSearch (4-5h)
- Quinta: VehicleResult + ajustes (4-5h)

