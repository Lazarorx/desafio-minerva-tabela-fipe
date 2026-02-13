# Arquitetura Expandida - FipeCheck

## 1. Visão Geral

Este documento apresenta a arquitetura completa do sistema FipeCheck, incluindo:
- **Arquitetura Atual:** V1 e V2 (Frontend-only)
- **Arquitetura Futura:** V3 (Full-stack com backend)

---

## 2. Arquitetura Atual - V1 e V2

### 2.1 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      USUÁRIO                            │
│                    (Navegador)                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   VERCEL CDN                            │
│              (Edge Network Global)                      │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │         React Application (SPA)                   │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │         Components Layer                    │ │ │
│  │  │  - VehicleSearch                            │ │ │
│  │  │  - VehicleResult                            │ │ │
│  │  │  - Dashboard                                │ │ │
│  │  │  - MarketComparison                         │ │ │
│  │  │  - History, Favorites, Compare              │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │         Services Layer                      │ │ │
│  │  │  - fipeApi                                  │ │ │
│  │  │  - marketApi                                │ │ │
│  │  │  - authService                              │ │ │
│  │  │  - storageService                           │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │         State Management                    │ │ │
│  │  │  - Context API (AuthContext)                │ │ │
│  │  │  - Local State (useState)                   │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│   Fipe API       │    │  LocalStorage    │
│  (parallelum)    │    │  (Navegador)     │
│                  │    │                  │
│ - /marcas        │    │ - users          │
│ - /modelos       │    │ - consultations  │
│ - /anos          │    │ - favorites      │
│ - /preco         │    │ - currentUser    │
└──────────────────┘    └──────────────────┘
```

### 2.2 Camadas da Aplicação

#### 2.2.1 Presentation Layer (Componentes)
**Responsabilidade:** Interface do usuário e interação

**Componentes Principais:**
- `App.jsx` - Componente raiz, roteamento
- `VehicleSearch.jsx` - Formulário de consulta
- `VehicleResult.jsx` - Exibição de resultados
- `MarketComparison.jsx` - Análise de mercado
- `Dashboard.jsx` - Painel do usuário
- `History.jsx` - Histórico de consultas
- `Favorites.jsx` - Veículos favoritos
- `Compare.jsx` - Comparação de veículos
- `Login.jsx` / `Register.jsx` - Autenticação

**Tecnologias:**
- React 18/19
- CSS3 (variáveis CSS)
- Chart.js (gráficos)

#### 2.2.2 Business Logic Layer (Services)
**Responsabilidade:** Lógica de negócio e integrações

**Services:**

**fipeApi.js**
```javascript
- fetchBrands()      // Busca marcas
- fetchModels()      // Busca modelos
- fetchYears()       // Busca anos
- fetchPrice()       // Busca preço
```

**marketApi.js**
```javascript
- getMarketPrices()         // Análise multi-fonte
- generateRecommendation()  // Recomendação inteligente
- findOpportunities()       // Detecta oportunidades
- generateInsights()        // Gera insights
```

**authService.js**
```javascript
- register()    // Registra usuário
- login()       // Autentica usuário
- logout()      // Desautentica
- getCurrentUser() // Usuário atual
```

**storageService.js**
```javascript
- saveConsultation()    // Salva consulta
- getConsultations()    // Lista consultas
- saveFavorite()        // Salva favorito
- getFavorites()        // Lista favoritos
- removeFavorite()      // Remove favorito
```

#### 2.2.3 State Management Layer
**Responsabilidade:** Gerenciamento de estado global

**Context API:**
- `AuthContext` - Estado de autenticação
  - currentUser
  - login()
  - logout()
  - register()

**Local State:**
- useState para estado de componentes
- useEffect para side effects

#### 2.2.4 Data Layer
**Responsabilidade:** Persistência de dados

**LocalStorage:**
- Armazenamento no navegador
- Formato JSON
- Capacidade: ~5-10 MB
- Persistência: Local

**API Externa:**
- Fipe API (parallelum.com.br)
- Endpoints REST
- Dados públicos

---

## 3. Arquitetura Futura - V3 (Full-Stack)

### 3.1 Diagrama de Arquitetura Completa

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIOS                             │
│                  (Web + Mobile + API)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS/TLS 1.3
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE CDN                           │
│              (DDoS Protection + Cache)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────────┐
│  Static Assets   │    │   API Gateway        │
│   (Vercel CDN)   │    │   (Load Balancer)    │
│                  │    │                      │
│ - React App      │    │ - Rate Limiting      │
│ - Images         │    │ - Authentication     │
│ - CSS/JS         │    │ - Request Routing    │
└──────────────────┘    └──────────┬───────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌────────────────────┐        ┌────────────────────┐
        │   Backend API      │        │   Worker Queue     │
        │   (Node.js)        │        │   (Bull/Redis)     │
        │                    │        │                    │
        │ ┌────────────────┐ │        │ - Price Scraping  │
        │ │  Controllers   │ │        │ - Alert Checking  │
        │ │  - Auth        │ │        │ - Report Gen      │
        │ │  - Vehicles    │ │        └────────────────────┘
        │ │  - Market      │ │
        │ │  - Users       │ │
        │ └────────────────┘ │
        │                    │
        │ ┌────────────────┐ │
        │ │  Services      │ │
        │ │  - FipeService │ │
        │ │  - MarketSvc   │ │
        │ │  - AlertSvc    │ │
        │ └────────────────┘ │
        │                    │
        │ ┌────────────────┐ │
        │ │  Middleware    │ │
        │ │  - JWT Auth    │ │
        │ │  - Validation  │ │
        │ │  - Error       │ │
        │ └────────────────┘ │
        └──────────┬─────────┘
                   │
        ┌──────────┴──────────────────────┐
        │                                 │
        ▼                                 ▼
┌──────────────────┐            ┌──────────────────┐
│   PostgreSQL     │            │   Redis Cache    │
│   (Primary)      │            │                  │
│                  │            │ - Session Store  │
│ - Users          │            │ - API Cache      │
│ - Consultations  │            │ - Queue Jobs     │
│ - Favorites      │            │ - Rate Limiting  │
│ - Market Prices  │            └──────────────────┘
│ - Alerts         │
│ - Audit Logs     │
└────────┬─────────┘
         │
         │ Replication
         ▼
┌──────────────────┐
│   PostgreSQL     │
│   (Replica)      │
│   (Read-only)    │
└──────────────────┘

External APIs:
┌──────────────────┐
│   Fipe API       │
└──────────────────┘
┌──────────────────┐
│   Webmotors API  │
└──────────────────┘
┌──────────────────┐
│   OLX API        │
└──────────────────┘
┌──────────────────┐
│   Mercado Livre  │
└──────────────────┘
```

### 3.2 Componentes do Backend

#### 3.2.1 API Gateway
**Responsabilidade:** Ponto de entrada único para todas as requisições

**Funcionalidades:**
- Load balancing entre instâncias
- Rate limiting (100 req/min por IP)
- Autenticação JWT
- Roteamento de requisições
- Logging centralizado
- CORS configuration

**Tecnologia:** Nginx ou AWS API Gateway

#### 3.2.2 Backend API (Node.js + Express)
**Responsabilidade:** Lógica de negócio e orquestração

**Estrutura:**
```
src/
├── controllers/
│   ├── authController.js
│   ├── vehicleController.js
│   ├── marketController.js
│   ├── userController.js
│   └── alertController.js
├── services/
│   ├── fipeService.js
│   ├── marketService.js
│   ├── alertService.js
│   ├── cacheService.js
│   └── emailService.js
├── middleware/
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   ├── errorMiddleware.js
│   └── rateLimitMiddleware.js
├── models/
│   ├── User.js
│   ├── Consultation.js
│   ├── Favorite.js
│   └── Alert.js
├── routes/
│   ├── authRoutes.js
│   ├── vehicleRoutes.js
│   ├── marketRoutes.js
│   └── userRoutes.js
└── utils/
    ├── jwt.js
    ├── bcrypt.js
    └── validators.js
```

**Endpoints Principais:**

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/vehicles/brands
GET    /api/vehicles/models/:brandId
GET    /api/vehicles/years/:brandId/:modelId
GET    /api/vehicles/price/:brandId/:modelId/:yearId

POST   /api/market/analyze
GET    /api/market/opportunities

GET    /api/consultations
POST   /api/consultations
DELETE /api/consultations/:id

GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:id

GET    /api/alerts
POST   /api/alerts
PUT    /api/alerts/:id
DELETE /api/alerts/:id

GET    /api/users/stats
GET    /api/users/profile
PUT    /api/users/profile
```

#### 3.2.3 Worker Queue (Bull + Redis)
**Responsabilidade:** Processamento assíncrono de tarefas

**Jobs:**

**Price Scraping Job**
```javascript
// Executa a cada 6 horas
- Busca preços em marketplaces
- Armazena em market_prices
- Atualiza cache
```

**Alert Checking Job**
```javascript
// Executa a cada 1 hora
- Verifica alertas ativos
- Compara com preços atuais
- Envia notificações
- Marca alertas como triggered
```

**Report Generation Job**
```javascript
// Executa sob demanda
- Gera relatórios PDF
- Envia por email
- Armazena em S3
```

**Cache Warming Job**
```javascript
// Executa a cada 12 horas
- Pré-carrega marcas populares
- Pré-carrega modelos populares
- Atualiza cache Redis
```

#### 3.2.4 PostgreSQL Database
**Responsabilidade:** Persistência de dados estruturados

**Configuração:**
- Primary: Read/Write
- Replica: Read-only (queries pesadas)
- Backup: Diário automático
- Retenção: 30 dias

**Otimizações:**
- Índices em colunas frequentes
- Particionamento por data (consultations)
- Connection pooling (pg-pool)
- Query optimization

#### 3.2.5 Redis Cache
**Responsabilidade:** Cache e sessões

**Uso:**
- Session store (JWT tokens)
- API response cache (TTL 1h)
- Rate limiting counters
- Queue jobs (Bull)
- Pub/Sub para notificações

**Configuração:**
- Maxmemory: 2GB
- Eviction policy: allkeys-lru
- Persistence: RDB + AOF

---

## 4. Fluxos de Dados

### 4.1 Fluxo de Consulta (V2 - Atual)

```
Usuário
  │
  │ 1. Seleciona marca
  ▼
VehicleSearch Component
  │
  │ 2. fipeApi.fetchBrands()
  ▼
Fipe API
  │
  │ 3. Retorna marcas
  ▼
VehicleSearch Component
  │
  │ 4. Usuário seleciona modelo
  │ 5. fipeApi.fetchModels()
  ▼
Fipe API
  │
  │ 6. Retorna modelos
  ▼
VehicleSearch Component
  │
  │ 7. Usuário seleciona ano
  │ 8. fipeApi.fetchPrice()
  ▼
Fipe API
  │
  │ 9. Retorna preço
  ▼
VehicleSearch Component
  │
  │ 10. storageService.saveConsultation()
  ▼
LocalStorage
  │
  │ 11. Exibe resultado
  ▼
VehicleResult Component
```

### 4.2 Fluxo de Análise de Mercado (V2 - Atual)

```
Usuário
  │
  │ 1. Clica "Analisar Mercado"
  ▼
MarketComparison Component
  │
  │ 2. marketApi.getMarketPrices()
  ▼
MarketAPI Service
  │
  │ 3. Gera variações realistas
  │ 4. Calcula estatísticas
  │ 5. Detecta oportunidades
  │ 6. Gera recomendação
  │ 7. Gera insights
  ▼
MarketComparison Component
  │
  │ 8. Renderiza modal
  │ 9. Exibe gráfico (Chart.js)
  │ 10. Exibe insights
  ▼
Usuário visualiza análise
```

### 4.3 Fluxo de Consulta (V3 - Futuro)

```
Usuário
  │
  │ 1. Seleciona marca
  ▼
React App
  │
  │ 2. GET /api/vehicles/brands
  ▼
API Gateway
  │
  │ 3. Verifica rate limit
  │ 4. Verifica cache Redis
  ▼
Redis Cache
  │
  │ 5. Cache miss
  ▼
Backend API
  │
  │ 6. Busca em Fipe API
  ▼
Fipe API
  │
  │ 7. Retorna marcas
  ▼
Backend API
  │
  │ 8. Armazena em cache (TTL 24h)
  ▼
Redis Cache
  │
  │ 9. Retorna para frontend
  ▼
React App
  │
  │ 10. Exibe marcas
  ▼
Usuário
```

### 4.4 Fluxo de Análise de Mercado (V3 - Futuro)

```
Usuário
  │
  │ 1. Clica "Analisar Mercado"
  ▼
React App
  │
  │ 2. POST /api/market/analyze
  ▼
API Gateway
  │
  │ 3. Valida JWT
  ▼
Backend API
  │
  │ 4. Busca preços em cache
  ▼
Redis Cache
  │
  │ 5. Cache miss
  ▼
Backend API
  │
  │ 6. Consulta market_prices (últimas 24h)
  ▼
PostgreSQL
  │
  │ 7. Se dados antigos, dispara job
  ▼
Worker Queue
  │
  │ 8. Scraping de preços
  ▼
External APIs (Webmotors, OLX, etc)
  │
  │ 9. Armazena preços
  ▼
PostgreSQL (market_prices)
  │
  │ 10. Calcula análise
  │ 11. Salva em market_analysis
  ▼
Backend API
  │
  │ 12. Retorna análise
  ▼
React App
  │
  │ 13. Exibe modal com gráfico
  ▼
Usuário
```

---

## 5. Segurança

### 5.1 Autenticação e Autorização

**V2 (Atual):**
- LocalStorage para sessão
- Senha com hash (simulado)
- Sem expiração de sessão

**V3 (Futuro):**
- JWT (JSON Web Tokens)
- Access token (15 min) + Refresh token (7 dias)
- Bcrypt para senhas (cost factor 10)
- RBAC (Role-Based Access Control)

**Exemplo JWT:**
```javascript
{
  "sub": "user_id",
  "email": "user@email.com",
  "role": "user",
  "iat": 1676304000,
  "exp": 1676304900
}
```

### 5.2 Proteção de Dados

**Em Trânsito:**
- HTTPS/TLS 1.3
- Certificate pinning (mobile)
- HSTS headers

**Em Repouso:**
- PostgreSQL com criptografia de disco
- Senhas com bcrypt
- Dados sensíveis com AES-256

### 5.3 Proteção contra Ataques

**XSS (Cross-Site Scripting):**
- React escapa automaticamente
- Content Security Policy headers
- Sanitização de inputs

**CSRF (Cross-Site Request Forgery):**
- SameSite cookies
- CSRF tokens
- Origin validation

**SQL Injection:**
- Prepared statements (Sequelize ORM)
- Input validation
- Parameterized queries

**DDoS:**
- Cloudflare protection
- Rate limiting (100 req/min)
- IP blacklisting

---

## 6. Escalabilidade

### 6.1 Horizontal Scaling

**Frontend:**
- CDN global (Vercel/Cloudflare)
- Edge caching
- Gzip compression
- Code splitting

**Backend:**
- Múltiplas instâncias (Docker)
- Load balancer (Nginx)
- Stateless design
- Auto-scaling (Kubernetes)

**Database:**
- Read replicas (PostgreSQL)
- Connection pooling
- Query optimization
- Particionamento

**Cache:**
- Redis cluster
- Distributed caching
- Cache invalidation strategy

### 6.2 Vertical Scaling

**Database:**
- Upgrade de CPU/RAM conforme necessário
- SSD para melhor I/O
- Índices otimizados

**Backend:**
- Upgrade de instâncias
- Otimização de código
- Profiling e monitoring

---

## 7. Monitoramento e Observabilidade

### 7.1 Métricas

**Frontend:**
- Page load time
- Time to interactive
- Error rate
- User sessions

**Backend:**
- Request rate (req/s)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- CPU/Memory usage

**Database:**
- Query time
- Connection pool usage
- Cache hit ratio
- Disk I/O

### 7.2 Ferramentas

**APM (Application Performance Monitoring):**
- New Relic ou Datadog
- Distributed tracing
- Error tracking

**Logging:**
- Winston (Node.js)
- Centralized logging (ELK Stack)
- Log levels (error, warn, info, debug)

**Alerting:**
- PagerDuty ou Opsgenie
- Slack notifications
- Email alerts

---

## 8. Deploy e CI/CD

### 8.1 Pipeline Atual (V1/V2)

```
Developer
  │
  │ git push
  ▼
GitHub
  │
  │ webhook
  ▼
Vercel
  │
  │ 1. Build (npm run build)
  │ 2. Deploy to CDN
  │ 3. Invalidate cache
  ▼
Production (Live)
```

### 8.2 Pipeline Futuro (V3)

```
Developer
  │
  │ git push
  ▼
GitHub
  │
  │ webhook
  ▼
GitHub Actions
  │
  ├─ 1. Lint (ESLint)
  ├─ 2. Test (Jest)
  ├─ 3. Build
  ├─ 4. Security scan
  └─ 5. Docker build
  │
  ▼
Docker Registry
  │
  ▼
Kubernetes
  │
  ├─ Rolling update
  ├─ Health checks
  └─ Rollback if fail
  │
  ▼
Production (Live)
```

---

## 9. Custos Estimados

### 9.1 V2 (Atual)
- **Vercel:** $0/mês (Hobby plan)
- **Total:** $0/mês

### 9.2 V3 (Futuro - Estimativa)

**Infraestrutura:**
- Vercel (Frontend): $20/mês
- DigitalOcean (Backend): $40/mês (2x droplets)
- PostgreSQL (Managed): $50/mês
- Redis (Managed): $30/mês
- Cloudflare (Pro): $20/mês

**Serviços:**
- New Relic (APM): $99/mês
- SendGrid (Email): $15/mês

**Total:** ~$274/mês (~R$ 1.370/mês)

**Escalabilidade:**
- 10k usuários ativos: ~$500/mês
- 100k usuários ativos: ~$2.000/mês

---

## 10. Resumo Comparativo

| Aspecto | V2 (Atual) | V3 (Futuro) |
|---------|------------|-------------|
| **Frontend** | React SPA | React SPA |
| **Backend** | Não tem | Node.js + Express |
| **Database** | LocalStorage | PostgreSQL |
| **Cache** | Não tem | Redis |
| **Auth** | Local | JWT |
| **Deploy** | Vercel | Vercel + K8s |
| **Custo** | $0/mês | ~$274/mês |
| **Escalabilidade** | Limitada | Alta |
| **Disponibilidade** | 99.9% | 99.95% |
| **Monitoramento** | Básico | Completo |

---

## 11. Decisões Arquiteturais

### 11.1 Por que React?
- Ecossistema maduro
- Performance (Virtual DOM)
- Componentização
- Comunidade ativa

### 11.2 Por que LocalStorage (V2)?
- Simplicidade
- Sem custo de infraestrutura
- Desenvolvimento rápido
- Demonstra conceito

### 11.3 Por que PostgreSQL (V3)?
- ACID compliance
- Relacionamentos complexos
- Performance em queries
- Escalabilidade

### 11.4 Por que Redis (V3)?
- Cache distribuído
- Session store
- Queue jobs
- Pub/Sub

### 11.5 Por que Microserviços? (Não)
- Complexidade desnecessária para o escopo
- Monolito modular é suficiente
- Mais fácil de manter
- Pode evoluir para microserviços se necessário

---

## 12. Próximos Passos

**Curto Prazo (Q1 2026):**
1. Implementar backend Node.js
2. Migrar para PostgreSQL
3. Implementar autenticação JWT
4. Deploy em produção

**Médio Prazo (Q2 2026):**
1. Integração real com marketplaces
2. Sistema de alertas
3. Worker queue para scraping
4. Monitoramento completo

**Longo Prazo (Q3-Q4 2026):**
1. App mobile (React Native)
2. API pública
3. Dashboard analítico
4. Monetização

---

## 13. Conclusão

A arquitetura do FipeCheck foi projetada para evolução incremental:
- **V1/V2:** Prova de conceito funcional
- **V3:** Sistema escalável e robusto
- **Futuro:** Plataforma completa

O diferencial está na análise inteligente de mercado, não na complexidade da arquitetura. A implementação atual demonstra viabilidade técnica e valor ao usuário, com caminho claro para evolução.
