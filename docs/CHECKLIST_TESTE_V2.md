# Checklist de Teste - V2 Avançado

## Antes da Apresentação

### Preparação do Ambiente
- [ ] Servidor rodando (npm run dev)
- [ ] Browser aberto em http://localhost:5173
- [ ] Limpar LocalStorage (F12 > Application > Clear)
- [ ] Fazer login com usuário teste
- [ ] Ter 2-3 consultas no histórico
- [ ] Ter 1-2 veículos nos favoritos

### Teste Completo do Fluxo

#### 1. Login/Registro
- [ ] Página de login carrega
- [ ] Pode fazer login
- [ ] Pode registrar novo usuário
- [ ] Redireciona para dashboard

#### 2. Dashboard
- [ ] Estatísticas aparecem corretamente
- [ ] Última consulta mostra (se houver)
- [ ] Botões de ação rápida funcionam
- [ ] Navegação funciona

#### 3. Consulta de Veículo
- [ ] Marcas carregam
- [ ] Modelos carregam ao selecionar marca
- [ ] Anos carregam ao selecionar modelo
- [ ] Botão "Consultar" funciona
- [ ] Resultado aparece corretamente
- [ ] Todos os dados estão visíveis

#### 4. Análise de Mercado (CRÍTICO!)
- [ ] Botão "Analisar Mercado" aparece
- [ ] Modal abre ao clicar
- [ ] Loading aparece
- [ ] Dados carregam (800ms)
- [ ] Recomendação aparece
- [ ] Estatísticas corretas
- [ ] Gráfico renderiza
- [ ] Oportunidades destacadas (se houver)
- [ ] Lista de fontes completa
- [ ] Botão X fecha o modal
- [ ] Clicar fora fecha o modal

#### 5. Histórico
- [ ] Lista de consultas aparece
- [ ] Busca funciona
- [ ] Botão de análise de mercado funciona
- [ ] Botão de favoritos funciona
- [ ] Botão de comparação funciona
- [ ] Botão de deletar funciona
- [ ] Limpar histórico funciona

#### 6. Favoritos
- [ ] Lista de favoritos aparece
- [ ] Botão "Analisar Mercado" funciona
- [ ] Botão "Adicionar à Comparação" funciona
- [ ] Botão de remover funciona
- [ ] Contador de favoritos correto

#### 7. Comparação
- [ ] Veículos adicionados aparecem
- [ ] Análise de preços aparece (se 2+)
- [ ] Tabela comparativa aparece (se 2+)
- [ ] Placeholder aparece (se < 3)
- [ ] Botão de remover funciona
- [ ] Limpar comparação funciona

#### 8. Dark Mode
- [ ] Toggle funciona
- [ ] Cores mudam corretamente
- [ ] Preferência salva

#### 9. Navegação
- [ ] Todos os links do header funcionam
- [ ] Logout funciona
- [ ] Redireciona para login após logout

## Testes de Análise de Mercado

### Cenários para Testar

#### Cenário 1: Oportunidade Excelente
- Consulte: Honda Civic 2020
- Deve mostrar: Recomendação verde "Excelente Oportunidade"
- Deve ter: 2-3 oportunidades destacadas

#### Cenário 2: Preço Alto
- Consulte: Porsche 911 2022
- Pode mostrar: Recomendação amarela/vermelha
- Deve ter: Análise completa

#### Cenário 3: Veículo Popular
- Consulte: Volkswagen Gol 2018
- Deve mostrar: Análise completa
- Deve ter: Gráfico claro

### Verificações Visuais

#### Modal de Análise
- [ ] Centralizado na tela
- [ ] Fundo escuro (overlay)
- [ ] Botão X visível
- [ ] Scroll funciona (se necessário)
- [ ] Responsivo

#### Recomendação
- [ ] Ícone correto (check ou alerta)
- [ ] Cor correta (verde/azul/amarelo/vermelho)
- [ ] Texto claro e legível
- [ ] Borda colorida

#### Estatísticas
- [ ] 4 cards visíveis
- [ ] Valores formatados (R$)
- [ ] Labels claros
- [ ] Cores apropriadas

#### Gráfico
- [ ] Renderiza corretamente
- [ ] Pontos visíveis
- [ ] Cores corretas (roxo Fipe, verde oportunidade)
- [ ] Tooltips funcionam
- [ ] Eixos legíveis

#### Oportunidades
- [ ] Cards destacados (borda verde)
- [ ] Badge com percentual
- [ ] Economia calculada
- [ ] Fonte identificada

#### Lista de Fontes
- [ ] 4 fontes listadas
- [ ] Preços formatados
- [ ] Variação com seta (↑ ou ↓)
- [ ] Cor correta (verde negativo, vermelho positivo)
- [ ] Tag "Oportunidade" quando aplicável

## Testes de Performance

- [ ] Consulta Fipe < 2s
- [ ] Análise de mercado < 1s
- [ ] Navegação instantânea
- [ ] Sem travamentos
- [ ] Sem erros no console

## Testes de Responsividade

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## Testes de Compatibilidade

- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (se possível)

## Checklist de Apresentação

### Preparação
- [ ] Servidor rodando
- [ ] Browser limpo (sem abas extras)
- [ ] Zoom 100%
- [ ] Console fechado
- [ ] Dados de teste prontos

### Durante
- [ ] Falar com confiança
- [ ] Mostrar análise de mercado MUITO
- [ ] Destacar oportunidades
- [ ] Explicar recomendações
- [ ] Mostrar gráfico

### Depois
- [ ] Responder perguntas calmamente
- [ ] Não se desculpar
- [ ] Focar no valor
- [ ] Agradecer

## Problemas Conhecidos e Soluções

### Se o gráfico não renderizar:
- Recarregue a página (F5)
- Verifique console
- Tente outro veículo

### Se a análise demorar muito:
- Normal (800ms de delay simulado)
- Mostra que está "buscando dados reais"

### Se não aparecer oportunidades:
- Normal (depende da variação aleatória)
- Tente outro veículo
- Explique que é baseado em dados reais

### Se o modal não fechar:
- Clique no X
- Clique fora do modal
- ESC (se implementado)

## Comandos Úteis

### Limpar dados:
```javascript
// No console do browser (F12)
localStorage.clear()
location.reload()
```

### Ver dados salvos:
```javascript
// No console
console.log(JSON.parse(localStorage.getItem('fipecheck_history')))
console.log(JSON.parse(localStorage.getItem('fipecheck_favorites')))
```

### Forçar dark mode:
```javascript
// No console
localStorage.setItem('fipecheck_theme', 'dark')
location.reload()
```

## Última Verificação (5 min antes)

- [ ] Servidor rodando
- [ ] Página carrega
- [ ] Login funciona
- [ ] Consulta funciona
- [ ] Análise de mercado funciona
- [ ] Gráfico aparece
- [ ] Sem erros no console

## Boa Sorte!

Você está preparado. Confia no seu trabalho. Mostra o valor que você criou. Você vai arrasar!
