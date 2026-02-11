# Diagramas Técnicos - Tabela Fipe

## 1. Fluxograma do Usuário

```mermaid
flowchart TD
    Start([Usuário acessa aplicação]) --> LoadBrands[Sistema carrega marcas]
    LoadBrands --> SelectBrand{Usuário seleciona marca?}
    SelectBrand -->|Não| SelectBrand
    SelectBrand -->|Sim| LoadModels[Sistema carrega modelos]
    LoadModels --> SelectModel{Usuário seleciona modelo?}
    SelectModel -->|Não| SelectModel
    SelectModel -->|Sim| LoadYears[Sistema carrega anos]
    LoadYears --> SelectYear{Usuário seleciona ano?}
    SelectYear -->|Não| SelectYear
    SelectYear -->|Sim| ClickConsult[Usuário clica Consultar]
    ClickConsult --> FetchPrice[Sistema busca preço na API]
    FetchPrice --> ShowResult[Exibe resultado com preço]
    ShowResult --> NewSearch{Nova consulta?}
    NewSearch -->|Sim| ResetForm[Reseta formulário]
    ResetForm --> LoadBrands
    NewSearch -->|Não| End([Fim])
    
    style Start fill:#3498db,color:#fff
    style End fill:#2ecc71,color:#fff
    style ShowResult fill:#2ecc71,color:#fff
    style FetchPrice fill:#f39c12,color:#fff
```

---

## 2. Arquitetura de Componentes

```mermaid
graph TB
    App[App Component]
    VehicleSearch[VehicleSearch Component]
    VehicleResult[VehicleResult Component]
    FipeAPI[fipeApi Service]
    API[API da Fipe]
    
    App --> VehicleSearch
    App --> VehicleResult
    VehicleSearch --> FipeAPI
    FipeAPI --> API
    
    style App fill:#3498db,color:#fff
    style VehicleSearch fill:#2ecc71,color:#fff
    style VehicleResult fill:#2ecc71,color:#fff
    style FipeAPI fill:#f39c12,color:#fff
    style API fill:#e74c3c,color:#fff
```

---

## 3. Diagrama de Sequência - Consulta de Veículo

```mermaid
sequenceDiagram
    actor User as Usuário
    participant VS as VehicleSearch
    participant API as fipeApi
    participant Fipe as API Fipe
    participant App as App
    participant VR as VehicleResult

    User->>VS: Acessa aplicação
    VS->>API: fetchBrands()
    API->>Fipe: GET /carros/marcas
    Fipe-->>API: Lista de marcas
    API-->>VS: brands[]
    VS-->>User: Exibe dropdown marcas

    User->>VS: Seleciona "Fiat"
    VS->>API: fetchModels("21")
    API->>Fipe: GET /carros/marcas/21/modelos
    Fipe-->>API: Lista de modelos
    API-->>VS: models[]
    VS-->>User: Exibe dropdown modelos

    User->>VS: Seleciona "Uno"
    VS->>API: fetchYears("21", "4828")
    API->>Fipe: GET /carros/marcas/21/modelos/4828/anos
    Fipe-->>API: Lista de anos
    API-->>VS: years[]
    VS-->>User: Exibe dropdown anos

    User->>VS: Seleciona "2023 Gasolina"
    User->>VS: Clica "Consultar"
    VS->>API: fetchPrice("21", "4828", "2023-1")
    API->>Fipe: GET /carros/marcas/21/modelos/4828/anos/2023-1
    Fipe-->>API: Dados do veículo + preço
    API-->>VS: vehicleData
    VS->>App: onSearchComplete(vehicleData)
    App->>App: setCurrentView('result')
    App->>VR: Renderiza com vehicleData
    VR-->>User: Exibe resultado

    User->>VR: Clica "Nova Consulta"
    VR->>App: onNewSearch()
    App->>App: setCurrentView('search')
    App->>VS: Renderiza resetado
    VS-->>User: Formulário limpo
```

---

## 4. Fluxo de Dados

```mermaid
graph LR
    API_Brands[API: /carros/marcas]
    API_Models[API: /modelos]
    API_Years[API: /anos]
    API_Price[API: /preco]
    
    fetchBrands[fetchBrands]
    fetchModels[fetchModels]
    fetchYears[fetchYears]
    fetchPrice[fetchPrice]
    
    State[VehicleSearch State]
    App_State[App State]
    VehicleResult[VehicleResult]
    
    API_Brands --> fetchBrands
    API_Models --> fetchModels
    API_Years --> fetchYears
    API_Price --> fetchPrice
    
    fetchBrands --> State
    fetchModels --> State
    fetchYears --> State
    fetchPrice --> App_State
    
    App_State --> VehicleResult
    
    style API_Brands fill:#e74c3c,color:#fff
    style API_Models fill:#e74c3c,color:#fff
    style API_Years fill:#e74c3c,color:#fff
    style API_Price fill:#e74c3c,color:#fff
    style fetchBrands fill:#f39c12,color:#fff
    style fetchModels fill:#f39c12,color:#fff
    style fetchYears fill:#f39c12,color:#fff
    style fetchPrice fill:#f39c12,color:#fff
    style State fill:#2ecc71,color:#fff
    style App_State fill:#3498db,color:#fff
```

---

## 5. Diagrama de Estados da Aplicação

```mermaid
stateDiagram-v2
    [*] --> SearchView
    
    SearchView --> LoadingBrands
    LoadingBrands --> SearchView
    
    SearchView --> LoadingModels
    LoadingModels --> SearchView
    
    SearchView --> LoadingYears
    LoadingYears --> SearchView
    
    SearchView --> LoadingPrice
    LoadingPrice --> ResultView
    LoadingPrice --> ErrorState
    
    ErrorState --> SearchView
    ResultView --> SearchView
    
    SearchView --> [*]
    ResultView --> [*]
```

---

## 6. Estrutura de Pastas do Projeto

```mermaid
graph TD
    Root[tabela-fipe/]
    Root --> Public[public/]
    Root --> Src[src/]
    Root --> Package[package.json]
    Root --> Vite[vite.config.js]
    Root --> Index[index.html]
    
    Src --> Components[components/]
    Src --> Services[services/]
    Src --> Styles[styles/]
    Src --> Main[main.jsx]
    
    Components --> App[App.jsx]
    Components --> VehicleSearch[VehicleSearch.jsx]
    Components --> VehicleResult[VehicleResult.jsx]
    
    Services --> FipeApi[fipeApi.js]
    
    Styles --> AppCSS[App.css]
    Styles --> SearchCSS[VehicleSearch.css]
    Styles --> ResultCSS[VehicleResult.css]
    
    style Root fill:#3498db,color:#fff
    style Src fill:#2ecc71,color:#fff
    style Components fill:#f39c12,color:#fff
    style Services fill:#f39c12,color:#fff
    style Styles fill:#f39c12,color:#fff
```

---

## 7. Ciclo de Vida dos Componentes

```mermaid
sequenceDiagram
    participant React
    participant App
    participant VehicleSearch
    participant API

    React->>App: Mount
    App->>App: useState(currentView='search')
    App->>VehicleSearch: Render

    VehicleSearch->>VehicleSearch: Mount
    VehicleSearch->>VehicleSearch: useEffect([])
    VehicleSearch->>API: fetchBrands()
    API-->>VehicleSearch: brands[]
    VehicleSearch->>VehicleSearch: setState(brands)
    VehicleSearch->>React: Re-render

    Note over VehicleSearch: Usuário interage...

    VehicleSearch->>App: onSearchComplete(data)
    App->>App: setState(vehicleData, view='result')
    App->>VehicleSearch: Unmount
    App->>VehicleResult: Mount & Render

    Note over VehicleResult: Usuário clica Nova Consulta

    VehicleResult->>App: onNewSearch()
    App->>App: setState(view='search', vehicleData=null)
    App->>VehicleResult: Unmount
    App->>VehicleSearch: Mount (novo ciclo)
```

---

## 8. Tratamento de Erros

```mermaid
flowchart TD
    Start[Requisição à API] --> Try{Try/Catch}
    Try -->|Sucesso| Return[Retorna dados]
    Try -->|Erro| CheckError{Tipo de erro?}
    
    CheckError -->|Network Error| NetworkError[Erro de conexão]
    CheckError -->|404| NotFound[Não encontrado]
    CheckError -->|500| ServerError[Erro no servidor]
    CheckError -->|Timeout| TimeoutError[Timeout]
    
    NetworkError --> SetError[setState error]
    NotFound --> SetError
    ServerError --> SetError
    TimeoutError --> SetError
    
    SetError --> ShowMessage[Exibe mensagem ao usuário]
    ShowMessage --> AllowRetry[Permite tentar novamente]
    
    Return --> Success[Atualiza UI]
    
    style Start fill:#3498db,color:#fff
    style Return fill:#2ecc71,color:#fff
    style Success fill:#2ecc71,color:#fff
    style NetworkError fill:#e74c3c,color:#fff
    style NotFound fill:#e74c3c,color:#fff
    style ServerError fill:#e74c3c,color:#fff
    style TimeoutError fill:#e74c3c,color:#fff
    style ShowMessage fill:#f39c12,color:#fff
```

---

## 9. Modelo de Dados (Entidades)

```mermaid
classDiagram
    class Brand {
        +string codigo
        +string nome
    }
    
    class Model {
        +number codigo
        +string nome
    }
    
    class Year {
        +string codigo
        +string nome
    }
    
    class Vehicle {
        +string Valor
        +string Marca
        +string Modelo
        +number AnoModelo
        +string Combustivel
        +string CodigoFipe
        +string MesReferencia
        +number TipoVeiculo
        +string SiglaCombustivel
    }
    
    class SearchState {
        +Brand[] brands
        +Model[] models
        +Year[] years
        +string selectedBrand
        +number selectedModel
        +string selectedYear
        +boolean loading
        +string error
    }
    
    class AppState {
        +string currentView
        +Vehicle vehicleData
    }
    
    SearchState --> Brand
    SearchState --> Model
    SearchState --> Year
    AppState --> Vehicle
```

---

## 10. Cronograma de Implementação

```mermaid
gantt
    title Cronograma de Desenvolvimento - Tabela Fipe
    dateFormat  YYYY-MM-DD
    section Terça
    Modelo de Dados           :done, doc1, 2026-02-10, 30m
    TD Componentes            :done, doc2, 2026-02-10, 2h
    Protótipos                :done, doc3, 2026-02-10, 1h
    Organizar Entrega 1       :active, doc4, 2026-02-10, 30m
    
    section Quarta
    Setup Projeto             :setup, 2026-02-11, 1h
    Serviço API               :api, 2026-02-11, 1h
    VehicleSearch Component   :search, 2026-02-11, 3h
    
    section Quinta
    VehicleResult Component   :result, 2026-02-12, 2h
    App Component             :app, 2026-02-12, 1h
    Refinamento UI/UX         :ui, 2026-02-12, 1.5h
    Ajustes Navegação         :nav, 2026-02-12, 30m
    
    section Sexta
    Testes Manuais            :test, 2026-02-13, 2h
    Documentação Final        :doc5, 2026-02-13, 1h
    Preparação Apresentação   :present, 2026-02-13, 1.5h
```

---

## Como Visualizar os Diagramas

### Opção 1: GitHub/GitLab
- Faça commit deste arquivo
- GitHub e GitLab renderizam Mermaid automaticamente

### Opção 2: Mermaid Live Editor
1. Acesse: https://mermaid.live
2. Cole o código de cada diagrama
3. Exporte como PNG ou SVG

### Opção 3: VS Code
1. Instale extensão "Markdown Preview Mermaid Support"
2. Abra este arquivo
3. Ctrl+Shift+V para preview

### Opção 4: Notion/Confluence
- Ambos suportam blocos Mermaid
- Cole o código em um bloco de código com linguagem "mermaid"

---

## Resumo dos Diagramas

1. ✅ **Fluxograma do Usuário** - Jornada completa
2. ✅ **Arquitetura de Componentes** - Estrutura React
3. ✅ **Diagrama de Sequência** - Interações detalhadas
4. ✅ **Fluxo de Dados** - Como dados fluem
5. ✅ **Diagrama de Estados** - Estados da aplicação
6. ✅ **Estrutura de Pastas** - Organização do código
7. ✅ **Ciclo de Vida** - Lifecycle dos componentes
8. ✅ **Tratamento de Erros** - Como erros são tratados
9. ✅ **Modelo de Dados** - Classes e entidades
10. ✅ **Cronograma** - Timeline de implementação


