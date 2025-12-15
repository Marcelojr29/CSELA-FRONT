# Sistema de Autenticação JWT

## Como funciona

A API agora possui um sistema completo de autenticação baseado em JWT (JSON Web Tokens). Todos os endpoints protegidos requerem um token válido no header `Authorization`.

## Endpoints de Autenticação

### POST /api/auth/login

Endpoint para fazer login e obter o token de acesso.

**Request Body:**
```json
{
  "email": "usuario@exemplo.com",
  "senha": "suaSenha123"
}
```

**Response (Sucesso - 200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "nome": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "perfil": {
      "id": "uuid-do-perfil",
      "nome": "Administrador",
      "permissoes": {
        "user_management": {
          "criar": true,
          "visualizar": true,
          "editar": true,
          "excluir": true
        },
        "operation": {
          "criar": true,
          "visualizar": true,
          "editar": true,
          "excluir": false
        },
        "reports_analytics": {
          "criar": false,
          "visualizar": true,
          "editar": false,
          "excluir": false
        },
        "advanced": {
          "criar": false,
          "visualizar": false,
          "editar": false,
          "excluir": false
        }
      }
    },
    "ultimoAcesso": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Erro - 401):**
```json
{
  "statusCode": 401,
  "message": "Credenciais inválidas",
  "error": "Unauthorized"
}
```

## Proteção de Rotas

### Usando o Token

Para acessar endpoints protegidos, inclua o token no header Authorization:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Endpoints Protegidos

**TODOS** os endpoints de CRUD de usuários e perfis agora estão protegidos por JWT:

**Usuários (requer token JWT):**
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar usuário
- `PATCH /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Excluir usuário
- `PATCH /api/users/:id/status` - Ativar/Desativar usuário
- `PATCH /api/users/:id/password` - Alterar senha

**Perfis (requer token JWT):**
- `GET /api/profiles` - Listar perfis
- `GET /api/profiles/:id` - Buscar perfil por ID
- `GET /api/profiles/permissions` - Buscar permissões disponíveis
- `POST /api/profiles` - Criar perfil
- `PATCH /api/profiles/:id` - Atualizar perfil
- `DELETE /api/profiles/:id` - Excluir perfil
- `PATCH /api/profiles/:id/status` - Ativar/Desativar perfil
- `PATCH /api/profiles/:id/permissions` - Atualizar permissões do perfil

**Autenticação (público):**
- `POST /api/auth/login` - Fazer login (não requer token)

## Configuração do Token

- **Expiração**: 24 horas
- **Algoritmo**: HS256
- **Secret**: Configurado via variável de ambiente `JWT_SECRET`

## Validações de Segurança

O sistema inclui as seguintes validações:

1. **Usuário existe**: Verifica se o email está cadastrado
2. **Senha correta**: Valida a senha usando bcrypt
3. **Usuário ativo**: Usuário deve estar com status ativo
4. **Perfil ativo**: O perfil associado ao usuário deve estar ativo
5. **Token válido**: Token deve ser válido e não expirado
6. **Usuário do token existe**: Usuário do token deve existir no banco
7. **Status atual**: Usuário e perfil devem estar ativos no momento da requisição

## Testando a Autenticação

1. **Faça login primeiro:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","senha":"suaSenha"}'
```

2. **Use o token retornado:**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Erros Comuns

### 401 Unauthorized
- Token não fornecido
- Token inválido ou expirado
- Usuário ou perfil inativo

### 403 Forbidden
- Token válido mas usuário sem permissão para a ação

### 500 Internal Server Error
- Erro de configuração do JWT_SECRET
- Problemas de conexão com banco de dados