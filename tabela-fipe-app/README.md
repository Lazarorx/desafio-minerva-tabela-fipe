# Tabela Fipe - Aplicação Web

Aplicação web para consulta de preços de veículos na Tabela Fipe.

## 🚀 Tecnologias

- React 19
- Vite
- Axios
- CSS puro

## 📋 Funcionalidades

- Consulta de preços de carros pela Tabela Fipe
- Seleção em cascata: Marca → Modelo → Ano
- Exibição de informações detalhadas do veículo
- Interface responsiva

## 🔧 Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📦 Estrutura

```
src/
├── components/
│   ├── VehicleSearch.jsx    # Formulário de busca
│   └── VehicleResult.jsx    # Exibição do resultado
├── services/
│   └── fipeApi.js           # Integração com API
├── styles/
│   ├── VehicleSearch.css
│   └── VehicleResult.css
├── App.jsx                  # Componente principal
└── main.jsx                 # Entry point
```

## 🌐 API

Utiliza a API pública da Fipe: https://parallelum.com.br/fipe/api/v1

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como parte do Desafio Minerva 2026.
