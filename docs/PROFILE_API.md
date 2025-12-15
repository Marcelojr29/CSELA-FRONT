# API de Perfis de Usuário - CSELA

## Visão Geral

A API de Perfis permite gerenciar perfis de usuários no sistema CSELA, incluindo suas permissões estruturadas em módulos específicos.

## Estrutura de Permissões

O sistema de permissões é dividido em 4 módulos principais:

### 1. Módulo de Gestão de Usuário (`user_management`)
- `cadastro_usuario` - Cadastro de Usuário
- `cadastro_perfil` - Cadastro de Perfil

### 2. Módulo de Operação (`operation`)
- `cadastro_moradores` - Cadastro de Moradores
- `registrar_pagamentos` - Registrar Pagamentos
- `gerenciar_pontos` - Gerenciar Pontos

### 3. Módulo de Relatórios e Análises (`reports_analytics`)
- `visualizar_dashboards` - Visualizar Dashboards
- `exportar_relatorios` - Exportar Relatórios

### 4. Módulo Avançado (`advanced`)
- `acesso_financas` - Acesso a Finanças
- `acesso_administracao` - Acesso à Administração

## Endpoints da API

### Base URL
```
/api/profiles
```

### 1. Criar Perfil
```http
POST /api/profiles
Content-Type: application/json

{
  "nome": "Administrador Geral",
  "status": true,
  "permissoes": {
    "user_management": {
      "name": "user_management",
      "permissions": ["cadastro_usuario", "cadastro_perfil"]
    },
    "operation": {
      "name": "operation",
      "permissions": ["cadastro_moradores", "registrar_pagamentos", "gerenciar_pontos"]
    },
    "reports_analytics": {
      "name": "reports_analytics",
      "permissions": ["visualizar_dashboards", "exportar_relatorios"]
    },
    "advanced": {
      "name": "advanced",
      "permissions": ["acesso_financas", "acesso_administracao"]
    }
  }
}
```

**Resposta (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Administrador Geral",
  "status": true,
  "permissoes": {
    "user_management": {
      "name": "user_management",
      "permissions": ["cadastro_usuario", "cadastro_perfil"]
    },
    "operation": {
      "name": "operation",
      "permissions": ["cadastro_moradores", "registrar_pagamentos", "gerenciar_pontos"]
    },
    "reports_analytics": {
      "name": "reports_analytics",
      "permissions": ["visualizar_dashboards", "exportar_relatorios"]
    },
    "advanced": {
      "name": "advanced",
      "permissions": ["acesso_financas", "acesso_administracao"]
    }
  },
  "createdAt": "2023-10-14T19:35:38.000Z",
  "updatedAt": "2023-10-14T19:35:38.000Z"
}
```

### 2. Listar Perfis (com paginação e filtros)
```http
GET /api/profiles?page=1&limit=10&nome=admin&status=true&sort=nome&order=ASC
```

**Parâmetros de Query:**
- `page` (opcional): Página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `nome` (opcional): Filtro por nome (busca parcial)
- `status` (opcional): Filtro por status (true/false)
- `sort` (opcional): Campo para ordenação (padrão: nome)
- `order` (opcional): Direção da ordenação ASC/DESC (padrão: ASC)

**Resposta (200 OK):**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "nome": "Administrador Geral",
      "status": true,
      "permissoes": { /* ... */ },
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

### 3. Buscar Perfil por ID
```http
GET /api/profiles/{id}
```

**Resposta (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Administrador Geral",
  "status": true,
  "permissoes": { /* estrutura completa */ },
  "createdAt": "2023-10-14T19:35:38.000Z",
  "updatedAt": "2023-10-14T19:35:38.000Z"
}
```

### 4. Atualizar Perfil
```http
PATCH /api/profiles/{id}
Content-Type: application/json

{
  "nome": "Administrador Atualizado",
  "status": false,
  "permissoes": {
    "user_management": {
      "name": "user_management",
      "permissions": ["cadastro_perfil"]
    },
    "operation": {
      "name": "operation",
      "permissions": []
    },
    "reports_analytics": {
      "name": "reports_analytics",
      "permissions": ["visualizar_dashboards"]
    },
    "advanced": {
      "name": "advanced",
      "permissions": []
    }
  }
}
```

### 5. Alternar Status do Perfil
```http
PATCH /api/profiles/{id}/status
```

**Resposta (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Administrador Geral",
  "status": false
  /* ... */
}
```

### 6. Atualizar Apenas Permissões
```http
PATCH /api/profiles/{id}/permissions
Content-Type: application/json

{
  "user_management": {
    "name": "user_management",
    "permissions": ["cadastro_usuario"]
  },
  "operation": {
    "name": "operation",
    "permissions": ["cadastro_moradores", "registrar_pagamentos"]
  },
  "reports_analytics": {
    "name": "reports_analytics",
    "permissions": []
  },
  "advanced": {
    "name": "advanced",
    "permissions": []
  }
}
```

### 7. Excluir Perfil
```http
DELETE /api/profiles/{id}
```

**Resposta (204 No Content)**

### 8. Listar Permissões Disponíveis
```http
GET /api/profiles/permissions
```

**Resposta (200 OK):**
```json
{
  "modules": [
    {
      "name": "user_management",
      "label": "Módulo de Gestão de Usuário",
      "permissions": [
        {
          "key": "CADASTRO_USUARIO",
          "value": "cadastro_usuario",
          "label": "Cadastro Usuario"
        },
        {
          "key": "CADASTRO_PERFIL",
          "value": "cadastro_perfil",
          "label": "Cadastro Perfil"
        }
      ]
    }
    /* ... outros módulos */
  ]
}
```

## Exemplos de Uso

### Criar Perfil Básico (Operador)
```bash
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Operador",
    "status": true,
    "permissoes": {
      "user_management": {
        "name": "user_management",
        "permissions": []
      },
      "operation": {
        "name": "operation",
        "permissions": ["cadastro_moradores", "registrar_pagamentos"]
      },
      "reports_analytics": {
        "name": "reports_analytics",
        "permissions": ["visualizar_dashboards"]
      },
      "advanced": {
        "name": "advanced",
        "permissions": []
      }
    }
  }'
```

### Criar Perfil de Supervisor
```bash
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Supervisor",
    "status": true,
    "permissoes": {
      "user_management": {
        "name": "user_management",
        "permissions": ["cadastro_usuario"]
      },
      "operation": {
        "name": "operation",
        "permissions": ["cadastro_moradores", "registrar_pagamentos", "gerenciar_pontos"]
      },
      "reports_analytics": {
        "name": "reports_analytics",
        "permissions": ["visualizar_dashboards", "exportar_relatorios"]
      },
      "advanced": {
        "name": "advanced",
        "permissions": []
      }
    }
  }'
```

### Buscar Perfis Ativos
```bash
curl "http://localhost:3000/api/profiles?status=true&page=1&limit=5"
```

### Desativar um Perfil
```bash
curl -X PATCH "http://localhost:3000/api/profiles/{id}/status"
```

## Códigos de Erro

- `400 Bad Request` - Dados inválidos na requisição
- `404 Not Found` - Perfil não encontrado
- `409 Conflict` - Nome do perfil já existe
- `422 Unprocessable Entity` - Erro de validação nos dados

## Validações

### Nome do Perfil
- Obrigatório
- Único no sistema
- String não vazia

### Status
- Boolean (true/false)
- Padrão: true

### Permissões
- Estrutura JSON válida
- Módulos devem ter nomes corretos
- Permissões devem existir no módulo correspondente
- Se não fornecidas, permissões vazias são criadas automaticamente