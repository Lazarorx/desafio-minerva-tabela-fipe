# Planning - Tabela Fipe (MVP Simplificado)

## 1. O que vamos fazer

Basicamente um sistema onde o usuário consegue consultar o preço de veículos pela Tabela Fipe. A ideia é ser simples e direto - a pessoa entra, seleciona o carro e vê o preço.

**Foco agora:** Só a parte de consulta do usuário (sem login, sem admin por enquanto).

---

## 2. Fluxo do Usuário

```
1. Usuário entra na página
2. Seleciona marca (dropdown)
3. Seleciona modelo (dropdown)
4. Seleciona ano (dropdown)
5. Clica em "Consultar"
6. Sistema mostra o preço
```

Simples assim.

---

## 3. Telas

### Tela 1: Consulta
```
┌────────────────────────────────┐
│   CONSULTA TABELA FIPE         │
├────────────────────────────────┤
│                                │
│  Marca:     [Selecione... ▼]   │
│                                │
│  Modelo:    [Selecione... ▼]   │
│                                │
│  Ano:       [Selecione... ▼]   │
│                                │
│  [ CONSULTAR ]                 │
│                                │
└────────────────────────────────┘
```

### Tela 2: Resultado
```
┌────────────────────────────────┐
│   RESULTADO                    │
├────────────────────────────────┤
│                                │
│  Fiat Uno Mille 1.0            │
│  Ano: 2023 | Gasolina          │
│                                │
│  Valor: R$ 45.000,00           │
│                                │
│  Referência: fevereiro/2026    │
│                                │
│  [ NOVA CONSULTA ]             │
│                                │
└────────────────────────────────┘
```

---

## 4. Banco de Dados

**Decisão:** NÃO vou usar banco por enquanto!

Por quê?
- Economiza tempo de setup
- API da Fipe já tem todos os dados
- Foco na funcionalidade principal

**Se sobrar tempo:** Adicionar uma tabela simples só pra log.

---

## 5. Arquitetura Simplificada

```
Frontend (React)
    ↓
Backend (Node + Express) - OPCIONAL
    ↓
API da Fipe (direto)
```

**Opção 1 (mais rápida):** Frontend chama API da Fipe direto  
**Opção 2 (se der tempo):** Backend como proxy

---

## 6. Componentes (Frontend)

### VehicleSearch.jsx
- Dropdowns de marca, modelo, ano
- Botão de consultar
- Gerencia estado das seleções

### VehicleResult.jsx
- Exibe resultado da consulta
- Botão de nova consulta

### App.jsx
- Gerencia navegação entre busca e resultado

---

## 7. Integração com API Fipe

**API:** https://parallelum.com.br/fipe/api/v1/

**Endpoints que vamos usar:**
```
GET /carros/marcas
→ Lista de marcas

GET /carros/marcas/{marcaId}/modelos
→ Lista de modelos

GET /carros/marcas/{marcaId}/modelos/{modeloId}/anos
→ Lista de anos

GET /carros/marcas/{marcaId}/modelos/{modeloId}/anos/{anoId}
→ Preço final
```

---

## 8. Stack Tecnológica

**Frontend:**
- React (Create React App ou Vite)
- Axios (pra chamadas HTTP)
- CSS simples (sem framework)

**Backend (opcional):**
- Node + Express
- Sem banco de dados

**Justificativa:** Stack que eu já conheço = mais rápido

---

## 9. Plano de Implementação

### Segunda (hoje) - Planning
- [x] Definir escopo
- [ ] Validar com Minerva (15h)

### Terça - Docs e Protótipo
- [ ] 09:30-12:00: Modelo de componentes (desenhos)
- [ ] 13:00-17:00: Protótipo + TD dos componentes
- [ ] 17:00: ENTREGA 1

### Quarta - Código (Dia 1)
- [ ] 09:30-12:00: Setup do projeto React
- [ ] 13:00-17:00: Implementar VehicleSearch (dropdowns + integração API)

### Quinta - Código (Dia 2)
- [ ] 09:30-12:00: Implementar VehicleResult
- [ ] 13:00-17:00: Ajustes, CSS, tratamento de erros

### Sexta - Testes e Apresentação
- [ ] 09:30-12:00: Testes manuais, correções
- [ ] 13:00-14:30: Preparar apresentação
- [ ] 14:30-16:30: APRESENTAÇÃO FINAL

---

## 10. Casos de Teste (Manuais)

**CT01:** Consulta completa com sucesso
- Selecionar marca, modelo, ano
- Verificar se preço aparece

**CT02:** Validação de campos
- Tentar consultar sem preencher tudo
- Deve mostrar erro

**CT03:** Erro de API
- Simular API fora
- Deve mostrar mensagem amigável

---

## 11. Riscos e Plano B

| Risco | Plano B |
|-------|---------|
| API Fipe instável | Usar dados mockados |
| Tempo curto | Focar só no fluxo principal |
| Bug complexo | Deixar pra depois, documentar |

---

## 12. Critérios de Sucesso

✅ Usuário consegue consultar preço de um carro
✅ Interface funcional e responsiva
✅ Código organizado e comentado
✅ Funciona sem erros no console

**Não é critério:**
- Ter banco de dados
- Ter autenticação
- Ter testes automatizados
- Ter backend complexo

---

## 13. O que mostrar na Entrega 1 (Terça 17h)

1. **Este planning** (simplificado)
2. **Modelo de componentes** (desenho simples)
3. **Protótipo das telas** (Figma ou papel fotografado)
4. **TD dos componentes** (lista de props, estados)

**Formato:** PDF ou slides simples

---

## 14. Próximos Passos (Agora)

1. Revisar este planning
2. Preparar apresentação pra 15h (checkpoint)
3. Começar a pensar nos protótipos
