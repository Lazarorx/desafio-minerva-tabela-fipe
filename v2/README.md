# FipeCheck V2 - Sistema Avançado

Versão avançada do FipeCheck com funcionalidades completas de gerenciamento de consultas.

## Funcionalidades

### Autenticação
- Sistema de login e cadastro
- Sessão persistente (LocalStorage)
- Proteção de rotas

### Dashboard
- Estatísticas de uso
- Resumo de consultas
- Acesso rápido às funcionalidades
- Última consulta realizada

### Consulta de Veículos
- Busca por marca, modelo e ano
- Integração com API Fipe
- Salvamento automático no histórico
- Adicionar aos favoritos
- Adicionar à comparação

### Histórico
- Lista de todas as consultas realizadas
- Busca por marca ou modelo
- Remover consultas individuais
- Limpar histórico completo
- Adicionar consultas aos favoritos ou comparação

### Favoritos
- Salvar veículos favoritos
- Visualização organizada
- Adicionar à comparação
- Remover dos favoritos

### Comparação
- Comparar até 3 veículos lado a lado
- Análise de diferença de preços
- Tabela comparativa detalhada
- Cálculo de variação percentual

### Dark Mode
- Tema claro e escuro
- Alternância com um clique
- Preferência salva

## Tecnologias

- React 19
- Vite
- Axios
- Chart.js
- React Chart.js 2
- LocalStorage para persistência

## Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura

```
v2/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login e Register
│   │   ├── Dashboard/      # Dashboard principal
│   │   ├── Layout/         # Header
│   │   ├── Search/         # Consulta de veículos
│   │   ├── History/        # Histórico
│   │   ├── Compare/        # Comparação
│   │   └── Favorites/      # Favoritos
│   ├── context/
│   │   └── AuthContext.jsx # Context de autenticação
│   ├── services/
│   │   ├── authService.js  # Serviço de autenticação
│   │   ├── storageService.js # Gerenciamento LocalStorage
│   │   └── fipeApi.js      # Integração API Fipe
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## Diferenciais

- Interface moderna e responsiva
- Dark mode
- Persistência de dados com LocalStorage
- Sistema de autenticação fake (demonstração)
- Comparação inteligente de veículos
- Análise de preços
- Histórico completo
- Favoritos organizados

## Desenvolvido para

Desafio Minerva 2026 - Demonstração de habilidades avançadas em React e gerenciamento de estado.
