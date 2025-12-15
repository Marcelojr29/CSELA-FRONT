# API de Moradores

Esta API permite gerenciar o cadastro completo de moradores do condomínio, incluindo informações pessoais, endereço, situação de pagamento e estatísticas.

## Endpoints Disponíveis

### 🔒 Todos os endpoints requerem autenticação JWT

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

---

## 📝 Criar Morador

**POST** `/api/moradores`

Cria um novo morador no sistema.

### Request Body:
```json
{
  "nome": "João Silva Santos",
  "descricao": "Responsável pela residência",
  "rg": "12.345.678-9",
  "cpf": "123.456.789-00",
  "dataDeNascimento": "1985-03-15",
  "rua": "Rua das Flores",
  "numeroResidencia": "123A",
  "bairro": "Centro",
  "cep": "12345-678",
  "telefone": "(11) 99999-9999",
  "tipoResidencia": "Casa",
  "quantidadePessoas": 4,
  "status": "Adimplente",
  "dataUltimoPagamento": "2024-12-01"
}
```

### Campos Obrigatórios:
- `nome`: Nome completo (2-255 caracteres)
- `rg`: RG válido (formato: 12.345.678-9)
- `cpf`: CPF válido (formato: 123.456.789-00)
- `dataDeNascimento`: Data de nascimento (formato: YYYY-MM-DD)
- `rua`: Nome da rua (2-255 caracteres)
- `numeroResidencia`: Número da residência (1-20 caracteres)
- `bairro`: Nome do bairro (2-100 caracteres)
- `cep`: CEP válido (formato: 12345-678)
- `telefone`: Telefone válido (formato: (11) 99999-9999)
- `tipoResidencia`: Tipo de residência
- `quantidadePessoas`: Número de pessoas (1-50)

### Campos Opcionais:
- `descricao`: Descrição adicional (máximo 1000 caracteres)
- `status`: Status do morador ("Adimplente" ou "Inadimplente")
- `dataUltimoPagamento`: Data do último pagamento

### Campos Calculados Automaticamente:
- `tempoResidencia`: Calculado automaticamente em meses com base na data de cadastro (`criadoEm`)

### Tipos de Residência Válidos:
- `Casa`
- `Apartamento`
- `Kitnet`
- `Sobrado`
- `Comercial`
- `Outro`

### Status Válidos:
- `Adimplente`
- `Inadimplente`

### Response (201 Created):
```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva Santos",
  "descricao": "Responsável pela residência",
  "rg": "123456789",
  "cpf": "12345678900",
  "dataDeNascimento": "1985-03-15",
  "rua": "Rua das Flores",
  "numeroResidencia": "123A",
  "bairro": "Centro",
  "cep": "12345678",
  "telefone": "(11) 99999-9999",
  "tipoResidencia": "Casa",
  "quantidadePessoas": 4,
  "tempoResidencia": 36,
  "status": "Adimplente",
  "dataUltimoPagamento": "2024-12-01",
  "criadoEm": "2024-12-12T10:30:00.000Z",
  "atualizadoEm": "2024-12-12T10:30:00.000Z"
}
```

---

## 📋 Listar Moradores

**GET** `/api/moradores`

Lista todos os moradores com paginação e filtros opcionais.

### Query Parameters:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 10, máximo: 100)
- `search`: Busca por nome, CPF, RG ou telefone
- `status`: Filtrar por status ("Adimplente" ou "Inadimplente")
- `tipoResidencia`: Filtrar por tipo de residência
- `bairro`: Filtrar por bairro

### Exemplos:
```
GET /api/moradores?page=1&limit=20
GET /api/moradores?search=João Silva
GET /api/moradores?status=Inadimplente
GET /api/moradores?bairro=Centro&tipoResidencia=Apartamento
```

### Response (200 OK):
```json
{
  "data": [
    {
      "id": "uuid-do-morador",
      "nome": "João Silva Santos",
      "rg": "123456789",
      "cpf": "12345678900",
      "status": "Adimplente",
      // ... outros campos
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 10,
  "totalPages": 15
}
```

---

## 🔍 Buscar Morador por ID

**GET** `/api/moradores/:id`

Busca um morador específico pelo ID.

### Response (200 OK):
```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva Santos",
  "descricao": "Responsável pela residência",
  "rg": "123456789",
  "cpf": "12345678900",
  "dataDeNascimento": "1985-03-15",
  "rua": "Rua das Flores",
  "numeroResidencia": "123A",
  "bairro": "Centro",
  "cep": "12345678",
  "telefone": "(11) 99999-9999",
  "tipoResidencia": "Casa",
  "quantidadePessoas": 4,
  "tempoResidencia": 36,
  "status": "Adimplente",
  "dataUltimoPagamento": "2024-12-01",
  "criadoEm": "2024-12-12T10:30:00.000Z",
  "atualizadoEm": "2024-12-12T10:30:00.000Z"
}
```

---

## ✏️ Atualizar Morador

**PATCH** `/api/moradores/:id`

Atualiza informações de um morador existente.

### Request Body (todos os campos são opcionais):
```json
{
  "nome": "João Silva Santos Júnior",
  "telefone": "(11) 88888-8888",
  "quantidadePessoas": 5,
  "status": "Inadimplente"
}
```

### Response (200 OK):
```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva Santos Júnior",
  "telefone": "(11) 88888-8888",
  "quantidadePessoas": 5,
  "status": "Inadimplente",
  // ... outros campos
}
```

---

## 🏷️ Atualizar Status

**PATCH** `/api/moradores/:id/status`

Atualiza apenas o status de pagamento do morador.

### Request Body:
```json
{
  "status": "Adimplente"
}
```

### Response (200 OK):
```json
{
  "id": "uuid-do-morador",
  "status": "Adimplente",
  // ... outros campos
}
```

---

## 💰 Registrar Pagamento

**PATCH** `/api/moradores/:id/pagamento`

Registra uma data de pagamento. Automaticamente muda o status para "Adimplente" se estava inadimplente.

### Request Body:
```json
{
  "dataPagamento": "2024-12-12"
}
```

### Response (200 OK):
```json
{
  "id": "uuid-do-morador",
  "status": "Adimplente",
  "dataUltimoPagamento": "2024-12-12",
  // ... outros campos
}
```

---

## 🗑️ Excluir Morador

**DELETE** `/api/moradores/:id`

Remove um morador do sistema.

### Response (204 No Content):
Sem conteúdo na resposta.

---

## 🔍 Buscar por CPF

**GET** `/api/moradores/search/cpf/:cpf`

Busca um morador pelo CPF.

### Exemplo:
```
GET /api/moradores/search/cpf/123.456.789-00
GET /api/moradores/search/cpf/12345678900
```

### Response (200 OK):
```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva Santos",
  "cpf": "12345678900",
  // ... outros campos
}
```

---

## 🔍 Buscar por RG

**GET** `/api/moradores/search/rg/:rg`

Busca um morador pelo RG.

### Exemplo:
```
GET /api/moradores/search/rg/12.345.678-9
GET /api/moradores/search/rg/123456789
```

### Response (200 OK):
```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva Santos",
  "rg": "123456789",
  // ... outros campos
}
```

---

## 📊 Estatísticas

**GET** `/api/moradores/statistics`

Retorna estatísticas gerais dos moradores.

### Response (200 OK):
```json
{
  "total": 150,
  "adimplentes": 120,
  "inadimplentes": 30,
  "percentualAdimplencia": "80.00",
  "tiposResidencia": [
    {
      "tipo": "Apartamento",
      "quantidade": "80"
    },
    {
      "tipo": "Casa",
      "quantidade": "70"
    }
  ],
  "topBairros": [
    {
      "bairro": "Centro",
      "quantidade": "45"
    },
    {
      "bairro": "Vila Nova",
      "quantidade": "35"
    }
  ]
}
```

---

## ❌ Códigos de Erro

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "CPF inválido",
    "Data de nascimento não pode ser futura"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Morador com ID \"uuid\" não encontrado",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Morador com CPF \"12345678900\" já existe",
  "error": "Conflict"
}
```

---

## 📋 Validações Automáticas

### CPF
- Formato válido (11 dígitos)
- Algoritmo de validação dos dígitos verificadores
- Não aceita sequências iguais (111.111.111-11)

### RG
- Formato válido com dígitos e letra X opcional
- Único no sistema

### Data de Nascimento
- Não pode ser futura
- Idade deve estar entre 0 e 150 anos

### Telefone
- Formatos aceitos: (11) 99999-9999, 11 99999-9999, 1199999-9999

### CEP
- Formato: 12345-678 ou 12345678
- 8 dígitos obrigatórios

---

## 🚀 Exemplos de Uso

### Criar um morador completo:
```bash
curl -X POST http://localhost:3000/api/moradores \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "rg": "98.765.432-1",
    "cpf": "987.654.321-00",
    "dataDeNascimento": "1990-05-20",
    "rua": "Avenida Principal",
    "numeroResidencia": "456",
    "bairro": "Vila Nova",
    "cep": "54321-876",
    "telefone": "(11) 88888-7777",
    "tipoResidencia": "Apartamento",
    "quantidadePessoas": 3
  }'
```

### Buscar moradores inadimplentes:
```bash
curl -X GET "http://localhost:3000/api/moradores?status=Inadimplente" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Registrar pagamento:
```bash
curl -X PATCH http://localhost:3000/api/moradores/SEU_ID/pagamento \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dataPagamento": "2024-12-12"
  }'
```