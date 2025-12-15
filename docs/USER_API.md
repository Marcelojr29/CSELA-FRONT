# API de Usuários - CSELA

## Visão Geral

A API de Usuários permite gerenciar usuários no sistema CSELA, incluindo autenticação, associação com perfis e controle de acesso.

## Estrutura do Usuário

- `id` (UUID) - Identificador único
- `nome` (string) - Nome completo do usuário
- `email` (string) - Email único para login
- `senha` (string) - Senha hasheada (bcrypt)
- `perfil` (objeto) - Perfil associado com permissões
- `perfilId` (UUID) - ID do perfil (chave estrangeira)
- `status` (boolean) - Status ativo/inativo
- `ultimoAcesso` (datetime) - Data/hora do último acesso
- `createdAt` (datetime) - Data de criação
- `updatedAt` (datetime) - Data de atualização

## Endpoints da API

### Base URL
```
/api/users
```

### 1. Criar Usuário
```http
POST /api/users
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "senha123",
  "perfilId": "123e4567-e89b-12d3-a456-426614174000",
  "status": true
}
```

**Resposta (201 Created):**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "status": true,
  "ultimoAcesso": null,
  "perfilId": "123e4567-e89b-12d3-a456-426614174000",
  "perfil": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Administrador",
    "status": true
  },
  "createdAt": "2023-10-14T19:35:38.000Z",
  "updatedAt": "2023-10-14T19:35:38.000Z"
}
```

### 2. Listar Usuários (com paginação e filtros)
```http
GET /api/users?page=1&limit=10&nome=joão&email=joao&status=true&perfilId=123e4567-e89b-12d3-a456-426614174000
```

**Parâmetros de Query:**
- `page` (opcional): Página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `nome` (opcional): Filtro por nome (busca parcial)
- `email` (opcional): Filtro por email (busca parcial)
- `status` (opcional): Filtro por status (true/false)
- `perfilId` (opcional): Filtro por perfil
- `sort` (opcional): Campo para ordenação (padrão: nome)
- `order` (opcional): Direção da ordenação ASC/DESC (padrão: ASC)

**Resposta (200 OK):**
```json
{
  "data": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "nome": "João Silva",
      "email": "joao.silva@email.com",
      "status": true,
      "ultimoAcesso": "2023-10-14T19:35:38.000Z",
      "perfilId": "123e4567-e89b-12d3-a456-426614174000",
      "perfil": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "nome": "Administrador",
        "status": true
      },
      "createdAt": "2023-10-14T19:35:38.000Z",
      "updatedAt": "2023-10-14T19:35:38.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### 3. Buscar Usuário por ID
```http
GET /api/users/{id}
```

**Resposta (200 OK):**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "status": true,
  "ultimoAcesso": "2023-10-14T19:35:38.000Z",
  "perfilId": "123e4567-e89b-12d3-a456-426614174000",
  "perfil": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Administrador",
    "status": true,
    "permissoes": { /* estrutura completa de permissões */ }
  },
  "createdAt": "2023-10-14T19:35:38.000Z",
  "updatedAt": "2023-10-14T19:35:38.000Z"
}
```

### 4. Atualizar Usuário
```http
PATCH /api/users/{id}
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "email": "joao.santos@email.com",
  "perfilId": "789e0123-e89b-12d3-a456-426614174002",
  "status": false
}
```

### 5. Alternar Status do Usuário
```http
PATCH /api/users/{id}/status
```

**Resposta (200 OK):**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "status": false,
  /* ... */
}
```

### 6. Alterar Senha
```http
PATCH /api/users/{id}/password
Content-Type: application/json

{
  "senhaAtual": "senha123",
  "novaSenha": "novaSenha456"
}
```

### 7. Validar Usuário (Login)
```http
POST /api/users/validate
Content-Type: application/json

{
  "email": "joao.silva@email.com",
  "senha": "senha123"
}
```

**Resposta (200 OK) - Sucesso:**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "status": true,
  "ultimoAcesso": "2023-10-14T19:35:38.000Z",
  "perfilId": "123e4567-e89b-12d3-a456-426614174000",
  "perfil": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Administrador",
    "status": true,
    "permissoes": { /* permissões completas */ }
  }
}
```

**Resposta (200 OK) - Falha:**
```json
null
```

### 8. Excluir Usuário
```http
DELETE /api/users/{id}
```

**Resposta (204 No Content)**

## Funcionalidades Especiais

### Hash de Senha
- Senhas são hasheadas usando bcrypt com salt rounds = 10
- Nunca retorna a senha nos endpoints de consulta
- Validação de senha mínima de 6 caracteres

### Último Acesso
- Campo `ultimoAcesso` é atualizado automaticamente na validação do usuário
- Útil para auditoria e controle de sessão

### Validações de Perfil
- Verifica se o perfil existe antes de criar/atualizar usuário
- Verifica se o perfil está ativo
- Não permite atribuir perfil inativo

### Segurança
- Email deve ser único no sistema
- Senha atual obrigatória para alterar senha
- Validação de usuário e perfil ativos no login

## Exemplos de Uso

### Criar Usuário Administrador
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Admin Geral",
    "email": "admin@csela.com",
    "senha": "admin123456",
    "perfilId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Criar Usuário Operador
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Operador Sistema",
    "email": "operador@csela.com",
    "senha": "operador123",
    "perfilId": "789e0123-e89b-12d3-a456-426614174002",
    "status": true
  }'
```

### Buscar Usuários por Perfil
```bash
curl "http://localhost:3000/api/users?perfilId=123e4567-e89b-12d3-a456-426614174000&status=true"
```

### Login/Validação
```bash
curl -X POST http://localhost:3000/api/users/validate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@csela.com",
    "senha": "admin123456"
  }'
```

### Alterar Senha
```bash
curl -X PATCH http://localhost:3000/api/users/{id}/password \
  -H "Content-Type: application/json" \
  -d '{
    "senhaAtual": "admin123456",
    "novaSenha": "novasenha789"
  }'
```

## Códigos de Erro

- `400 Bad Request` - Dados inválidos na requisição
- `401 Unauthorized` - Senha incorreta ou usuário/perfil inativo
- `404 Not Found` - Usuário ou perfil não encontrado
- `409 Conflict` - Email já existe

## Validações

### Nome
- Obrigatório
- String não vazia

### Email
- Obrigatório
- Formato de email válido
- Único no sistema

### Senha
- Obrigatório na criação
- Mínimo 6 caracteres
- Hasheada automaticamente

### Perfil
- ID do perfil obrigatório
- Perfil deve existir
- Perfil deve estar ativo

### Status
- Boolean (true/false)
- Padrão: true