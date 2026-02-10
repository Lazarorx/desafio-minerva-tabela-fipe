# Protótipos - Wireframes da Aplicação

## 1. Visão Geral

**Aplicação:** Consulta Tabela Fipe (Web)
**Telas:** 2 principais
**Responsividade:** Desktop e Mobile

---

## 2. Tela 1: Consulta de Veículo

### 2.1 Wireframe Desktop

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                     CONSULTA TABELA FIPE                       │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                                                                │
│    ┌──────────────────────────────────────────────────┐       │
│    │                                                  │       │
│    │         Consultar Veículo                        │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │ Marca:                                     │ │       │
│    │  │ ┌────────────────────────────────────────┐ │ │       │
│    │  │ │ Selecione...                        ▼ │ │ │       │
│    │  │ └────────────────────────────────────────┘ │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │ Modelo:                                    │ │       │
│    │  │ ┌────────────────────────────────────────┐ │ │       │
│    │  │ │ Selecione...                        ▼ │ │ │       │
│    │  │ └────────────────────────────────────────┘ │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │ Ano:                                       │ │       │
│    │  │ ┌────────────────────────────────────────┐ │ │       │
│    │  │ │ Selecione...                        ▼ │ │ │       │
│    │  │ └────────────────────────────────────────┘ │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │                                            │ │       │
│    │  │            [ CONSULTAR ]                   │ │       │
│    │  │                                            │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    └──────────────────────────────────────────────────┘       │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Wireframe Mobile

```
┌──────────────────────────┐
│  CONSULTA TABELA FIPE    │
├──────────────────────────┤
│                          │
│  Consultar Veículo       │
│                          │
│  ┌────────────────────┐  │
│  │ Marca:             │  │
│  │ ┌────────────────┐ │  │
│  │ │ Selecione... ▼ │ │  │
│  │ └────────────────┘ │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ Modelo:            │  │
│  │ ┌────────────────┐ │  │
│  │ │ Selecione... ▼ │ │  │
│  │ └────────────────┘ │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ Ano:               │  │
│  │ ┌────────────────┐ │  │
│  │ │ Selecione... ▼ │ │  │
│  │ └────────────────┘ │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │   [ CONSULTAR ]    │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

### 2.3 Estados da Tela

**Estado 1: Inicial**
- Dropdown Marca: Habilitado, vazio
- Dropdown Modelo: Desabilitado (cinza)
- Dropdown Ano: Desabilitado (cinza)
- Botão Consultar: Desabilitado (cinza)

**Estado 2: Marca Selecionada**
- Dropdown Marca: "Fiat" selecionado
- Dropdown Modelo: Habilitado, carregando...
- Dropdown Ano: Desabilitado
- Botão Consultar: Desabilitado

**Estado 3: Modelo Selecionado**
- Dropdown Marca: "Fiat"
- Dropdown Modelo: "Uno Mille 1.0"
- Dropdown Ano: Habilitado, carregando...
- Botão Consultar: Desabilitado

**Estado 4: Pronto para Consultar**
- Dropdown Marca: "Fiat"
- Dropdown Modelo: "Uno Mille 1.0"
- Dropdown Ano: "2023 Gasolina"
- Botão Consultar: Habilitado (azul)

**Estado 5: Carregando**
- Todos os campos desabilitados
- Botão: "Consultando..." (cinza)
- Spinner/loading (opcional)

**Estado 6: Erro**
- Mensagem de erro em vermelho no topo
- "❌ Erro ao consultar. Tente novamente."
- Campos habilitados para tentar novamente


---

## 3. Tela 2: Resultado da Consulta

### 3.1 Wireframe Desktop

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                     CONSULTA TABELA FIPE                       │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                                                                │
│    ┌──────────────────────────────────────────────────┐       │
│    │                                                  │       │
│    │         Resultado da Consulta                    │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │                                            │ │       │
│    │  │        Fiat Uno Mille 1.0                  │ │       │
│    │  │                                            │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │                                            │ │       │
│    │  │  Ano:              2023                    │ │       │
│    │  │  ─────────────────────────────────────────  │ │       │
│    │  │  Combustível:      Gasolina                │ │       │
│    │  │  ─────────────────────────────────────────  │ │       │
│    │  │  Código Fipe:      001004-1                │ │       │
│    │  │                                            │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │                                            │ │       │
│    │  │           Valor Fipe                       │ │       │
│    │  │                                            │ │       │
│    │  │         R$ 45.000,00                       │ │       │
│    │  │                                            │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    │         Referência: Fevereiro de 2026            │       │
│    │                                                  │       │
│    │  ┌────────────────────────────────────────────┐ │       │
│    │  │                                            │ │       │
│    │  │          [ NOVA CONSULTA ]                 │ │       │
│    │  │                                            │ │       │
│    │  └────────────────────────────────────────────┘ │       │
│    │                                                  │       │
│    └──────────────────────────────────────────────────┘       │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.2 Wireframe Mobile

```
┌──────────────────────────┐
│  CONSULTA TABELA FIPE    │
├──────────────────────────┤
│                          │
│  Resultado da Consulta   │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │  Fiat Uno Mille    │  │
│  │       1.0          │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │ Ano: 2023          │  │
│  │ ──────────────────  │  │
│  │ Combustível:       │  │
│  │ Gasolina           │  │
│  │ ──────────────────  │  │
│  │ Código Fipe:       │  │
│  │ 001004-1           │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │   Valor Fipe       │  │
│  │                    │  │
│  │  R$ 45.000,00      │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  Referência:             │
│  Fevereiro de 2026       │
│                          │
│  ┌────────────────────┐  │
│  │  [ NOVA CONSULTA ] │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```


---

## 4. Especificações Visuais

### 4.1 Cores

```
Primária (Azul):     #3498db
Primária Hover:      #2980b9
Secundária (Verde):  #2ecc71
Secundária Hover:    #27ae60
Erro (Vermelho):     #e74c3c
Texto Principal:     #2c3e50
Texto Secundário:    #7f8c8d
Fundo:               #ecf0f1
Branco:              #ffffff
Borda:               #ddd
Desabilitado:        #bdc3c7
```

### 4.2 Tipografia

```
Título Principal (h1):  32px, Bold
Título Seção (h2):      24px, Bold
Título Card (h3):       20px, Bold
Label:                  14px, SemiBold
Input/Select:           16px, Regular
Botão:                  16px, SemiBold
Preço:                  40px, Bold
Texto Pequeno:          12px, Regular
```

### 4.3 Espaçamentos

```
Padding Card:           30px
Margin entre campos:    20px
Padding Input:          12px
Padding Botão:          14px
Border Radius:          8px (cards), 4px (inputs)
```

### 4.4 Componentes

**Dropdown (Select)**
- Largura: 100%
- Altura: 48px
- Borda: 1px solid #ddd
- Border radius: 4px
- Padding: 12px
- Font-size: 16px
- Estado disabled: background #f5f5f5

**Botão Primário**
- Largura: 100%
- Altura: 48px
- Background: #3498db
- Cor texto: #ffffff
- Border: none
- Border radius: 4px
- Font-size: 16px
- Font-weight: 600
- Cursor: pointer
- Hover: background #2980b9
- Disabled: background #bdc3c7

**Botão Secundário (Nova Consulta)**
- Largura: 100%
- Altura: 48px
- Background: #2ecc71
- Cor texto: #ffffff
- Border: none
- Border radius: 4px
- Font-size: 16px
- Font-weight: 600
- Cursor: pointer
- Hover: background #27ae60

**Card de Resultado**
- Background: #ffffff
- Padding: 30px
- Border radius: 8px
- Box-shadow: 0 2px 10px rgba(0,0,0,0.1)

**Box de Preço**
- Background: #3498db
- Cor texto: #ffffff
- Padding: 30px
- Border radius: 8px
- Text-align: center

**Mensagem de Erro**
- Background: #e74c3c
- Cor texto: #ffffff
- Padding: 12px
- Border radius: 4px
- Margin-bottom: 20px


---

## 5. Fluxo de Navegação

```
┌─────────────────┐
│  Tela Inicial   │
│  (Consulta)     │
└────────┬────────┘
         │
         │ Usuário preenche
         │ marca, modelo, ano
         │
         ▼
┌─────────────────┐
│ Clica Consultar │
└────────┬────────┘
         │
         │ API retorna dados
         │
         ▼
┌─────────────────┐
│ Tela Resultado  │
└────────┬────────┘
         │
         │ Clica Nova Consulta
         │
         ▼
┌─────────────────┐
│  Tela Inicial   │
│  (Consulta)     │
│  [resetada]     │
└─────────────────┘
```

---

## 6. Interações e Animações

### 6.1 Transições
- Mudança de tela: Fade in/out (300ms)
- Hover em botões: Transição de cor (200ms)
- Loading: Spinner ou texto piscando

### 6.2 Feedback Visual
- Botão hover: Cor mais escura
- Campo focus: Borda azul (#3498db)
- Campo disabled: Background cinza claro
- Loading: Cursor wait + texto "Carregando..."

### 6.3 Validações Visuais
- Campo vazio ao tentar submit: Borda vermelha
- Erro de API: Banner vermelho no topo
- Sucesso: Transição suave para resultado

---

## 7. Responsividade

### 7.1 Breakpoints

```
Mobile:     < 768px
Tablet:     768px - 1024px
Desktop:    > 1024px
```

### 7.2 Ajustes Mobile

**Tela de Consulta:**
- Padding reduzido (20px → 15px)
- Font-size título reduzido (32px → 24px)
- Dropdowns mantêm 100% largura
- Botão mantém 100% largura

**Tela de Resultado:**
- Padding reduzido
- Preço font-size reduzido (40px → 32px)
- Info em coluna única
- Botão mantém 100% largura

---

## 8. Acessibilidade

### 8.1 Elementos Acessíveis
- Labels associados a inputs (htmlFor)
- Contraste adequado (WCAG AA)
- Tamanho mínimo de toque: 48px
- Estados focus visíveis
- Mensagens de erro descritivas

### 8.2 Navegação por Teclado
- Tab: Navega entre campos
- Enter: Submete formulário
- Escape: Limpa seleção (futuro)

---

## 9. Mockup com Dados Reais

### 9.1 Tela de Consulta (Preenchida)

```
┌────────────────────────────────────────┐
│     CONSULTA TABELA FIPE               │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Consultar Veículo               │ │
│  │                                  │ │
│  │  Marca:                          │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │ Fiat                    ▼ │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  │  Modelo:                         │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │ Uno Mille 1.0           ▼ │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  │  Ano:                            │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │ 2023 Gasolina           ▼ │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │      [ CONSULTAR ]         │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

### 9.2 Tela de Resultado (Dados Reais)

```
┌────────────────────────────────────────┐
│     CONSULTA TABELA FIPE               │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Resultado da Consulta           │ │
│  │                                  │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │  Fiat Uno Mille 1.0        │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  │  Ano:              2023          │ │
│  │  ──────────────────────────────  │ │
│  │  Combustível:      Gasolina      │ │
│  │  ──────────────────────────────  │ │
│  │  Código Fipe:      001004-1      │ │
│  │                                  │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │                            │  │ │
│  │  │      Valor Fipe            │  │ │
│  │  │                            │  │ │
│  │  │    R$ 45.000,00            │  │ │
│  │  │                            │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  │  Referência: Fevereiro de 2026   │ │
│  │                                  │ │
│  │  ┌────────────────────────────┐  │ │
│  │  │    [ NOVA CONSULTA ]       │  │ │
│  │  └────────────────────────────┘  │ │
│  │                                  │ │
│  └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```


---

## 10. Ferramentas para Criar Versão Visual

Se você quiser criar uma versão mais visual dos wireframes, use:

### 10.1 Opção 1: Excalidraw (Recomendado - Rápido)
- URL: https://excalidraw.com
- Gratuito, no navegador
- Estilo sketch/desenho à mão
- Exporta PNG/SVG
- Tempo: 30-45 min

**Como usar:**
1. Acesse excalidraw.com
2. Use retângulos para cards
3. Use texto para labels
4. Use setas para fluxo
5. Exporte como PNG

### 10.2 Opção 2: Figma (Mais Profissional)
- URL: https://figma.com
- Gratuito (conta básica)
- Mais profissional
- Tempo: 1-2h

**Como usar:**
1. Criar conta no Figma
2. Novo arquivo
3. Criar frames (375px mobile, 1440px desktop)
4. Usar componentes de UI
5. Exportar como PNG ou compartilhar link

### 10.3 Opção 3: Usar este Documento
- Já está pronto! ✅
- Wireframes em ASCII são válidos
- Especificações visuais completas
- Economiza tempo

**Recomendação:** Use este documento como está. É suficiente para a entrega!

---

## 11. Checklist de Protótipos

### Wireframes
- [x] Tela de Consulta (Desktop)
- [x] Tela de Consulta (Mobile)
- [x] Tela de Resultado (Desktop)
- [x] Tela de Resultado (Mobile)
- [x] Estados da tela (inicial, loading, erro)

### Especificações
- [x] Cores definidas
- [x] Tipografia definida
- [x] Espaçamentos definidos
- [x] Componentes especificados

### Fluxos
- [x] Fluxo de navegação
- [x] Interações e animações
- [x] Responsividade
- [x] Acessibilidade

### Mockups
- [x] Mockup com dados reais
- [x] Exemplos de uso

---

## 12. Como Apresentar os Protótipos

### 12.1 Na Entrega 1 (Hoje 17h)

**Formato:** PDF ou Markdown

**Estrutura:**
1. Mostrar wireframe da Tela de Consulta
2. Explicar estados (inicial, preenchido, loading)
3. Mostrar wireframe da Tela de Resultado
4. Explicar fluxo de navegação
5. Mostrar especificações visuais (cores, fontes)

**Tempo de apresentação:** 3-5 minutos

### 12.2 O Que Falar

"Criei wireframes das duas telas principais: consulta e resultado. A tela de consulta tem três dropdowns em cascata - marca, modelo e ano - com validação que só habilita o próximo campo quando o anterior tá preenchido. A tela de resultado mostra as informações do veículo com o preço em destaque e um botão pra fazer nova consulta. Defini também as cores, tipografia e como vai ficar no mobile."

---

## 13. Resumo

**Telas:** 2 (Consulta + Resultado)  
**Componentes:** Dropdowns, Botões, Cards  
**Cores:** Azul (#3498db), Verde (#2ecc71), Vermelho (#e74c3c)  
**Responsivo:** Mobile-first  

**Status:** ✅ Protótipos completos

---

**Documento criado em:** 10 de fevereiro de 2026  
**Versão:** 1.0  
**Projeto:** Tabela Fipe - Protótipos MVP
