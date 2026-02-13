# FipeCheck - Consulta Tabela Fipe

Aplicação web moderna para consulta de preços de veículos pela Tabela Fipe oficial.

## Demo Online

**V1 (MVP):** https://fipecheck.vercel.app

## Sobre o Projeto

FipeCheck é uma aplicação desenvolvida como parte do Desafio Minerva 2026. O projeto oferece uma interface intuitiva e moderna para consulta de preços de veículos utilizando a API oficial da Tabela Fipe.

## Estrutura do Repositório

```
desafio-minerva-tabela-fipe/
├── v1/                       # Versão 1 - MVP (Apresentação Minerva)
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Serviços (API)
│   │   └── styles/           # Arquivos CSS
│   ├── package.json
│   └── README.md
├── v2/                       # Versão 2 - Enhanced (Em desenvolvimento)
│   ├── src/
│   ├── package.json
│   └── README.md
├── docs/                     # Documentação do projeto
│   ├── PLANNING_SIMPLIFICADO.md
│   ├── MODELO_DE_DADOS.md
│   ├── TD_COMPONENTES.md
│   ├── DIAGRAMAS_TECNICOS.md
│   └── ...
├── .gitignore
└── README.md                 # Este arquivo
```

## Versões

### V1 - MVP (Produção)
- Consulta de preços de carros pela Tabela Fipe
- Interface responsiva e moderna
- Seleção em cascata: Marca → Modelo → Ano
- Deploy automático no Vercel

### V2 - Enhanced (Em desenvolvimento)
- Todas as funcionalidades do V1
- Funcionalidades adicionais planejadas

## Tecnologias

- **Frontend:** React 19
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Estilização:** CSS puro
- **Deploy:** Vercel
- **API:** Fipe API (parallelum.com.br)

## Como Rodar Localmente

### V1 (MVP)
```bash
# Clone o repositório
git clone https://github.com/Lazarorx/desafio-minerva-tabela-fipe.git

# Entre na pasta do V1
cd desafio-minerva-tabela-fipe/v1

# Instale as dependências
npm install

# Rode o projeto
npm run dev

# Acesse http://localhost:5173
```

### V2 (Enhanced)
```bash
# Entre na pasta do V2
cd desafio-minerva-tabela-fipe/v2

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

## Build para Produção

```bash
# V1
cd v1
npm run build

# V2
cd v2
npm run build
```

## Documentação

### 📄 Documento Principal

**[RELATORIO_FINAL.md](docs/RELATORIO_FINAL.md)** - Relatório único consolidado com todos os entregáveis:
- Planejamento completo
- Arquitetura (V1, V2 e V3)
- Modelo de dados (atual + futuro)
- Visão funcional (5 atores, 9 RFs, 4 RNFs)
- Protótipos e wireframes
- Worker Queue e batch jobs
- Diferenciais competitivos
- Resultados e roadmap

**[EVOLUCAO_PROJETO.md](docs/EVOLUCAO_PROJETO.md)** - Comparação entrega inicial vs final:
- Escopo planejado vs entregue
- Decisões tomadas
- Mudanças de escopo
- Lições aprendidas
- Evolução técnica

---

### 📚 Documentação Detalhada

Toda a documentação técnica do projeto está disponível na pasta `docs/`:

#### Documentação de Sistema
- `VISAO_SISTEMA_COMPLETO.md` - Visão completa (atores, requisitos, roadmap)
- `ATORES_OPERACIONAIS.md` - Detalhamento dos 5 atores com mockups
- `DIAGRAMA_ATORES.md` - Casos de uso e matriz de permissões

#### Documentação Técnica
- `ARQUITETURA_EXPANDIDA.md` - Arquitetura V1, V2 e V3 completas
- `MODELO_DE_DADOS.md` - Estrutura LocalStorage (V2)
- `MODELO_DADOS_EXPANDIDO.md` - LocalStorage + PostgreSQL (V3)
- `TD_COMPONENTES.md` - Design técnico dos componentes React
- `DIAGRAMAS_TECNICOS.md` - Diagramas de fluxo

#### Documentação de Design
- `PROTOTIPOS_WIREFRAMES.md` - Protótipos e wireframes das telas

#### Documentação de Planejamento
- `PLANNING_SIMPLIFICADO.md` - Planejamento do MVP
- `JIRA_PLANNING.md` - Planejamento no Jira

#### Documentação de Apresentação
- `COLA_TECNICA_APRESENTACAO.md` - Cola técnica
- `RESUMO_APRESENTACAO.md` - Guia de apresentação
- `CHECKLIST_FINAL_APRESENTACAO.md` - Checklist final
- `CHECKLIST_SCREENSHOTS.md` - Checklist de screenshots

## Funcionalidades

### V1 - MVP
- Consulta de preços em tempo real
- Interface moderna e responsiva
- Compatível com dispositivos móveis
- Performance otimizada
- Animações suaves
- Feedback visual claro

### V2 - Enhanced (Planejado)
- Histórico de consultas
- Comparação de preços
- Gráficos de evolução
- Favoritos
- Compartilhamento
- Dark mode
- Suporte a motos e caminhões

## Desenvolvimento

Desenvolvido por Lazaro Rafael Xavier para o Desafio Minerva 2026.

## Licença

Este projeto foi desenvolvido para fins educacionais como parte do Desafio Minerva 2026.
