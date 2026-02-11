# FipeCheck V2 - Enhanced Version

🚗 Versão melhorada do FipeCheck com TypeScript, Tailwind CSS e visualizações avançadas.

## 🎯 Diferenças da V1

### V1 (MVP - Branch main)
- React com JavaScript
- CSS puro
- Funcionalidade básica de consulta
- Design simples e funcional

### V2 (Enhanced - Branch v2-enhanced)
- ✅ React com TypeScript
- ✅ Tailwind CSS
- ✅ Atomic Design (átomos, moléculas, organismos)
- ✅ Faixa de preço de mercado
- ✅ Gráfico de tendência de preço
- ✅ Detalhes completos do veículo
- ✅ Design inspirado no KBB
- ✅ Componentes reutilizáveis
- ✅ Type safety completo

## 🛠️ Tecnologias

- React 19
- TypeScript
- Tailwind CSS
- Chart.js + react-chartjs-2
- Axios
- Vite

## 📦 Instalação

```bash
npm install
```

## 🚀 Desenvolvimento

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📁 Estrutura

```
src/
├── components/
│   ├── atoms/          # Componentes básicos (Button, Select, Card)
│   ├── molecules/      # Componentes compostos (SearchForm, PriceCard)
│   └── organisms/      # Componentes complexos (Header, Footer)
├── pages/              # Páginas (HomePage, SearchPage, ResultPage)
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
└── utils/              # Utilitários
```

## 🎨 Design System

### Cores
- Primary: Azul (#3498db)
- Accent: Laranja (#ff9800)
- Background: Cinza claro (#f5f7fa)

### Componentes
- Atomic Design Pattern
- Tailwind utility classes
- Componentes totalmente tipados

## 📊 Features

1. **Consulta de Preço**: Busca por marca, modelo e ano
2. **Faixa de Preço**: Mostra preço mínimo, médio e máximo
3. **Gráfico de Tendência**: Evolução do preço nos últimos 12 meses
4. **Detalhes do Veículo**: Informações completas
5. **Design Responsivo**: Mobile-first

## 🔄 Comparação com V1

| Feature | V1 | V2 |
|---------|----|----|
| TypeScript | ❌ | ✅ |
| Tailwind | ❌ | ✅ |
| Atomic Design | ❌ | ✅ |
| Faixa de Preço | ❌ | ✅ |
| Gráfico | ❌ | ✅ |
| Type Safety | ❌ | ✅ |

## 📝 Notas

Esta é a versão melhorada desenvolvida após a apresentação do Desafio Minerva 2026. 
A V1 (branch main) foi mantida como referência do MVP apresentado.
