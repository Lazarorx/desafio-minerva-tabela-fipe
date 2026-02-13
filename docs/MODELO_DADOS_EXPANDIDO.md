# Modelo de Dados Expandido - FipeCheck

## 1. Visão Geral

Este documento apresenta o modelo de dados completo do sistema FipeCheck, incluindo:
- **Implementação Atual:** LocalStorage (V2)
- **Implementação Futura:** PostgreSQL (V3)

---

## 2. Modelo Atual - LocalStorage (V2)

### 2.1 Estrutura de Dados

O sistema V2 utiliza LocalStorage para persistência local no navegador do usuário. Os dados são armazenados em formato JSON.

#### 2.1.1 users
**Descrição:** Armazena dados de usuários cadastrados

```typescript
interface User {
  id: string;              // UUID gerado
  name: string;            // Nome completo
  email: string;           // Email (único)
  password: string;        // Hash da senha
  createdAt: string;       // ISO 8601 timestamp
}
```

**Exemplo:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "$2a$10$...",
  "createdAt": "2026-02-13T10:30:00.000Z"
}
```

**Chave LocalStorage:** `fipecheck_users`

---

#### 2.1.2 currentUser
**Descrição:** Armazena sessão do usuário autenticado

```typescript
interface CurrentUser {
  id: string;
  name: string;
  email: string;
}
```

**Chave LocalStorage:** `fipecheck_currentUser`

---

#### 2.1.3 consultations (Histórico)
**Descrição:** Armazena histórico de consultas do usuário

```typescript
interface Consultation {
  id: string;              // UUID gerado
  userId: string;          // ID do usuário
  vehicleData: {
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    TipoVeiculo: number;
    SiglaCombustivel: string;
  };
  consultedAt: string;     // ISO 8601 timestamp
}
```

**Chave LocalStorage:** `fipecheck_consultations_{userId}`

---

#### 2.1.4 favorites
**Descrição:** Armazena veículos favoritos do usuário

```typescript
interface Favorite {
  id: string;              // UUID gerado
  userId: string;          // ID do usuário
  vehicleData: {
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    TipoVeiculo: number;
    SiglaCombustivel: string;
  };
  addedAt: string;         // ISO 8601 timestamp
}
```

**Chave LocalStorage:** `fipecheck_favorites_{userId}`

---

### 2.2 Diagrama de Relacionamento (LocalStorage)

```
┌─────────────────┐
│     users       │
│                 │
│ - id (PK)       │
│ - name          │
│ - email (UK)    │
│ - password      │
│ - createdAt     │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────┴────────────────────┐
    │                         │
    ▼                         ▼
┌─────────────────┐   ┌─────────────────┐
│ consultations   │   │   favorites     │
│                 │   │                 │
│ - id (PK)       │   │ - id (PK)       │
│ - userId (FK)   │   │ - userId (FK)   │
│ - vehicleData   │   │ - vehicleData   │
│ - consultedAt   │   │ - addedAt       │
└─────────────────┘   └─────────────────┘
```

---

## 3. Modelo Futuro - PostgreSQL (V3)

### 3.1 Estrutura de Tabelas

#### 3.1.1 users
**Descrição:** Usuários do sistema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**Roles:** `user`, `analyst`, `admin`

---

#### 3.1.2 consultations
**Descrição:** Histórico de consultas realizadas

```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(200) NOT NULL,
  year INTEGER NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  fipe_code VARCHAR(20) NOT NULL,
  fipe_price DECIMAL(12,2) NOT NULL,
  reference_month VARCHAR(50) NOT NULL,
  consulted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_consultations_user ON consultations(user_id);
CREATE INDEX idx_consultations_date ON consultations(consulted_at DESC);
CREATE INDEX idx_consultations_brand ON consultations(brand);
CREATE INDEX idx_consultations_model ON consultations(model);
```

---

#### 3.1.3 favorites
**Descrição:** Veículos favoritos dos usuários

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(200) NOT NULL,
  year INTEGER NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  fipe_code VARCHAR(20) NOT NULL,
  fipe_price DECIMAL(12,2) NOT NULL,
  reference_month VARCHAR(50) NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, fipe_code, year)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_added ON favorites(added_at DESC);
```

---

#### 3.1.4 market_prices
**Descrição:** Preços coletados de marketplaces

```sql
CREATE TABLE market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fipe_code VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  source VARCHAR(50) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  url TEXT,
  confidence DECIMAL(3,2),
  collected_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_market_prices_fipe ON market_prices(fipe_code, year);
CREATE INDEX idx_market_prices_source ON market_prices(source);
CREATE INDEX idx_market_prices_date ON market_prices(collected_at DESC);
```

**Sources:** `webmotors`, `olx`, `mercadolivre`, `icarros`, `kavak`

---

#### 3.1.5 price_alerts
**Descrição:** Alertas de preço configurados por usuários

```sql
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  fipe_code VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  target_price DECIMAL(12,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  triggered_at TIMESTAMP,
  UNIQUE(user_id, fipe_code, year)
);

CREATE INDEX idx_alerts_user ON price_alerts(user_id);
CREATE INDEX idx_alerts_active ON price_alerts(is_active);
```

---

#### 3.1.6 market_analysis
**Descrição:** Análises de mercado realizadas

```sql
CREATE TABLE market_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id) ON DELETE CASCADE,
  fipe_price DECIMAL(12,2) NOT NULL,
  avg_market_price DECIMAL(12,2) NOT NULL,
  min_market_price DECIMAL(12,2) NOT NULL,
  max_market_price DECIMAL(12,2) NOT NULL,
  variation_percentage DECIMAL(5,2) NOT NULL,
  has_opportunities BOOLEAN DEFAULT false,
  recommendation_type VARCHAR(20) NOT NULL,
  analyzed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analysis_consultation ON market_analysis(consultation_id);
CREATE INDEX idx_analysis_date ON market_analysis(analyzed_at DESC);
```

**Recommendation Types:** `excellent`, `good`, `neutral`, `caution`

---

#### 3.1.7 audit_logs
**Descrição:** Logs de auditoria do sistema

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_date ON audit_logs(created_at DESC);
```

---

#### 3.1.8 system_cache
**Descrição:** Cache de dados da API Fipe

```sql
CREATE TABLE system_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key VARCHAR(255) NOT NULL UNIQUE,
  cache_value JSONB NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cache_key ON system_cache(cache_key);
CREATE INDEX idx_cache_expires ON system_cache(expires_at);
```

---

### 3.2 Diagrama ER Completo (PostgreSQL)

```
┌─────────────────┐
│     users       │
│                 │
│ - id (PK)       │
│ - name          │
│ - email (UK)    │
│ - password_hash │
│ - role          │
│ - is_active     │
│ - created_at    │
│ - updated_at    │
│ - last_login    │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────┴────────────────────┬────────────────────┬──────────────────┐
    │                         │                    │                  │
    ▼                         ▼                    ▼                  ▼
┌─────────────────┐   ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐
│ consultations   │   │   favorites     │  │ price_alerts │  │ audit_logs   │
│                 │   │                 │  │              │  │              │
│ - id (PK)       │   │ - id (PK)       │  │ - id (PK)    │  │ - id (PK)    │
│ - user_id (FK)  │   │ - user_id (FK)  │  │ - user_id(FK)│  │ - user_id(FK)│
│ - brand         │   │ - brand         │  │ - fipe_code  │  │ - action     │
│ - model         │   │ - model         │  │ - year       │  │ - entity_type│
│ - year          │   │ - year          │  │ - target_price│  │ - details    │
│ - fuel_type     │   │ - fuel_type     │  │ - is_active  │  │ - created_at │
│ - fipe_code     │   │ - fipe_code     │  │ - created_at │  └──────────────┘
│ - fipe_price    │   │ - fipe_price    │  │ - triggered_at│
│ - consulted_at  │   │ - added_at      │  └──────────────┘
└────────┬────────┘   └─────────────────┘
         │
         │ 1:1
         │
         ▼
┌─────────────────────┐
│  market_analysis    │
│                     │
│ - id (PK)           │
│ - consultation_id(FK)│
│ - fipe_price        │
│ - avg_market_price  │
│ - min_market_price  │
│ - max_market_price  │
│ - variation_%       │
│ - has_opportunities │
│ - recommendation    │
│ - analyzed_at       │
└─────────────────────┘

┌─────────────────┐
│ market_prices   │
│                 │
│ - id (PK)       │
│ - fipe_code     │
│ - year          │
│ - source        │
│ - price         │
│ - url           │
│ - confidence    │
│ - collected_at  │
└─────────────────┘

┌─────────────────┐
│ system_cache    │
│                 │
│ - id (PK)       │
│ - cache_key (UK)│
│ - cache_value   │
│ - expires_at    │
│ - created_at    │
└─────────────────┘
```

---

## 4. Comparação: LocalStorage vs PostgreSQL

| Aspecto | LocalStorage (V2) | PostgreSQL (V3) |
|---------|-------------------|-----------------|
| **Persistência** | Navegador do usuário | Servidor centralizado |
| **Capacidade** | ~5-10 MB | Ilimitada |
| **Compartilhamento** | Não (local) | Sim (multi-dispositivo) |
| **Backup** | Não | Sim (automático) |
| **Consultas Complexas** | Não | Sim (SQL) |
| **Relacionamentos** | Simulados | Nativos (FK) |
| **Transações** | Não | Sim (ACID) |
| **Segurança** | Baixa | Alta |
| **Performance** | Rápida (local) | Rápida (indexada) |
| **Escalabilidade** | Limitada | Alta |

---

## 5. Migração LocalStorage → PostgreSQL

### 5.1 Estratégia de Migração

**Fase 1: Preparação**
1. Criar estrutura de banco PostgreSQL
2. Implementar API REST para CRUD
3. Manter LocalStorage funcionando

**Fase 2: Migração Gradual**
1. Implementar sincronização bidirecional
2. Usuário faz login → dados migram para servidor
3. Dados locais servem como cache

**Fase 3: Transição Completa**
1. LocalStorage vira apenas cache
2. Fonte de verdade é PostgreSQL
3. Sincronização automática

### 5.2 Script de Migração

```javascript
// Exemplo de migração de dados
async function migrateUserData(userId) {
  // 1. Ler dados do LocalStorage
  const localConsultations = JSON.parse(
    localStorage.getItem(`fipecheck_consultations_${userId}`)
  );
  
  const localFavorites = JSON.parse(
    localStorage.getItem(`fipecheck_favorites_${userId}`)
  );
  
  // 2. Enviar para API
  await Promise.all([
    api.post('/consultations/bulk', { consultations: localConsultations }),
    api.post('/favorites/bulk', { favorites: localFavorites })
  ]);
  
  // 3. Limpar LocalStorage (opcional)
  // localStorage.removeItem(`fipecheck_consultations_${userId}`);
  // localStorage.removeItem(`fipecheck_favorites_${userId}`);
}
```

---

## 6. Queries Importantes (PostgreSQL)

### 6.1 Estatísticas do Usuário

```sql
-- Dashboard do usuário
SELECT 
  COUNT(DISTINCT c.id) as total_consultations,
  COUNT(DISTINCT f.id) as total_favorites,
  COUNT(DISTINCT pa.id) as active_alerts,
  MAX(c.consulted_at) as last_consultation
FROM users u
LEFT JOIN consultations c ON u.id = c.user_id
LEFT JOIN favorites f ON u.id = f.user_id
LEFT JOIN price_alerts pa ON u.id = pa.user_id AND pa.is_active = true
WHERE u.id = $1;
```

### 6.2 Marcas Mais Consultadas

```sql
-- Top 10 marcas
SELECT 
  brand,
  COUNT(*) as consultation_count,
  AVG(fipe_price) as avg_price
FROM consultations
WHERE consulted_at >= NOW() - INTERVAL '30 days'
GROUP BY brand
ORDER BY consultation_count DESC
LIMIT 10;
```

### 6.3 Oportunidades de Mercado

```sql
-- Veículos com preços abaixo da Fipe
SELECT 
  mp.fipe_code,
  mp.year,
  mp.source,
  mp.price as market_price,
  c.fipe_price,
  ((mp.price - c.fipe_price) / c.fipe_price * 100) as variation_percent
FROM market_prices mp
JOIN consultations c ON mp.fipe_code = c.fipe_code AND mp.year = c.year
WHERE mp.price < c.fipe_price * 0.95
  AND mp.collected_at >= NOW() - INTERVAL '7 days'
ORDER BY variation_percent ASC
LIMIT 20;
```

### 6.4 Tendências de Preço

```sql
-- Evolução de preço de um veículo
SELECT 
  DATE_TRUNC('month', consulted_at) as month,
  AVG(fipe_price) as avg_fipe_price,
  COUNT(*) as consultation_count
FROM consultations
WHERE fipe_code = $1
  AND year = $2
  AND consulted_at >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month DESC;
```

---

## 7. Índices e Performance

### 7.1 Índices Críticos

```sql
-- Consultas por usuário (muito frequente)
CREATE INDEX idx_consultations_user_date 
ON consultations(user_id, consulted_at DESC);

-- Busca por veículo
CREATE INDEX idx_consultations_vehicle 
ON consultations(brand, model, year);

-- Preços de mercado por veículo
CREATE INDEX idx_market_prices_vehicle_date 
ON market_prices(fipe_code, year, collected_at DESC);

-- Alertas ativos
CREATE INDEX idx_alerts_active_user 
ON price_alerts(is_active, user_id) 
WHERE is_active = true;
```

### 7.2 Particionamento (Futuro)

```sql
-- Particionar consultations por data (quando > 10M registros)
CREATE TABLE consultations_2026_q1 
PARTITION OF consultations
FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');

CREATE TABLE consultations_2026_q2 
PARTITION OF consultations
FOR VALUES FROM ('2026-04-01') TO ('2026-07-01');
```

---

## 8. Backup e Recuperação

### 8.1 Estratégia de Backup

**Backup Diário:**
```bash
# Backup completo
pg_dump -U postgres -d fipecheck > backup_$(date +%Y%m%d).sql

# Backup comprimido
pg_dump -U postgres -d fipecheck | gzip > backup_$(date +%Y%m%d).sql.gz
```

**Backup Incremental:**
- WAL (Write-Ahead Logging) habilitado
- Replicação para servidor secundário
- Retenção: 30 dias

### 8.2 Recuperação

```bash
# Restaurar backup
psql -U postgres -d fipecheck < backup_20260213.sql

# Restaurar comprimido
gunzip -c backup_20260213.sql.gz | psql -U postgres -d fipecheck
```

---

## 9. Segurança de Dados

### 9.1 Criptografia

**Em Trânsito:**
- HTTPS/TLS 1.3
- Certificado SSL válido

**Em Repouso:**
- PostgreSQL com criptografia de disco
- Senhas com bcrypt (cost factor 10)
- Dados sensíveis com AES-256

### 9.2 Controle de Acesso

```sql
-- Roles do banco
CREATE ROLE fipecheck_app WITH LOGIN PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO fipecheck_app;

CREATE ROLE fipecheck_readonly WITH LOGIN PASSWORD 'readonly_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO fipecheck_readonly;
```

---

## 10. Monitoramento

### 10.1 Métricas Importantes

- Tamanho do banco de dados
- Número de consultas por segundo
- Tempo médio de resposta
- Conexões ativas
- Cache hit ratio
- Índices não utilizados

### 10.2 Queries de Monitoramento

```sql
-- Tamanho das tabelas
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Queries lentas
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 11. Resumo

### Implementação Atual (V2)
- **Tecnologia:** LocalStorage
- **Entidades:** 4 (users, currentUser, consultations, favorites)
- **Capacidade:** ~5-10 MB por usuário
- **Persistência:** Local (navegador)

### Implementação Futura (V3)
- **Tecnologia:** PostgreSQL 14+
- **Tabelas:** 8 (users, consultations, favorites, market_prices, price_alerts, market_analysis, audit_logs, system_cache)
- **Capacidade:** Ilimitada
- **Persistência:** Servidor centralizado
- **Backup:** Automático diário
- **Escalabilidade:** Horizontal (replicação)

### Migração
- **Estratégia:** Gradual com sincronização
- **Compatibilidade:** Mantida durante transição
- **Risco:** Baixo (dados locais preservados)
