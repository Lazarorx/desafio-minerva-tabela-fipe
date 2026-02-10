# Planning Tabela Fipe - Estrutura para Jira

## Como Organizar no Jira

### Estrutura Sugerida:
- **Epic:** Tabela Fipe - MVP
- **Stories:** Funcionalidades principais
- **Tasks:** Tarefas técnicas
- **Subtasks:** Detalhamento de cada task

---

## EPIC

**Nome:** Tabela Fipe - MVP Consulta de Veículos

**Descrição:**
Sistema web de consulta de preços de veículos baseado na Tabela Fipe. MVP focado na funcionalidade de consulta do usuário final, sem autenticação ou persistência de dados.

**Objetivo:**
Permitir que usuários consultem o preço Fipe de veículos de forma simples e rápida.

**Prazo:** 10-14 de fevereiro de 2026

---

## STORIES (User Stories)

### Story 1: Consultar Preço de Veículo

**Como** usuário  
**Quero** consultar o preço de um veículo pela Tabela Fipe  
**Para** saber o valor de mercado do veículo

**Critérios de Aceitação:**
- [ ] Usuário pode selecionar marca de veículo
- [ ] Usuário pode selecionar modelo após escolher marca
- [ ] Usuário pode selecionar ano após escolher modelo
- [ ] Sistema exibe preço Fipe após seleção completa
- [ ] Sistema exibe dados do veículo (marca, modelo, ano, combustível)
- [ ] Sistema exibe mês de referência da tabela

**Prioridade:** Alta  
**Story Points:** 8  
**Sprint:** Sprint 1

---

### Story 2: Realizar Nova Consulta

**Como** usuário  
**Quero** realizar uma nova consulta após ver o resultado  
**Para** consultar outros veículos sem recarregar a página

**Critérios de Aceitação:**
- [ ] Botão "Nova Consulta" visível na tela de resultado
- [ ] Ao clicar, usuário retorna para tela de busca
- [ ] Formulário é resetado (campos vazios)

**Prioridade:** Média  
**Story Points:** 2  
**Sprint:** Sprint 1

---

## TASKS (Tarefas Técnicas)

### TERÇA-FEIRA (10/02)

#### Task 1: Documentação - Modelo de Dados
**Descrição:** Criar documentação do modelo de dados da aplicação

**Subtasks:**
- [ ] Definir estruturas de dados (Brand, Model, Year, Vehicle)
- [ ] Documentar estado da aplicação (SearchState, AppState)
- [ ] Mapear fluxo de dados
- [ ] Definir validações e tratamento de erros

**Estimativa:** 30 min  
**Status:** Done ✅

---

#### Task 2: Technical Design - Componentes
**Descrição:** Criar TD detalhado dos componentes React

**Subtasks:**
- [ ] Especificar componente App (props, state, métodos)
- [ ] Especificar componente VehicleSearch
- [ ] Especificar componente VehicleResult
- [ ] Documentar serviço fipeApi
- [ ] Definir fluxo de comunicação entre componentes

**Estimativa:** 2h  
**Status:** Done ✅

---

#### Task 3: Protótipos de Interface
**Descrição:** Criar protótipos/wireframes das telas

**Subtasks:**
- [ ] Wireframe Tela de Consulta (Desktop)
- [ ] Wireframe Tela de Consulta (Mobile)
- [ ] Wireframe Tela de Resultado (Desktop)
- [ ] Wireframe Tela de Resultado (Mobile)
- [ ] Definir especificações visuais (cores, fontes)
- [ ] Criar versão visual no Excalidraw/Figma

**Estimativa:** 2h  
**Status:** In Progress 🔄

---

#### Task 4: Organizar Entrega 1
**Descrição:** Compilar documentação para entrega

**Subtasks:**
- [ ] Criar README com índice
- [ ] Revisar todos os documentos
- [ ] Exportar protótipos visuais
- [ ] Preparar apresentação

**Estimativa:** 30 min  

**Status:** To Do

---

### QUARTA-FEIRA (11/02)

#### Task 5: Setup do Projeto
**Descrição:** Configurar ambiente de desenvolvimento

**Subtasks:**
- [ ] Criar projeto React com Vite
- [ ] Instalar dependências (axios)
- [ ] Configurar estrutura de pastas
- [ ] Criar arquivos base dos componentes
- [ ] Configurar CSS base

**Estimativa:** 1h  

**Status:** To Do

---

#### Task 6: Implementar Serviço API
**Descrição:** Criar serviço de integração com API da Fipe

**Subtasks:**
- [ ] Criar arquivo fipeApi.js
- [ ] Implementar fetchBrands()
- [ ] Implementar fetchModels()
- [ ] Implementar fetchYears()
- [ ] Implementar fetchPrice()
- [ ] Adicionar tratamento de erros

**Estimativa:** 1h  

**Status:** To Do

---

#### Task 7: Implementar VehicleSearch
**Descrição:** Desenvolver componente de busca

**Subtasks:**
- [ ] Criar estrutura do componente
- [ ] Implementar state management
- [ ] Implementar carregamento de marcas
- [ ] Implementar seleção de marca e carregamento de modelos
- [ ] Implementar seleção de modelo e carregamento de anos
- [ ] Implementar seleção de ano
- [ ] Implementar submit do formulário
- [ ] Adicionar validações
- [ ] Implementar estados de loading
- [ ] Implementar tratamento de erros
- [ ] Estilizar componente (CSS)

**Estimativa:** 3h  
**Status:** To Do

---

### QUINTA-FEIRA (12/02)

#### Task 8: Implementar VehicleResult
**Descrição:** Desenvolver componente de resultado

**Subtasks:**
- [ ] Criar estrutura do componente
- [ ] Implementar exibição de dados do veículo
- [ ] Implementar exibição de preço em destaque
- [ ] Implementar botão "Nova Consulta"
- [ ] Formatar dados (preço, mês de referência)
- [ ] Estilizar componente (CSS)

**Estimativa:** 2h  

**Status:** To Do

---

#### Task 9: Implementar App Principal
**Descrição:** Desenvolver componente raiz e navegação

**Subtasks:**
- [ ] Criar estrutura do componente App
- [ ] Implementar state management (view, vehicleData)
- [ ] Implementar navegação entre telas
- [ ] Integrar VehicleSearch
- [ ] Integrar VehicleResult
- [ ] Estilizar layout geral

**Estimativa:** 1h  

**Status:** To Do

---

#### Task 10: Refinamento de UI/UX
**Descrição:** Ajustes visuais e responsividade

**Subtasks:**
- [ ] Ajustar responsividade mobile
- [ ] Melhorar feedback visual (hover, focus)
- [ ] Ajustar espaçamentos e alinhamentos
- [ ] Testar em diferentes navegadores
- [ ] Ajustar cores e contrastes

**Estimativa:** 1.5h  

**Status:** To Do

---

#### Task 11: Ajustes de Navegação
**Descrição:** Melhorar fluxo entre telas

**Subtasks:**
- [ ] Testar transição entre telas
- [ ] Garantir reset correto do formulário
- [ ] Adicionar animações suaves (opcional)
- [ ] Testar fluxo completo

**Estimativa:** 30 min  

**Status:** To Do

---

### SEXTA-FEIRA (13/02)

#### Task 12: Testes Manuais
**Descrição:** Executar bateria de testes

**Subtasks:**
- [ ] CT01: Fluxo completo com sucesso
- [ ] CT02: Validação de campos
- [ ] CT03: Tratamento de erro de API
- [ ] CT04: Teste de responsividade mobile
- [ ] CT05: Teste em diferentes navegadores
- [ ] Documentar bugs encontrados
- [ ] Corrigir bugs críticos

**Estimativa:** 2h  

**Status:** To Do

---

#### Task 13: Documentação Final
**Descrição:** Criar documentação do projeto

**Subtasks:**
- [ ] Atualizar README.md
- [ ] Documentar como rodar o projeto
- [ ] Documentar estrutura de código
- [ ] Adicionar screenshots
- [ ] Documentar decisões técnicas

**Estimativa:** 1h  

**Status:** To Do

---

#### Task 14: Preparação da Apresentação
**Descrição:** Preparar apresentação final

**Subtasks:**
- [ ] Criar slides de apresentação
- [ ] Preparar demo ao vivo
- [ ] Testar demo em ambiente limpo
- [ ] Preparar respostas para perguntas comuns
- [ ] Praticar apresentação

**Estimativa:** 1.5h  

**Status:** To Do

---

## RESUMO DE STORY POINTS

| Story | Points |
|-------|--------|
| Consultar Preço de Veículo | 8 |
| Realizar Nova Consulta | 2 |
| **Total** | **10** |

---

## RESUMO DE TEMPO ESTIMADO

| Dia | Horas | Tasks |
|-----|-------|-------|
| Terça | 5h | Documentação + Protótipos |
| Quarta | 5h | Setup + VehicleSearch |
| Quinta | 5h | VehicleResult + Refinamentos |
| Sexta | 4.5h | Testes + Apresentação |
| **Total** | **19.5h** | **14 tasks** |

---

## COMO ADICIONAR NO JIRA

### Passo 1: Criar Epic
1. Ir em "Create" → "Epic"
2. Nome: "Tabela Fipe - MVP"
3. Copiar descrição acima

### Passo 2: Criar Stories
1. Ir em "Create" → "Story"
2. Copiar título e descrição
3. Adicionar critérios de aceitação
4. Linkar ao Epic
5. Definir Story Points

### Passo 3: Criar Tasks
1. Ir em "Create" → "Task"
2. Copiar título e descrição
3. Linkar à Story correspondente
4. Definir estimativa

### Passo 4: Criar Subtasks
1. Abrir Task
2. Clicar em "Create Subtask"
3. Adicionar cada subtask da lista

---

## LABELS SUGERIDAS

- `mvp`
- `frontend`
- `react`
- `documentation`
- `ui-ux`
- `api-integration`
- `testing`

---

## PRIORIDADES

- **Alta:** Tasks de Terça e Quarta (base do projeto)
- **Média:** Tasks de Quinta (refinamentos)
- **Baixa:** Tasks de Sexta (testes e apresentação)

---

**Documento criado em:** 10 de fevereiro de 2026
**Versão:** 1.0
**Projeto:** Tabela Fipe - Planning Jira
