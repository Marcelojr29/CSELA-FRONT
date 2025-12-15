# Testando a API com Autenticação

Este arquivo contém exemplos práticos de como testar a API com autenticação JWT.

## Pré-requisitos

1. Ter um perfil criado no banco de dados
2. Ter um usuário criado associado a esse perfil
3. Servidor rodando na porta 3000

## Fluxo de Testes

### 1. Primeiro, faça o login para obter o token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@exemplo.com",
    "senha": "senha123"
  }'
```

**Resposta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "nome": "Administrador",
    "email": "admin@exemplo.com",
    "perfil": {
      "id": "uuid-do-perfil",
      "nome": "Administrador",
      "permissoes": { ... }
    },
    "ultimoAcesso": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Copie o token e use nas próximas requisições

```bash
# Substitua SEU_TOKEN_AQUI pelo token retornado no login
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Testando endpoints de usuários

**Listar usuários:**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN"
```

**Buscar usuário por ID:**
```bash
curl -X GET http://localhost:3000/api/users/SEU_USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Criar novo usuário:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Novo Usuário",
    "email": "novo@exemplo.com",
    "senha": "senha123",
    "perfilId": "uuid-do-perfil"
  }'
```

**Atualizar usuário:**
```bash
curl -X PATCH http://localhost:3000/api/users/SEU_USER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Nome Atualizado"
  }'
```

**Alterar senha:**
```bash
curl -X PATCH http://localhost:3000/api/users/SEU_USER_ID/password \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "senhaAtual": "senhaAtual123",
    "novaSenha": "novaSenha456"
  }'
```

**Ativar/Desativar usuário:**
```bash
curl -X PATCH http://localhost:3000/api/users/SEU_USER_ID/status \
  -H "Authorization: Bearer $TOKEN"
```

**Excluir usuário:**
```bash
curl -X DELETE http://localhost:3000/api/users/SEU_USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Testando endpoints de perfis

**Listar perfis:**
```bash
curl -X GET http://localhost:3000/api/profiles \
  -H "Authorization: Bearer $TOKEN"
```

**Buscar permissões disponíveis:**
```bash
curl -X GET http://localhost:3000/api/profiles/permissions \
  -H "Authorization: Bearer $TOKEN"
```

**Criar novo perfil:**
```bash
curl -X POST http://localhost:3000/api/profiles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Operador",
    "descricao": "Perfil para operadores do sistema",
    "permissoes": {
      "user_management": {
        "criar": false,
        "visualizar": true,
        "editar": false,
        "excluir": false
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
  }'
```

**Atualizar perfil:**
```bash
curl -X PATCH http://localhost:3000/api/profiles/SEU_PROFILE_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Nome Atualizado",
    "descricao": "Descrição atualizada"
  }'
```

**Atualizar permissões do perfil:**
```bash
curl -X PATCH http://localhost:3000/api/profiles/SEU_PROFILE_ID/permissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Ativar/Desativar perfil:**
```bash
curl -X PATCH http://localhost:3000/api/profiles/SEU_PROFILE_ID/status \
  -H "Authorization: Bearer $TOKEN"
```

**Excluir perfil:**
```bash
curl -X DELETE http://localhost:3000/api/profiles/SEU_PROFILE_ID \
  -H "Authorization: Bearer $TOKEN"
```

## Testando Erros de Autenticação

### Sem token (deve retornar 401):
```bash
curl -X GET http://localhost:3000/api/users
```

### Token inválido (deve retornar 401):
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer token_invalido"
```

### Token expirado (deve retornar 401):
```bash
# Use um token que você sabe que já expirou
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN_EXPIRADO"
```

## Postman/Insomnia

Se preferir usar um cliente gráfico:

1. **Faça login** primeiro no endpoint `POST /api/auth/login`
2. **Copie o token** da resposta
3. **Configure Authorization** como "Bearer Token" nas próximas requisições
4. **Cole o token** no campo do Bearer Token

## Observações Importantes

- O token expira em 24 horas
- O usuário e perfil devem estar ativos para fazer login
- Todas as rotas de usuários e perfis agora requerem autenticação
- Apenas o endpoint de login é público