# Diagrama de Atores - FipeCheck

## 1. Visão Geral dos Atores

O sistema FipeCheck contempla 3 tipos de atores com diferentes níveis de acesso e funcionalidades:

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA FIPECHECK                        │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │              │    │              │    │              │ │
│  │   USUÁRIO    │    │   ANALISTA   │    │    ADMIN     │ │
│  │              │    │              │    │              │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Ator 1: Usuário

### 2.1 Descrição
Pessoa física interessada em consultar preços de veículos e analisar oportunidades de mercado para compra.

### 2.2 Características
- **Tipo:** Pessoa física
- **Autenticação:** Opcional (V1) / Obrigatória (V2)
- **Nível de Acesso:** Básico
- **Quantidade Estimada:** 10.000+ usuários

### 2.3 Casos de Uso

```
        ┌─────────────────────────────────────────┐
        │                                         │
        │              USUÁRIO                    │
        │                                         │
        └────────────────┬────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Consultar│     │Analisar│     │Gerenciar│
    │ Fipe   │     │Mercado │     │Histórico│
    └────────┘     └────────┘     └────────┘
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Favoritar│     │Comparar│     │Configurar│
    │Veículos│     │Veículos│     │ Alertas │
    └────────┘     └────────┘     └────────┘
```

### 2.4 Funcionalidades

**Implementadas (V1/V2):**
- ✅ Consultar preço pela Tabela Fipe
- ✅ Analisar mercado multi-fonte (V2)
- ✅ Visualizar histórico de consultas (V2)
- ✅ Salvar veículos favoritos (V2)
- ✅ Comparar até 3 veículos (V2)
- ✅ Autenticar-se no sistema (V2)

**Planejadas (V3):**
- ⏳ Configurar alertas de preço
- ⏳ Receber notificações
- ⏳ Exportar relatórios pessoais
- ⏳ Compartilhar análises

### 2.5 Jornada do Usuário

```
1. DESCOBERTA
   │
   ├─ Acessa site
   ├─ Vê landing page
   └─ Entende proposta
   │
   ▼
2. REGISTRO (V2)
   │
   ├─ Cria conta
   ├─ Faz login
   └─ Acessa dashboard
   │
   ▼
3. CONSULTA
   │
   ├─ Seleciona marca
   ├─ Seleciona modelo
   ├─ Seleciona ano
   └─ Vê preço Fipe
   │
   ▼
4. ANÁLISE
   │
   ├─ Clica "Analisar Mercado"
   ├─ Vê comparação 5 fontes
   ├─ Identifica oportunidades
   └─ Recebe recomendação
   │
   ▼
5. DECISÃO
   │
   ├─ Salva favorito
   ├─ Compara opções
   └─ Toma decisão de compra
```

---

## 3. Ator 2: Analista de Mercado

### 3.1 Descrição
Profissional que monitora tendências de mercado automotivo e gera relatórios para tomada de decisão estratégica.

### 3.2 Características
- **Tipo:** Profissional interno
- **Autenticação:** Obrigatória
- **Nível de Acesso:** Intermediário
- **Quantidade Estimada:** 5-10 analistas

### 3.3 Casos de Uso

```
        ┌─────────────────────────────────────────┐
        │                                         │
        │            ANALISTA                     │
        │                                         │
        └────────────────┬────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Dashboard│     │Gerar   │     │Analisar│
    │Analítico│     │Relatório│     │Tendências│
    └────────┘     └────────┘     └────────┘
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Exportar│     │Configurar│     │Visualizar│
    │  Dados │     │ Alertas │     │Estatísticas│
    └────────┘     └────────┘     └────────┘
```

### 3.4 Funcionalidades

**Planejadas (V3):**
- ⏳ Visualizar dashboard analítico
- ⏳ Gerar relatórios de tendências
- ⏳ Analisar variações por marca/modelo
- ⏳ Analisar variações por região
- ⏳ Exportar dados (CSV, Excel, PDF)
- ⏳ Configurar alertas de mercado
- ⏳ Visualizar estatísticas agregadas
- ⏳ Comparar períodos históricos

### 3.5 Dashboard do Analista (Mockup)

```
┌─────────────────────────────────────────────────────────┐
│  DASHBOARD ANALÍTICO                          [Analista]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Consultas    │  │ Usuários     │  │ Oportunidades│ │
│  │ Hoje: 1.234  │  │ Ativos: 567  │  │ Detectadas:89│ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Tendências de Preço (Últimos 6 meses)         │   │
│  │                                                 │   │
│  │  [Gráfico de linha mostrando evolução]         │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Marcas Mais Consultadas                        │   │
│  │                                                 │   │
│  │  1. Fiat       - 23%                            │   │
│  │  2. Volkswagen - 18%                            │   │
│  │  3. Chevrolet  - 15%                            │   │
│  │  4. Honda      - 12%                            │   │
│  │  5. Toyota     - 10%                            │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Gerar Relatório]  [Exportar Dados]                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Ator 3: Administrador

### 4.1 Descrição
Responsável pela gestão técnica do sistema, usuários e configurações.

### 4.2 Características
- **Tipo:** Profissional técnico interno
- **Autenticação:** Obrigatória
- **Nível de Acesso:** Total
- **Quantidade Estimada:** 2-3 admins

### 4.3 Casos de Uso

```
        ┌─────────────────────────────────────────┐
        │                                         │
        │          ADMINISTRADOR                  │
        │                                         │
        └────────────────┬────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Gerenciar│     │Configurar│     │Monitorar│
    │Usuários │     │ Sistema │     │ Sistema │
    └────────┘     └────────┘     └────────┘
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Visualizar│     │Gerenciar│     │Executar│
    │  Logs  │     │  Cache  │     │Backups │
    └────────┘     └────────┘     └────────┘
```

### 4.4 Funcionalidades

**Planejadas (V3):**
- ⏳ Gerenciar usuários (criar, editar, desativar)
- ⏳ Gerenciar permissões (roles)
- ⏳ Configurar integrações com APIs
- ⏳ Monitorar uso do sistema
- ⏳ Visualizar logs de auditoria
- ⏳ Gerenciar cache (limpar, invalidar)
- ⏳ Executar backups manuais
- ⏳ Visualizar métricas de performance
- ⏳ Configurar alertas de sistema

### 4.5 Painel do Administrador (Mockup)

```
┌─────────────────────────────────────────────────────────┐
│  PAINEL ADMINISTRATIVO                           [Admin]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Usuários     │  │ Requisições  │  │ Uptime       │ │
│  │ Total: 10.234│  │ /min: 1.234  │  │ 99.95%       │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Usuários Recentes                              │   │
│  │                                                 │   │
│  │  ID    Nome           Email          Status    │   │
│  │  001   João Silva     joao@...       Ativo     │   │
│  │  002   Maria Santos   maria@...      Ativo     │   │
│  │  003   Pedro Costa    pedro@...      Inativo   │   │
│  │                                                 │   │
│  │  [Ver Todos]  [Adicionar Usuário]              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Logs de Auditoria (Últimas 24h)                │   │
│  │                                                 │   │
│  │  12:34  USER_LOGIN    joao@email.com           │   │
│  │  12:35  CONSULTATION  Fiat Uno 2023            │   │
│  │  12:36  MARKET_ANALYSIS  Honda Civic 2020      │   │
│  │  12:37  USER_LOGOUT   joao@email.com           │   │
│  │                                                 │   │
│  │  [Ver Todos Logs]                               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Configurações]  [Backup]  [Cache]  [Integrações]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Matriz de Permissões

| Funcionalidade | Usuário | Analista | Admin |
|----------------|---------|----------|-------|
| **Consultas** |
| Consultar Fipe | ✅ | ✅ | ✅ |
| Analisar Mercado | ✅ | ✅ | ✅ |
| Histórico Pessoal | ✅ | ✅ | ✅ |
| Favoritos | ✅ | ✅ | ✅ |
| Comparação | ✅ | ✅ | ✅ |
| Alertas Pessoais | ✅ | ✅ | ✅ |
| **Análise** |
| Dashboard Analítico | ❌ | ✅ | ✅ |
| Relatórios | ❌ | ✅ | ✅ |
| Exportar Dados | ❌ | ✅ | ✅ |
| Estatísticas Agregadas | ❌ | ✅ | ✅ |
| **Administração** |
| Gerenciar Usuários | ❌ | ❌ | ✅ |
| Configurar Sistema | ❌ | ❌ | ✅ |
| Visualizar Logs | ❌ | ❌ | ✅ |
| Gerenciar Cache | ❌ | ❌ | ✅ |
| Executar Backups | ❌ | ❌ | ✅ |

---

## 6. Diagrama de Interação entre Atores

```
┌─────────────────────────────────────────────────────────┐
│                    SISTEMA FIPECHECK                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐                                       │
│  │   USUÁRIO    │                                       │
│  └──────┬───────┘                                       │
│         │                                               │
│         │ 1. Usa sistema                                │
│         │ 2. Gera dados                                 │
│         ▼                                               │
│  ┌─────────────────────────────────────────────┐       │
│  │           BASE DE DADOS                     │       │
│  │  - Consultas                                │       │
│  │  - Favoritos                                │       │
│  │  - Histórico                                │       │
│  └────────┬────────────────────┬────────────────┘       │
│           │                    │                        │
│           │ 3. Analisa         │ 4. Gerencia            │
│           ▼                    ▼                        │
│  ┌──────────────┐     ┌──────────────┐                 │
│  │   ANALISTA   │     │    ADMIN     │                 │
│  │              │     │              │                 │
│  │ - Relatórios │     │ - Usuários   │                 │
│  │ - Tendências │     │ - Sistema    │                 │
│  │ - Insights   │     │ - Logs       │                 │
│  └──────────────┘     └──────────────┘                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Fluxo de Autenticação e Autorização

```
┌─────────────┐
│   Usuário   │
│  faz login  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Sistema valida  │
│  credenciais    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Identifica role │
│ (user/analyst/  │
│     admin)      │
└──────┬──────────┘
       │
       ├─────────────┬─────────────┐
       │             │             │
       ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│   USER   │  │ ANALYST  │  │  ADMIN   │
│          │  │          │  │          │
│ Acesso   │  │ Acesso   │  │ Acesso   │
│ Básico   │  │ Análise  │  │ Total    │
└──────────┘  └──────────┘  └──────────┘
```

---

## 8. Evolução dos Atores por Versão

### V1 (Implementado)
```
┌──────────────┐
│   USUÁRIO    │
│ (Anônimo)    │
│              │
│ - Consultar  │
└──────────────┘
```

### V2 (Implementado)
```
┌──────────────┐
│   USUÁRIO    │
│ (Autenticado)│
│              │
│ - Consultar  │
│ - Analisar   │
│ - Histórico  │
│ - Favoritos  │
│ - Comparar   │
└──────────────┘
```

### V3 (Planejado)
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   USUÁRIO    │    │   ANALISTA   │    │    ADMIN     │
│              │    │              │    │              │
│ - Consultar  │    │ - Dashboard  │    │ - Usuários   │
│ - Analisar   │    │ - Relatórios │    │ - Sistema    │
│ - Histórico  │    │ - Tendências │    │ - Logs       │
│ - Favoritos  │    │ - Exportar   │    │ - Cache      │
│ - Comparar   │    │              │    │ - Backups    │
│ - Alertas    │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 9. Casos de Uso Detalhados

### 9.1 UC01 - Usuário Consulta Veículo

**Ator Principal:** Usuário  
**Pré-condição:** Nenhuma (V1) / Autenticado (V2)  
**Pós-condição:** Consulta salva no histórico (V2)

**Fluxo Principal:**
1. Usuário acessa sistema
2. Sistema exibe formulário de consulta
3. Usuário seleciona marca
4. Sistema carrega modelos
5. Usuário seleciona modelo
6. Sistema carrega anos
7. Usuário seleciona ano
8. Usuário clica "Consultar"
9. Sistema busca preço na API Fipe
10. Sistema exibe resultado
11. Sistema salva no histórico (V2)

**Fluxo Alternativo:**
- 9a. API Fipe indisponível
  - Sistema exibe mensagem de erro
  - Usuário pode tentar novamente

### 9.2 UC02 - Analista Gera Relatório

**Ator Principal:** Analista  
**Pré-condição:** Autenticado como analista  
**Pós-condição:** Relatório gerado e disponível

**Fluxo Principal:**
1. Analista acessa dashboard
2. Analista clica "Gerar Relatório"
3. Sistema exibe formulário
4. Analista seleciona período
5. Analista seleciona filtros (marca, modelo)
6. Analista clica "Gerar"
7. Sistema processa dados
8. Sistema gera PDF
9. Sistema disponibiliza download
10. Analista baixa relatório

### 9.3 UC03 - Admin Gerencia Usuário

**Ator Principal:** Administrador  
**Pré-condição:** Autenticado como admin  
**Pós-condição:** Usuário modificado

**Fluxo Principal:**
1. Admin acessa painel
2. Admin clica "Gerenciar Usuários"
3. Sistema exibe lista de usuários
4. Admin seleciona usuário
5. Admin clica "Editar"
6. Sistema exibe formulário
7. Admin modifica dados
8. Admin clica "Salvar"
9. Sistema valida dados
10. Sistema atualiza usuário
11. Sistema registra em log de auditoria

---

## 10. Resumo

### Atores Implementados
- ✅ Usuário (V1 e V2)

### Atores Planejados
- ⏳ Analista de Mercado (V3)
- ⏳ Administrador (V3)

### Total de Funcionalidades
- **Usuário:** 6 implementadas + 4 planejadas = 10 total
- **Analista:** 0 implementadas + 8 planejadas = 8 total
- **Admin:** 0 implementadas + 9 planejadas = 9 total

**Total Geral:** 27 funcionalidades (6 implementadas, 21 planejadas)

---

## 11. Conclusão

O sistema FipeCheck foi projetado com visão de múltiplos atores, mas a implementação atual (V1/V2) foca no ator principal: o Usuário. Esta abordagem permite:

1. **Validação rápida** do conceito e valor
2. **Desenvolvimento incremental** sem complexidade prematura
3. **Arquitetura preparada** para evolução
4. **Foco no problema real** do usuário final

A expansão para Analista e Admin está planejada para V3, quando houver base de usuários e dados suficientes para justificar essas funcionalidades avançadas.
