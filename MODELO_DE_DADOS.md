# Modelo de Dados - Tabela Fipe

## 1. Visão Geral

O sistema trabalha com dados da API da Fipe, sem banco de dados no MVP. Os dados ficam em memória (state do React) durante a sessão do usuário.

---

## 2. Estruturas de Dados Principais

### 2.1 Brand (Marca)

Representa uma marca de veículo.

```typescript
interface Brand {
  codigo: string;      // Código da marca na API Fipe (ex: "21")
  nome: string;        // Nome da marca (ex: "Fiat")
}
```

**Exemplo:**
```json
{
  "codigo": "21",
  "nome": "Fiat"
}
```

---

### 2.2 Model (Modelo)

Representa um modelo de veículo de uma marca específica.

```typescript
interface Model {
  codigo: number;      // Código do modelo na API Fipe (ex: 4828)
  nome: string;        // Nome do modelo (ex: "Uno Mille 1.0")
}
```

**Exemplo:**
```json
{
  "codigo": 4828,
  "nome": "Uno Mille 1.0"
}
```

---

### 2.3 Year (Ano)

Representa um ano/combustível disponível para um modelo.

```typescript
interface Year {
  codigo: string;      // Código do ano na API Fipe (ex: "2023-1")
  nome: string;        // Descrição do ano (ex: "2023 Gasolina")
}
```

**Exemplo:**
```json
{
  "codigo": "2023-1",
  "nome": "2023 Gasolina"
}
```

---

### 2.4 Vehicle (Veículo Completo)

Representa o resultado final da consulta com todas as informações do veículo.

```typescript
interface Vehicle {
  Valor: string;              // Preço Fipe (ex: "R$ 45.000,00")
  Marca: string;              // Nome da marca (ex: "Fiat")
  Modelo: string;             // Nome do modelo (ex: "Uno Mille 1.0")
  AnoModelo: number;          // Ano do modelo (ex: 2023)
  Combustivel: string;        // Tipo de combustível (ex: "Gasolina")
  CodigoFipe: string;         // Código Fipe (ex: "001004-1")
  MesReferencia: string;      // Mês de referência (ex: "fevereiro de 2026")
  TipoVeiculo: number;        // Tipo (1=carro, 2=moto, 3=caminhão)
  SiglaCombustivel: string;   // Sigla do combustível (ex: "G")
}
```

**Exemplo:**
```json
{
  "Valor": "R$ 45.000,00",
  "Marca": "Fiat",
  "Modelo": "Uno Mille 1.0",
  "AnoModelo": 2023,
  "Combustivel": "Gasolina",
  "CodigoFipe": "001004-1",
  "MesReferencia": "fevereiro de 2026",
  "TipoVeiculo": 1,
  "SiglaCombustivel": "G"
}
```

---

## 3. Estado da Aplicação (Application State)

### 3.1 SearchState (Estado da Busca)

Estado gerenciado pelo componente VehicleSearch.

```typescript
interface SearchState {
  brands: Brand[];              // Lista de marcas disponíveis
  models: Model[];              // Lista de modelos da marca selecionada
  years: Year[];                // Lista de anos do modelo selecionado
  
  selectedBrand: string | null; // Código da marca selecionada
  selectedModel: number | null; // Código do modelo selecionado
  selectedYear: string | null;  // Código do ano selecionado
  
  loading: boolean;             // Indica se está carregando dados
  error: string | null;         // Mensagem de erro, se houver
}
```

**Estado Inicial:**
```javascript
{
  brands: [],
  models: [],
  years: [],
  selectedBrand: null,
  selectedModel: null,
  selectedYear: null,
  loading: false,
  error: null
}
```

---

### 3.2 AppState (Estado Global)

Estado gerenciado pelo componente App principal.

```typescript
interface AppState {
  currentView: 'search' | 'result';  // Tela atual
  vehicleData: Vehicle | null;       // Dados do veículo consultado
}
```

**Estado Inicial:**
```javascript
{
  currentView: 'search',
  vehicleData: null
}
```

---

## 4. Fluxo de Dados

### 4.1 Fluxo de Consulta

```
1. Usuário entra
   └─> AppState.currentView = 'search'
   └─> SearchState inicializado

2. Componente carrega marcas
   └─> API: GET /carros/marcas
   └─> SearchState.brands = [...]
   └─> SearchState.loading = false

3. Usuário seleciona marca
   └─> SearchState.selectedBrand = "21"
   └─> API: GET /carros/marcas/21/modelos
   └─> SearchState.models = [...]

4. Usuário seleciona modelo
   └─> SearchState.selectedModel = 4828
   └─> API: GET /carros/marcas/21/modelos/4828/anos
   └─> SearchState.years = [...]

5. Usuário seleciona ano
   └─> SearchState.selectedYear = "2023-1"

6. Usuário clica "Consultar"
   └─> API: GET /carros/marcas/21/modelos/4828/anos/2023-1
   └─> AppState.vehicleData = {...}
   └─> AppState.currentView = 'result'

7. Tela de resultado exibe dados
   └─> Renderiza AppState.vehicleData

8. Usuário clica "Nova Consulta"
   └─> AppState.currentView = 'search'
   └─> SearchState resetado
```

---

## 5. Validações de Dados

### 5.1 Validações no Frontend

```typescript
// Validação antes de habilitar dropdowns
const canSelectModel = selectedBrand !== null;
const canSelectYear = selectedModel !== null;
const canSubmit = selectedBrand && selectedModel && selectedYear;

// Validação de resposta da API
const isValidBrand = (brand: any): brand is Brand => {
  return brand && 
         typeof brand.codigo === 'string' && 
         typeof brand.nome === 'string';
};

const isValidVehicle = (vehicle: any): vehicle is Vehicle => {
  return vehicle && 
         typeof vehicle.Valor === 'string' &&
         typeof vehicle.Marca === 'string' &&
         typeof vehicle.Modelo === 'string';
};
```

---

## 6. Tratamento de Erros

### 6.1 Tipos de Erro

```typescript
type ErrorType = 
  | 'NETWORK_ERROR'      // Erro de conexão
  | 'API_ERROR'          // API retornou erro
  | 'INVALID_DATA'       // Dados inválidos
  | 'NOT_FOUND';         // Veículo não encontrado

interface ErrorState {
  type: ErrorType;
  message: string;
  details?: any;
}
```

### 6.2 Mensagens de Erro

```typescript
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  API_ERROR: 'Erro ao consultar a API da Fipe. Tente novamente.',
  INVALID_DATA: 'Dados inválidos recebidos da API.',
  NOT_FOUND: 'Veículo não encontrado na base da Fipe.'
};
```

---

## 7. Transformações de Dados

### 7.1 Formatação de Preço

```typescript
// API retorna: "R$ 45.000,00"
// Exibir como está (já formatado)

const formatPrice = (price: string): string => {
  return price; // API já retorna formatado
};
```

### 7.2 Formatação de Mês de Referência

```typescript
// API retorna: "fevereiro de 2026"
// Capitalizar primeira letra

const formatReferenceMonth = (month: string): string => {
  return month.charAt(0).toUpperCase() + month.slice(1);
  // Resultado: "Fevereiro de 2026"
};
```

---

## 8. Persistência (Futuro)

### 8.1 Estrutura para Banco de Dados (V2)

Caso seja necessário adicionar persistência no futuro:

```sql
-- Tabela de consultas (log)
CREATE TABLE consultation_logs (
  id UUID PRIMARY KEY,
  brand VARCHAR(100),
  model VARCHAR(200),
  year VARCHAR(50),
  price VARCHAR(50),
  fipe_code VARCHAR(20),
  consulted_at TIMESTAMP DEFAULT NOW(),
  user_ip VARCHAR(45),
  session_id VARCHAR(100)
);

-- Índices para performance
CREATE INDEX idx_consulted_at ON consultation_logs(consulted_at);
CREATE INDEX idx_brand ON consultation_logs(brand);
```

---

## 9. Diagrama de Relacionamento

```
┌─────────────┐
│   AppState  │
│             │
│ - view      │
│ - vehicle   │
└──────┬──────┘
       │
       │ gerencia
       │
       ▼
┌─────────────────┐
│  SearchState    │
│                 │
│ - brands[]      │◄─── API: /marcas
│ - models[]      │◄─── API: /modelos
│ - years[]       │◄─── API: /anos
│ - selected*     │
└─────────────────┘
       │
       │ consulta
       │
       ▼
┌─────────────────┐
│   Vehicle       │◄─── API: /anos/{id}
│                 │
│ - Valor         │
│ - Marca         │
│ - Modelo        │
│ - ...           │
└─────────────────┘
```

---

## 10. Considerações Técnicas

### 10.1 Performance
- **Cache de marcas:** Marcas mudam pouco, podem ser cacheadas
- **Debounce:** Não precisa (seleção por dropdown, não digitação)
- **Lazy loading:** Não necessário no MVP (listas pequenas)

### 10.2 Segurança
- **Sanitização:** Dados vêm da API oficial, não tem input livre de usuário
- **CORS:** API da Fipe tem CORS liberado
- **Rate limiting:** Não implementado no MVP (API pública sem limite)

### 10.3 Escalabilidade
- **Estado local:** Suficiente pro MVP
- **Context API:** Posso adicionar se o app crescer
- **Redux:** Não precisa por enquanto

---

## 11. Resumo

**Dados Principais:**
- Brand, Model, Year, Vehicle

**Estado da Aplicação:**
- SearchState (gerencia busca)
- AppState (gerencia navegação)

**Fonte de Dados:**
- API da Fipe (sem banco no MVP)

**Persistência:**
- Só em memória (state do React)
- Dados são perdidos ao recarregar

**Pra frente:**
- Adicionar banco pra logs
- Cache no backend
- Histórico de consultas

---

## 12. Checklist de Validação

- [x] Estruturas de dados definidas
- [x] Interfaces TypeScript documentadas
- [x] Fluxo de dados mapeado
- [x] Validações especificadas
- [x] Tratamento de erros definido
- [x] Transformações documentadas
- [x] Diagrama de relacionamento criado
- [x] Considerações técnicas incluídas

---

**Documento criado em:** 10 de fevereiro de 2026  
**Versão:** 1.0  
**Projeto:** Tabela Fipe - Modelo de Dados
