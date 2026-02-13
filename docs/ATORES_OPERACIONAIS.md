# Atores Operacionais - FipeCheck

## Visão Geral

O sistema FipeCheck possui **5 atores** com responsabilidades distintas:

```
┌─────────────────────────────────────────────────────────────────┐
│                      SISTEMA FIPECHECK                          │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────┐│
│  │ USUÁRIO  │  │PESQUISADOR│  │COORDENADOR│  │ ANALISTA │  │ADMIN││
│  │          │  │           │  │           │  │          │  │    ││
│  │ Consulta │  │  Captura  │  │ Cadastra  │  │ Analisa  │  │Gerencia││
│  │          │  │  Preços   │  │  Dados    │  │Relatórios│  │Sistema││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Usuário (Consumidor Final)

### Descrição
Pessoa física interessada em consultar preços de veículos e analisar oportunidades de mercado.

### Responsabilidades
- Consultar preços pela Tabela Fipe
- Analisar mercado multi-fonte
- Gerenciar histórico pessoal
- Salvar favoritos
- Comparar veículos

### Nível de Acesso
- Básico (somente leitura de dados públicos)
- Gerencia apenas seus próprios dados

### Status
✅ **Implementado** (V1 e V2)

---

## 2. Pesquisador de Mercado (Operacional)

### Descrição
Profissional responsável por capturar preços de veículos em marketplaces e lojas físicas.

### Responsabilidades Operacionais

#### 2.1 Captura de Preços
- Acessar marketplaces (Webmotors, OLX, Mercado Livre, iCarros, Kavak)
- Buscar veículos específicos
- Registrar preços encontrados
- Incluir URL da fonte
- Adicionar observações (estado do veículo, km, etc)

#### 2.2 Validação de Dados
- Verificar se preço está dentro da faixa esperada
- Confirmar correspondência marca/modelo/ano
- Validar informações do anúncio

#### 2.3 Atualização Periódica
- Atualizar preços de veículos monitorados
- Marcar anúncios expirados
- Reportar anomalias

### Casos de Uso

```
┌─────────────────────────────────────────┐
│         PESQUISADOR                     │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│Capturar│  │Validar │  │Atualizar│
│ Preços │  │ Dados  │  │ Preços  │
└────────┘  └────────┘  └────────┘
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│Registrar│  │Reportar│  │Marcar  │
│  Fonte │  │Anomalias│  │Expirados│
└────────┘  └────────┘  └────────┘
```

### Fluxo de Trabalho

```
1. RECEBE TAREFA
   │
   ├─ Sistema atribui veículos para monitorar
   ├─ Pesquisador vê lista de tarefas
   └─ Prioridade: alertas ativos > favoritos > geral
   │
   ▼
2. BUSCA NO MARKETPLACE
   │
   ├─ Acessa Webmotors/OLX/etc
   ├─ Busca: "Honda Civic 2020"
   └─ Filtra resultados
   │
   ▼
3. CAPTURA DADOS
   │
   ├─ Preço: R$ 85.000
   ├─ URL: https://...
   ├─ KM: 45.000
   ├─ Estado: Usado
   └─ Observações: "Único dono"
   │
   ▼
4. REGISTRA NO SISTEMA
   │
   ├─ Preenche formulário
   ├─ Sistema valida dados
   └─ Confirma registro
   │
   ▼
5. PRÓXIMA TAREFA
```

### Tela do Pesquisador (Mockup)

```
┌─────────────────────────────────────────────────────────┐
│  PAINEL DO PESQUISADOR                    [Pesquisador] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Tarefas      │  │ Capturados   │  │ Pendentes    │ │
│  │ Hoje: 25     │  │ Hoje: 18     │  │ Restam: 7    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Próximas Tarefas                               │   │
│  │                                                 │   │
│  │  [!] Honda Civic 2020 - Alerta ativo           │   │
│  │      Última captura: 2 dias atrás               │   │
│  │      [Capturar Agora]                           │   │
│  │                                                 │   │
│  │  [ ] Fiat Uno 2023 - Favorito                  │   │
│  │      Última captura: 5 dias atrás               │   │
│  │      [Capturar]                                 │   │
│  │                                                 │   │
│  │  [ ] Toyota Corolla 2021                       │   │
│  │      Última captura: 7 dias atrás               │   │
│  │      [Capturar]                                 │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Histórico]  [Relatório Diário]                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Formulário de Captura

```
┌─────────────────────────────────────────────────────────┐
│  CAPTURAR PREÇO DE MERCADO                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Veículo: Honda Civic 2020 Gasolina                    │
│  Código Fipe: 001234-5                                 │
│  Preço Fipe: R$ 90.000,00                              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Fonte:                                          │   │
│  │ [ ] Webmotors  [ ] OLX  [x] Mercado Livre      │   │
│  │ [ ] iCarros    [ ] Kavak                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Preço Encontrado: R$ [85.000,00]                      │
│                                                         │
│  URL do Anúncio:                                        │
│  [https://mercadolivre.com.br/...]                     │
│                                                         │
│  Quilometragem: [45.000] km                             │
│                                                         │
│  Estado:                                                │
│  ( ) Novo  (x) Usado  ( ) Seminovo                     │
│                                                         │
│  Observações:                                           │
│  [Único dono, revisões em dia, IPVA pago]              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Validação Automática:                           │   │
│  │ ✓ Preço dentro da faixa (-15% a +10%)          │   │
│  │ ✓ URL válida                                    │   │
│  │ ✓ Marca/modelo correspondem                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Cancelar]  [Salvar e Próximo]  [Salvar e Finalizar] │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Nível de Acesso
- Intermediário (leitura + escrita em market_prices)
- Não pode alterar dados mestres (marcas, modelos)
- Não pode gerenciar usuários

### Status
⏳ **Planejado** (V3)

---

## 3. Coordenador de Dados (Operacional)

### Descrição
Profissional responsável por cadastrar e manter dados mestres do sistema (marcas, modelos, versões).

### Responsabilidades Operacionais

#### 3.1 Cadastro de Marcas
- Adicionar novas marcas de veículos
- Atualizar informações de marcas existentes
- Desativar marcas descontinuadas
- Sincronizar com API Fipe

#### 3.2 Cadastro de Modelos
- Adicionar novos modelos por marca
- Atualizar especificações técnicas
- Cadastrar versões (motor, transmissão, etc)
- Manter histórico de alterações

#### 3.3 Gestão de Categorias
- Criar categorias de veículos (SUV, Sedan, Hatch, etc)
- Associar modelos a categorias
- Definir tags e filtros

#### 3.4 Validação de Dados
- Revisar dados cadastrados por pesquisadores
- Aprovar/rejeitar novos registros
- Corrigir inconsistências
- Manter qualidade dos dados

### Casos de Uso

```
┌─────────────────────────────────────────┐
│         COORDENADOR                     │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│Cadastrar│  │Atualizar│  │Validar │
│ Marcas │  │ Modelos │  │ Dados  │
└────────┘  └────────┘  └────────┘
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│Gerenciar│  │Sincronizar│  │Aprovar│
│Categorias│  │com Fipe│  │Registros│
└────────┘  └────────┘  └────────┘
```

### Fluxo de Trabalho

```
1. RECEBE SOLICITAÇÃO
   │
   ├─ Novo modelo lançado no mercado
   ├─ Pesquisador reporta modelo não cadastrado
   └─ Sincronização automática detecta novidade
   │
   ▼
2. PESQUISA INFORMAÇÕES
   │
   ├─ Consulta API Fipe
   ├─ Verifica site do fabricante
   └─ Valida especificações técnicas
   │
   ▼
3. CADASTRA NO SISTEMA
   │
   ├─ Preenche formulário completo
   ├─ Adiciona especificações
   ├─ Define categoria
   └─ Associa à marca
   │
   ▼
4. VALIDA E PUBLICA
   │
   ├─ Revisa dados cadastrados
   ├─ Testa consulta
   └─ Publica para uso
   │
   ▼
5. MONITORA QUALIDADE
```

### Tela do Coordenador (Mockup)

```
┌─────────────────────────────────────────────────────────┐
│  PAINEL DO COORDENADOR                    [Coordenador] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Marcas       │  │ Modelos      │  │ Pendentes    │ │
│  │ Total: 87    │  │ Total: 2.341 │  │ Validar: 12  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Ações Rápidas                                  │   │
│  │                                                 │   │
│  │  [+ Nova Marca]  [+ Novo Modelo]               │   │
│  │  [Sincronizar Fipe]  [Validar Pendentes]       │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Registros Pendentes de Validação              │   │
│  │                                                 │   │
│  │  [!] Fiat Fastback 2024 - Novo modelo          │   │
│  │      Cadastrado por: João (Pesquisador)         │   │
│  │      [Revisar]  [Aprovar]  [Rejeitar]          │   │
│  │                                                 │   │
│  │  [!] Chevrolet Montana 2024 - Atualização      │   │
│  │      Cadastrado por: Maria (Pesquisador)        │   │
│  │      [Revisar]  [Aprovar]  [Rejeitar]          │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Últimas Sincronizações com Fipe               │   │
│  │                                                 │   │
│  │  Hoje 08:00  - 3 novos modelos detectados      │   │
│  │  Ontem 08:00 - 1 modelo atualizado             │   │
│  │  02/02 08:00 - Nenhuma alteração               │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Marcas]  [Modelos]  [Categorias]  [Relatórios]       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Formulário de Cadastro de Modelo

```
┌─────────────────────────────────────────────────────────┐
│  CADASTRAR NOVO MODELO                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Marca: [Fiat                        ▼]                │
│                                                         │
│  Nome do Modelo: [Fastback                    ]        │
│                                                         │
│  Ano/Modelo: [2024]  Ano Fabricação: [2023]            │
│                                                         │
│  Categoria:                                             │
│  [ ] Hatch  [ ] Sedan  [x] SUV  [ ] Picape             │
│                                                         │
│  Tipo de Combustível:                                   │
│  [x] Gasolina  [ ] Etanol  [x] Flex  [ ] Diesel        │
│                                                         │
│  Motorização:                                           │
│  [1.0 Turbo, 1.3 Turbo                        ]        │
│                                                         │
│  Transmissão:                                           │
│  [x] Manual  [x] Automática  [ ] CVT                   │
│                                                         │
│  Código Fipe: [001234-5]                                │
│                                                         │
│  Faixa de Preço Esperada:                               │
│  Mínimo: R$ [80.000]  Máximo: R$ [120.000]             │
│                                                         │
│  Tags:                                                  │
│  [SUV, Compacto, Turbo, Econômico            ]         │
│                                                         │
│  Observações:                                           │
│  [Lançamento 2023, baseado no Argo           ]         │
│                                                         │
│  [Cancelar]  [Salvar como Rascunho]  [Publicar]        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Nível de Acesso
- Intermediário (leitura + escrita em dados mestres)
- Pode validar registros de pesquisadores
- Não pode gerenciar usuários ou sistema

### Status
⏳ **Planejado** (V3)

---

## 4. Analista de Mercado (Estratégico)

### Descrição
Profissional que monitora tendências de mercado automotivo e gera relatórios estratégicos.

### Responsabilidades Estratégicas
- Visualizar dashboard analítico
- Gerar relatórios de tendências
- Analisar variações de preços
- Identificar padrões de mercado
- Exportar dados para análise externa

### Diferença vs Pesquisador
- **Pesquisador:** Captura dados operacionais (preços individuais)
- **Analista:** Analisa dados agregados (tendências, padrões)

### Nível de Acesso
- Avançado (leitura de todos os dados + geração de relatórios)
- Não pode alterar dados
- Não pode gerenciar usuários

### Status
⏳ **Planejado** (V3)

---

## 5. Administrador (Gestão)

### Descrição
Responsável pela gestão técnica do sistema, usuários e configurações.

### Responsabilidades de Gestão
- Gerenciar usuários (criar, editar, desativar)
- Gerenciar permissões (atribuir roles)
- Configurar integrações com APIs
- Monitorar uso do sistema
- Visualizar logs de auditoria
- Gerenciar cache e performance
- Executar backups

### Nível de Acesso
- Total (todas as funcionalidades)

### Status
⏳ **Planejado** (V3)

---

## Matriz de Responsabilidades

| Responsabilidade | Usuário | Pesquisador | Coordenador | Analista | Admin |
|------------------|---------|-------------|-------------|----------|-------|
| **Consulta** |
| Consultar Fipe | ✅ | ✅ | ✅ | ✅ | ✅ |
| Analisar Mercado | ✅ | ✅ | ✅ | ✅ | ✅ |
| Histórico Pessoal | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Captura** |
| Capturar Preços | ❌ | ✅ | ❌ | ❌ | ✅ |
| Validar Capturas | ❌ | ❌ | ✅ | ❌ | ✅ |
| **Cadastro** |
| Cadastrar Marcas | ❌ | ❌ | ✅ | ❌ | ✅ |
| Cadastrar Modelos | ❌ | ❌ | ✅ | ❌ | ✅ |
| Gerenciar Categorias | ❌ | ❌ | ✅ | ❌ | ✅ |
| **Análise** |
| Dashboard Analítico | ❌ | ❌ | ❌ | ✅ | ✅ |
| Gerar Relatórios | ❌ | ❌ | ❌ | ✅ | ✅ |
| Exportar Dados | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Gestão** |
| Gerenciar Usuários | ❌ | ❌ | ❌ | ❌ | ✅ |
| Configurar Sistema | ❌ | ❌ | ❌ | ❌ | ✅ |
| Visualizar Logs | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## Fluxo de Trabalho Integrado

```
1. COORDENADOR cadastra nova marca/modelo
   │
   ▼
2. Sistema sincroniza com API Fipe
   │
   ▼
3. PESQUISADOR recebe tarefa de capturar preços
   │
   ▼
4. PESQUISADOR busca em marketplaces e registra
   │
   ▼
5. COORDENADOR valida dados capturados
   │
   ▼
6. Sistema processa e armazena preços
   │
   ▼
7. USUÁRIO consulta e vê análise de mercado
   │
   ▼
8. ANALISTA gera relatórios de tendências
   │
   ▼
9. ADMIN monitora sistema e usuários
```

---

## Implementação por Versão

### V1 (Implementado)
- ✅ Usuário (consulta básica)

### V2 (Implementado)
- ✅ Usuário (consulta + análise + histórico)

### V3 (Planejado)
- ⏳ Pesquisador (captura de preços)
- ⏳ Coordenador (cadastro de dados)
- ⏳ Analista (relatórios)
- ⏳ Admin (gestão)

---

## Justificativa da Abordagem

### Por que só Usuário em V1/V2?

**Decisão Estratégica:**
1. **Validação de Mercado:** Foco no usuário final que gera valor
2. **MVP Rápido:** Implementar core value primeiro
3. **Dados Automatizados:** API Fipe fornece dados mestres
4. **Análise Simulada:** Algoritmo gera variações realistas

**Quando adicionar outros atores:**
- **V3:** Quando houver base de usuários e necessidade de dados reais de mercado
- **Pesquisador:** Para captura manual de preços reais
- **Coordenador:** Para manter dados mestres customizados
- **Analista:** Para análises estratégicas avançadas

### Vantagem da Abordagem

✅ **V1/V2:** Sistema funcional e útil sem complexidade operacional
✅ **V3:** Adiciona camada operacional quando justificado
✅ **Escalável:** Arquitetura preparada para evolução

---

## Conclusão

O sistema FipeCheck foi projetado com **5 atores** contemplando responsabilidades operacionais e estratégicas:

1. **Usuário:** Consome informações (implementado)
2. **Pesquisador:** Captura preços (planejado)
3. **Coordenador:** Cadastra dados mestres (planejado)
4. **Analista:** Analisa tendências (planejado)
5. **Admin:** Gerencia sistema (planejado)

A implementação atual (V1/V2) foca no ator principal (Usuário) com dados automatizados. A expansão para atores operacionais está documentada e planejada para V3.
