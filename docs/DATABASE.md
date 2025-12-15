# Database Configuration

## PostgreSQL Setup

Este projeto utiliza PostgreSQL como banco de dados principal. A configuração pode ser feita de diferentes formas dependendo do seu ambiente.

## Opções de Configuração

### 1. Docker (Recomendado)

O projeto inclui uma configuração Docker Compose completa:

```bash
# Apenas o banco PostgreSQL
docker compose up postgres -d

# Aplicação completa (API + PostgreSQL)
docker compose up -d
```

**Configurações do Container:**
- **Image:** postgres:15-alpine
- **Container:** csela-postgres
- **Port:** 5432:5432
- **Database:** csela
- **User:** csela_user
- **Password:** csela_password
- **Volume:** postgres_data (persistente)

### 2. PostgreSQL Local

#### Windows
```bash
# Instalar PostgreSQL
winget install PostgreSQL.PostgreSQL

# Ou baixar do site oficial: https://www.postgresql.org/download/windows/

# Criar banco de dados
createdb -U postgres csela

# Criar usuário
psql -U postgres -c "CREATE USER csela_user WITH PASSWORD 'csela_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE csela TO csela_user;"
```

#### macOS
```bash
# Com Homebrew
brew install postgresql
brew services start postgresql

# Criar banco
createdb csela
```

#### Linux (Ubuntu/Debian)
```bash
# Instalar PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Configurar usuário e banco
sudo -u postgres createdb csela
sudo -u postgres psql -c "CREATE USER csela_user WITH PASSWORD 'csela_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE csela TO csela_user;"
```

### 3. PostgreSQL Cloud

#### Supabase
1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Obtenha a string de conexão na aba Settings > Database
4. Configure no arquivo `.env`:

```env
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

#### Railway
1. Crie uma conta em [railway.app](https://railway.app)
2. Adicione um serviço PostgreSQL
3. Obtenha as credenciais
4. Configure no arquivo `.env`

#### Heroku Postgres
1. Adicione o addon Heroku Postgres
2. Obtenha a DATABASE_URL
3. Configure no arquivo `.env`

## Configuração de Ambiente

### Arquivo .env

Copie o arquivo `.env.example` para `.env` e configure:

```env
# Database PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=csela_user
DATABASE_PASSWORD=csela_password
DATABASE_NAME=csela
DATABASE_URL=postgresql://csela_user:csela_password@localhost:5432/csela
```

### Para ambiente de produção:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
```

## TypeORM Configuration

O projeto usa TypeORM como ORM. As principais configurações estão em:

- `src/config/database.config.ts` - Configuração principal
- `data-source.ts` - DataSource para migrations
- `src/entities/` - Entidades do banco

### Comandos Úteis

```bash
# Gerar migration
npm run migration:generate -- src/migrations/CreateUserTable

# Executar migrations
npm run migration:run

# Reverter migration
npm run migration:revert

# Sincronizar schema (apenas desenvolvimento)
npm run schema:sync
```

## Estrutura Inicial

O arquivo `init.sql` contém a estrutura inicial do banco:

- Extensões UUID e pgcrypto
- Função para atualizar timestamps automaticamente
- Comentários sobre o banco

## Monitoramento

### Health Check

A aplicação possui um endpoint para verificar a saúde do banco:

```bash
GET /api/database
```

Retorna:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2023-10-14T19:35:38.000Z",
  "type": "postgres",
  "database_name": "csela"
}
```

### Logs do PostgreSQL

```bash
# Via Docker Compose
npm run db:logs

# Ou
docker compose logs postgres -f
```

## Backup e Restore

### Backup
```bash
# Docker
docker exec csela-postgres pg_dump -U csela_user csela > backup.sql

# Local
pg_dump -U csela_user -h localhost csela > backup.sql
```

### Restore
```bash
# Docker
docker exec -i csela-postgres psql -U csela_user csela < backup.sql

# Local
psql -U csela_user -h localhost csela < backup.sql
```

## Troubleshooting

### Connection Refused
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão: `psql -U csela_user -h localhost csela`

### Permission Denied
- Verifique as permissões do usuário
- Confirme se o usuário tem acesso ao banco

### Docker Issues
- Verifique se o Docker está rodando
- Confirme se as portas não estão em uso
- Recrie os containers: `docker compose down && docker compose up -d`