# FipeCheck - Consulta Tabela Fipe

Aplicação web moderna para consulta de preços de veículos pela Tabela Fipe oficial.

## Demo Online

**URL:** https://fipecheck.vercel.app

## Sobre o Projeto

FipeCheck é uma aplicação desenvolvida como parte do Desafio Minerva 2026. O projeto oferece uma interface intuitiva e moderna para consulta de preços de veículos utilizando a API oficial da Tabela Fipe.

## Funcionalidades

- Consulta de preços em tempo real
- Interface moderna e responsiva
- Compatível com dispositivos móveis
- Performance otimizada
- Compartilhamento de resultados
- Histórico de consultas

## Tecnologias

- **Frontend:** React 19
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Estilização:** CSS puro
- **Deploy:** Vercel
- **API:** Fipe API (parallelum.com.br)

## Estrutura do Projeto

```
├── tabela-fipe-app/          # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Serviços (API)
│   │   └── styles/           # Arquivos CSS
│   └── public/               # Arquivos estáticos
├── docs/                     # Documentação do projeto
│   ├── PLANNING_SIMPLIFICADO.md
│   ├── MODELO_DE_DADOS.md
│   ├── TD_COMPONENTES.md
│   ├── DIAGRAMAS_TECNICOS.md
│   └── ...
└── README.md                 # Este arquivo
```

## Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/Lazarorx/desafio-minerva-tabela-fipe.git

# Entre na pasta do projeto
cd desafio-minerva-tabela-fipe/tabela-fipe-app

# Instale as dependências
npm install

# Rode o projeto
npm run dev

# Acesse http://localhost:5173
```

## Build para Produção

```bash
cd tabela-fipe-app
npm run build
```

## Documentação

Toda a documentação técnica do projeto está disponível na pasta `docs/`:

- **Planning:** Planejamento e cronograma
- **Modelo de Dados:** Estrutura de dados
- **TD Componentes:** Documentação técnica dos componentes
- **Diagramas:** Diagramas de arquitetura e fluxos
- **Protótipos:** Wireframes e protótipos

## Desenvolvimento

Desenvolvido por Lazaro Rafael Xavier para o Desafio Minerva 2026.

## Licença

Este projeto foi desenvolvido para fins educacionais como parte do Desafio Minerva 2026.
