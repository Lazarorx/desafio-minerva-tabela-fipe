# Tabela Fipe - MVP Consulta de Veículos

## 📋 Entrega 1 - Planning e Documentação Técnica

**Data:** 10 de fevereiro de 2026  
**Projeto:** Sistema de Consulta Tabela Fipe  
**Escopo:** MVP - Funcionalidade de Consulta do Usuário

---

## 🎯 Visão Geral do Projeto

Sistema web de consulta de preços de veículos baseado na Tabela Fipe. O MVP foca na funcionalidade essencial: permitir que usuários consultem o preço de veículos de forma simples e direta, sem necessidade de login ou cadastro.

### Decisão Estratégica

Dado o prazo de **2 dias de codificação** (quarta e quinta-feira) e trabalho **individual**, optou-se por focar no core da aplicação: a consulta do usuário. Funcionalidades como autenticação, logs persistentes e múltiplos tipos de veículos ficam para versões futuras.

---

## 📁 Estrutura da Documentação

### 1. [Planning Simplificado](PLANNING_SIMPLIFICADO.md)
Documento principal com o planejamento do MVP.

**Conteúdo:**
- Escopo do MVP (o que será e não será implementado)
- Fluxo do usuário
- Casos de uso
- Banco de dados (decisão de não usar no MVP)
- Arquitetura simplificada
- Componentes React
- Integração com API da Fipe
- Stack tecnológica
- Cronograma de implementação
- Casos de teste
- Riscos e mitigações

**Tempo de leitura:** 10 minutos

---

### 2. [Modelo de Dados](MODELO_DE_DADOS.md)
Especificação completa das estruturas de dados.

**Conteúdo:**
- Estruturas principais (Brand, Model, Year, Vehicle)
- Estado da aplicação (SearchState, AppState)
- Fluxo de dados detalhado
- Validações de dados
- Tratamento de erros
- Transformações de dados
- Diagrama de relacionamento
- Considerações técnicas (performance, segurança, escalabilidade)

**Tempo de leitura:** 15 minutos

---

### 3. [Technical Design - Componentes](TD_COMPONENTES.md)
Especificação técnica detalhada dos componentes React.

**Conteúdo:**

#### Componentes:
- **App** - Componente raiz (props, state, métodos, renderização)
- **VehicleSearch** - Formulário de busca (props, state, métodos, validações)
- **VehicleResult** - Exibição de resultado (props, renderização)

#### Serviços:
- **fipeApi** - Integração com API da Fipe

#### Outros:
- Fluxo de comunicação entre componentes
- Ciclo de vida e hooks
- Estilização (CSS completo)
- Configuração do projeto (Vite + React)
- Testes manuais
- Checklist de implementação

**Tempo de leitura:** 20 minutos

---

### 4. [Protótipos e Wireframes](PROTOTIPOS_WIREFRAMES.md)
Wireframes das telas e especificações visuais.

**Conteúdo:**
- Wireframes ASCII das 2 telas (desktop + mobile)
  - Tela de Consulta
  - Tela de Resultado
- Estados da tela (inicial, preenchido, loading, erro)
- Especificações visuais (cores, tipografia, espaçamentos)
- Componentes de UI detalhados
- Fluxo de navegação
- Interações e animações
- Responsividade
- Acessibilidade
- Mockups com dados reais

**Tempo de leitura:** 15 minutos

---

### 5. [Diagramas Técnicos](DIAGRAMAS_TECNICOS.md)
Diagramas em Mermaid para visualização técnica.

**Conteúdo:**
1. Fluxograma do usuário
2. Arquitetura de componentes
3. Diagrama de sequência (consulta de veículo)
4. Fluxo de dados
5. Diagrama de estados da aplicação
6. Estrutura de pastas do projeto
7. Ciclo de vida dos componentes
8. Tratamento de erros
9. Modelo de dados (classes)
10. Cronograma de implementação (Gantt)

**Como visualizar:** GitHub, Mermaid Live Editor, VS Code com extensão

**Tempo de leitura:** 10 minutos

---

### 6. [Planning para Jira](JIRA_PLANNING.md)
Estrutura completa para adicionar no Jira.

**Conteúdo:**
- 1 Epic: Tabela Fipe - MVP
- 2 Stories com critérios de aceitação
- 14 Tasks distribuídas por dia (terça a sexta)
- Subtasks detalhadas
- Estimativas de tempo
- Story points
- Prioridades
- Labels sugeridas

**Tempo de leitura:** 15 minutos

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18+** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP
- **CSS puro** - Estilização (sem framework)

### API Externa
- **API da Fipe** - https://parallelum.com.br/fipe/api/v1
- Pública e gratuita
- Sem necessidade de autenticação

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **VS Code** - Editor
- **Chrome DevTools** - Debug

---

## 📊 Resumo Executivo

### Escopo MVP

#### ✅ O que será implementado:
- Interface web de consulta
- Seleção de marca, modelo e ano (dropdowns em cascata)
- Integração com API da Fipe
- Exibição de resultado com preço
- Navegação entre telas (busca ↔ resultado)
- Tratamento de erros
- Responsividade mobile

#### ❌ O que fica para V2:
- Sistema de login/autenticação
- Logs de consulta no banco de dados
- Múltiplos tipos de veículos (motos, caminhões)
- Funcionalidades de admin
- Backend com cache
- Histórico de consultas

### Justificativa

Com apenas **2 dias pra codar** e trabalhando **sozinho**, preciso priorizar bem. O MVP foca no que realmente importa: deixar o usuário consultar preços. O resto pode vir depois, de forma incremental.

---

## 📅 Cronograma

### Terça-feira (10/02) - Documentação
- ✅ Modelo de Dados (30 min)
- ✅ TD dos Componentes (2h)
- ✅ Protótipos e Wireframes (1h)
- ✅ Organizar Entrega 1 (30 min)
- **Entrega 1 às 17h**

### Quarta-feira (11/02) - Desenvolvimento Dia 1
- Setup do projeto (1h)
- Serviço fipeApi (1h)
- Componente VehicleSearch (3h)

### Quinta-feira (12/02) - Desenvolvimento Dia 2
- Componente VehicleResult (2h)
- Componente App (1h)
- Refinamento UI/UX (1.5h)
- Ajustes de navegação (30min)

### Sexta-feira (13/02) - Testes e Apresentação
- Testes manuais (2h)
- Documentação final (1h)
- Preparação da apresentação (1.5h)
- **Apresentação Final**

---

## 🎨 Design System

### Cores
```
Primária (Azul):     #3498db
Secundária (Verde):  #2ecc71
Erro (Vermelho):     #e74c3c
Texto Principal:     #2c3e50
Texto Secundário:    #7f8c8d
Fundo:               #ecf0f1
Branco:              #ffffff
```

### Tipografia
- Fonte: System fonts (Arial, Helvetica, sans-serif)
- Título: 32px, Bold
- Subtítulo: 24px, Bold
- Corpo: 16px, Regular
- Preço: 40px, Bold

---

## 🧪 Estratégia de Testes

### Testes Manuais
- **CT01:** Fluxo completo com sucesso
- **CT02:** Validação de campos (cascata de dropdowns)
- **CT03:** Tratamento de erro de API
- **CT04:** Responsividade mobile
- **CT05:** Compatibilidade entre navegadores

### Critérios de Sucesso
- ✅ Usuário consegue consultar preço
- ✅ Interface funcional e responsiva
- ✅ Código organizado e modular
- ✅ Sem erros críticos no console

---

## 📈 Métricas de Sucesso

### Técnicas
- Tempo de resposta < 2s por consulta
- 0 erros críticos no console
- Compatibilidade: Chrome, Firefox, Safari, Edge
- Responsivo: 375px (mobile) a 1920px (desktop)

### Funcionais
- 100% dos casos de teste passando
- Fluxo completo funcional
- Tratamento de erros implementado

---

## 🔮 Roadmap Futuro (V2)

### Fase 2 - Expansão
- Adicionar motos e caminhões
- Sistema de logs no banco
- Backend com cache (Redis)

### Fase 3 - Personalização
- Sistema de login
- Histórico de consultas do usuário
- Favoritos

### Fase 4 - Analytics
- Dashboard de tendências de preços
- Comparação de preços
- Alertas de variação

---


## 📝 Notas Finais

Esta documentação é a **Entrega 1** do projeto Tabela Fipe, seguindo o cronograma do Desafio Minerva 2026. Tentei deixar tudo:

- **Claro:** Fácil de entender
- **Completo:** Com todas as informações necessárias
- **Prático:** Pronto pra implementar
- **Realista:** Dá pra fazer no prazo

Vou seguir essa documentação na implementação, fazendo ajustes quando necessário.

---

**Status:** ✅ Entrega 1 Completa  
**Próximo passo:** Implementação (Quarta-feira, 11/02)
