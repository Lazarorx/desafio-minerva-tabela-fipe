# FipeCheck V2 - Sistema Avançado de Consulta Fipe

Versão avançada do FipeCheck com funcionalidades completas de gerenciamento e análise de mercado.

## Funcionalidades Principais

### Autenticação e Perfil
- Sistema de login e registro
- Gerenciamento de perfil de usuário
- Dados persistidos localmente (LocalStorage)

### Consulta de Veículos
- Busca por marca, modelo e ano
- Integração com API Fipe oficial
- Resultados detalhados com todas as informações

### Análise de Mercado (NOVO!)
- Comparação de preços Fipe vs Mercado Real
- Integração simulada com múltiplas fontes (Webmotors, OLX, Mercado Livre, iCarros)
- Detecção automática de oportunidades (preços abaixo da Fipe)
- Gráficos comparativos interativos
- Recomendações inteligentes de compra
- Análise estatística completa (média, mínimo, máximo, variação)

### Histórico
- Registro automático de todas as consultas
- Busca e filtros
- Análise de mercado direta do histórico
- Adicionar ao favoritos ou comparação

### Favoritos
- Salvar veículos para acompanhamento
- Análise de mercado dos favoritos
- Organização e gerenciamento

### Comparação
- Compare até 3 veículos lado a lado
- Tabela comparativa detalhada
- Análise de diferenças de preço

### Dashboard
- Estatísticas de uso
- Ações rápidas
- Última consulta

## Diferenciais Técnicos

### Análise de Mercado Inteligente
O sistema simula dados realistas de mercado baseados em padrões reais:
- Cada fonte tem variações características próprias
- Algoritmo detecta oportunidades automaticamente
- Recomendações baseadas em análise estatística
- Visualização gráfica com Chart.js

### Arquitetura
- React 18 com Hooks
- Context API para gerenciamento de estado
- Serviços modulares (fipeApi, marketApi, storageService, authService)
- Componentes reutilizáveis
- Ícones SVG customizados

### UX/UI
- Interface moderna e responsiva
- Dark mode
- Animações suaves
- Feedback visual em todas as ações
- Modal interativo para análise de mercado

## Tecnologias

- React 19
- Vite
- Axios
- Chart.js + react-chartjs-2
- CSS3 com variáveis customizadas
- LocalStorage API

## Como Usar

1. Instalar dependências:
```bash
npm install
```

2. Executar em desenvolvimento:
```bash
npm run dev
```

3. Build para produção:
```bash
npm run build
```

## Estrutura do Projeto

```
v2/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login e Registro
│   │   ├── Dashboard/      # Dashboard principal
│   │   ├── Search/         # Busca de veículos
│   │   ├── History/        # Histórico de consultas
│   │   ├── Favorites/      # Favoritos
│   │   ├── Compare/        # Comparação de veículos
│   │   ├── MarketComparison/ # Análise de mercado (NOVO!)
│   │   ├── Layout/         # Header e navegação
│   │   └── Icons/          # Ícones SVG
│   ├── services/
│   │   ├── fipeApi.js      # Integração API Fipe
│   │   ├── marketApi.js    # Análise de mercado (NOVO!)
│   │   ├── authService.js  # Autenticação
│   │   └── storageService.js # Persistência local
│   ├── context/
│   │   └── AuthContext.jsx # Context de autenticação
│   └── App.jsx
└── package.json
```

## Funcionalidade Killer: Análise de Mercado

A análise de mercado é o diferencial competitivo do FipeCheck V2:

- Compara preço Fipe com 4 fontes de mercado
- Identifica automaticamente oportunidades (preços 5%+ abaixo da Fipe)
- Gera recomendações inteligentes (Excelente/Boa/Neutra/Atenção)
- Mostra economia potencial em cada fonte
- Gráfico visual para fácil comparação
- Estatísticas completas (média, spread, variação)

### Como Funciona

1. Consulte um veículo normalmente
2. Clique em "Analisar Mercado"
3. O sistema busca preços simulados de 4 fontes
4. Receba análise completa com recomendação
5. Identifique as melhores oportunidades

## Próximos Passos (Produção)

- Integrar com APIs reais de marketplaces
- Backend com Node.js + Express
- Banco de dados PostgreSQL
- Autenticação JWT
- Notificações push
- Histórico de variação de preços
- Alertas personalizados

## Desenvolvido para

Desafio Minerva 2026 - Tabela Fipe
