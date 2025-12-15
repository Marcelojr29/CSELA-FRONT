# API de Pagamentos

Esta API permite gerenciar os pagamentos dos moradores, incluindo carnê digital, histórico de pagamentos e controle de inadimplência.

## Endpoints Disponíveis

### 🔒 Todos os endpoints requerem autenticação JWT

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Base URL para pagamentos de um morador:**
```
/api/moradores/:moradorId/pagamentos
```

---

## 📅 Carnê Digital

**GET** `/api/moradores/:moradorId/pagamentos/carne-digital?ano=2024`

Retorna o carnê digital do morador com todos os meses do ano e status de pagamento.

### Query Parameters:
- `ano`: Ano para gerar o carnê (opcional, padrão: ano atual)

### Response (200 OK):
```json
{
  \"morador\": {
    \"nome\": \"João Silva Santos\",
    \"cpf\": \"123.456.789-00\",
    \"rua\": \"Rua das Flores\",
    \"numeroResidencia\": \"123A\"
  },
  \"ano\": 2024,
  \"meses\": [
    {
      \"mes\": 1,
      \"nomeCompleto\": \"Janeiro\",
      \"status\": \"Pago\",
      \"dataPagamento\": \"2024-01-15T00:00:00.000Z\",
      \"valor\": 150.00
    },
    {
      \"mes\": 2,
      \"nomeCompleto\": \"Fevereiro\",
      \"status\": \"Pago\",
      \"dataPagamento\": \"2024-02-10T00:00:00.000Z\",
      \"valor\": 150.00
    },
    {
      \"mes\": 3,
      \"nomeCompleto\": \"Março\",
      \"status\": \"Atrasado\",
      \"dataPagamento\": null,
      \"valor\": null
    },
    {
      \"mes\": 4,
      \"nomeCompleto\": \"Abril\",
      \"status\": \"Pendente\",
      \"dataPagamento\": null,
      \"valor\": null
    }
  ]
}
```

### Status dos Meses:
- **Pago**: Pagamento registrado
- **Atrasado**: Mês já passou e não foi pago
- **Pendente**: Mês atual ou futuro, ainda não vencido

---

## 📋 Histórico de Pagamentos

**GET** `/api/moradores/:moradorId/pagamentos/historico`

Retorna o histórico completo de pagamentos do morador ordenado por data (mais recentes primeiro).

### Response (200 OK):
```json
[
  {
    \"id\": \"uuid-pagamento-1\",
    \"mes\": 2,
    \"ano\": 2024,
    \"mesAno\": \"Fevereiro/2024\",
    \"valor\": 150.00,
    \"dataPagamento\": \"2024-02-10T00:00:00.000Z\",
    \"metodo\": \"Pix\",
    \"comprovante\": \"comprovante-pix-fev2024.jpg\",
    \"observacao\": \"Pagamento em dia\",
    \"status\": \"Pago\",
    \"criadoEm\": \"2024-02-01T10:00:00.000Z\"
  },
  {
    \"id\": \"uuid-pagamento-2\",
    \"mes\": 1,
    \"ano\": 2024,
    \"mesAno\": \"Janeiro/2024\",
    \"valor\": 150.00,
    \"dataPagamento\": \"2024-01-15T00:00:00.000Z\",
    \"metodo\": \"Dinheiro\",
    \"comprovante\": null,
    \"status\": \"Pago\",
    \"criadoEm\": \"2024-01-01T10:00:00.000Z\"
  }
]
```

### Campos do Histórico:
- `mesAno`: Nome do mês + ano formatado
- `valor`: Valor pago
- `dataPagamento`: Data em que foi efetuado o pagamento
- `metodo`: \"Dinheiro\" ou \"Pix\"
- `comprovante`: URL/caminho do comprovante (opcional)
- `status`: \"Pago\", \"Pendente\" ou \"Atrasado\"

---

## 💰 Registrar Pagamento

**POST** `/api/moradores/:moradorId/pagamentos/registrar`

Registra um pagamento para um mês específico. Se o pagamento já existir, atualiza os dados.

### Request Body:
```json
{
  \"mesAno\": \"03/2024\",
  \"valor\": 150.00,
  \"dataPagamento\": \"2024-03-15\",
  \"metodo\": \"Pix\",
  \"comprovante\": \"base64_da_imagem_ou_url_do_arquivo\",
  \"observacao\": \"Pagamento referente à taxa de condomínio\"
}
```

### Campos Obrigatórios:
- `mesAno`: Mês e ano no formato MM/AAAA (ex: \"03/2024\")
- `valor`: Valor pago (decimal com 2 casas)
- `dataPagamento`: Data do pagamento (formato: YYYY-MM-DD)
- `metodo`: \"Dinheiro\" ou \"Pix\"

### Campos Opcionais:
- `comprovante`: Base64 da imagem/PDF ou URL do arquivo de comprovante
- `observacao`: Observações sobre o pagamento (máximo 500 caracteres)

### Response (200 OK):
```json
{
  \"id\": \"uuid-pagamento\",
  \"moradorId\": \"uuid-morador\",
  \"mes\": 3,
  \"ano\": 2024,
  \"valor\": 150.00,
  \"dataPagamento\": \"2024-03-15T00:00:00.000Z\",
  \"metodo\": \"Pix\",
  \"comprovante\": \"base64_da_imagem_ou_url_do_arquivo\",
  \"observacao\": \"Pagamento referente à taxa de condomínio\",
  \"status\": \"Pago\",
  \"criadoEm\": \"2024-03-15T10:30:00.000Z\",
  \"atualizadoEm\": \"2024-03-15T10:30:00.000Z\"
}
```

**Efeitos do Registro:**
1. Status do pagamento fica \"Pago\"
2. `dataUltimoPagamento` do morador é atualizada
3. Status do morador fica \"Adimplente\"

---

## 🏗️ Inicializar Pagamentos do Ano

**POST** `/api/moradores/:moradorId/pagamentos/inicializar/:ano`

Cria registros de pagamento para todos os 12 meses do ano especificado com status \"Pendente\".

### URL Example:
```
POST /api/moradores/uuid-morador/pagamentos/inicializar/2024
```

### Request Body:
```json
{
  \"valorMensal\": 150.00
}
```

### Response (201 Created):
```json
[
  {
    \"id\": \"uuid-jan\",
    \"moradorId\": \"uuid-morador\",
    \"mes\": 1,
    \"ano\": 2024,
    \"valor\": 150.00,
    \"status\": \"Pendente\"
  },
  {
    \"id\": \"uuid-fev\",
    \"moradorId\": \"uuid-morador\",
    \"mes\": 2,
    \"ano\": 2024,
    \"valor\": 150.00,
    \"status\": \"Pendente\"
  }
  // ... todos os 12 meses
]
```

**Nota**: Só cria registros para meses que ainda não existem.

---

## 📝 Listar Pagamentos com Filtros

**GET** `/api/moradores/:moradorId/pagamentos?ano=2024&status=Pago`

Lista os pagamentos do morador com filtros opcionais.

### Query Parameters:
- `ano`: Filtrar por ano
- `mes`: Filtrar por mês (1-12)
- `status`: \"Pago\", \"Pendente\" ou \"Atrasado\"
- `metodo`: \"Dinheiro\" ou \"Pix\"

### Response (200 OK):
```json
[
  {
    \"id\": \"uuid-pagamento\",
    \"moradorId\": \"uuid-morador\",
    \"morador\": {
      \"id\": \"uuid-morador\",
      \"nome\": \"João Silva Santos\"
    },
    \"mes\": 3,
    \"ano\": 2024,
    \"valor\": 150.00,
    \"dataPagamento\": \"2024-03-15T00:00:00.000Z\",
    \"metodo\": \"Pix\",
    \"status\": \"Pago\"
  }
]
```

---

## ✏️ Atualizar Pagamento

**PATCH** `/api/moradores/:moradorId/pagamentos/:id`

Atualiza dados de um pagamento específico.

### Request Body (todos os campos são opcionais):
```json
{
  \"valor\": 155.00,
  \"dataPagamento\": \"2024-03-20\",
  \"metodo\": \"Dinheiro\",
  \"comprovante\": \"novo-comprovante.jpg\",
  \"status\": \"Pago\"
}
```

### Response (200 OK):
```json
{
  \"id\": \"uuid-pagamento\",
  \"valor\": 155.00,
  \"dataPagamento\": \"2024-03-20T00:00:00.000Z\",
  \"metodo\": \"Dinheiro\"
  // ... outros campos atualizados
}
```

---

## 🗑️ Excluir Pagamento

**DELETE** `/api/moradores/:moradorId/pagamentos/:id`

Remove um pagamento específico.

### Response (204 No Content):
Sem conteúdo na resposta.

---

## 🔍 Buscar Pagamento Específico

**GET** `/api/moradores/:moradorId/pagamentos/:id`

Busca um pagamento específico pelo ID.

### Response (200 OK):
```json
{
  \"id\": \"uuid-pagamento\",
  \"moradorId\": \"uuid-morador\",
  \"morador\": {
    \"id\": \"uuid-morador\",
    \"nome\": \"João Silva Santos\",
    \"cpf\": \"12345678900\"
  },
  \"mes\": 3,
  \"ano\": 2024,
  \"valor\": 150.00,
  \"dataPagamento\": \"2024-03-15T00:00:00.000Z\",
  \"metodo\": \"Pix\",
  \"comprovante\": \"comprovante.jpg\",
  \"status\": \"Pago\",
  \"criadoEm\": \"2024-03-01T00:00:00.000Z\",
  \"atualizadoEm\": \"2024-03-15T10:30:00.000Z\"
}
```

---

## ❌ Códigos de Erro

### 400 Bad Request
```json
{
  \"statusCode\": 400,
  \"message\": [
    \"Valor deve ser positivo\",
    \"Mês deve ser entre 1 e 12\"
  ],
  \"error\": \"Bad Request\"
}
```

### 404 Not Found
```json
{
  \"statusCode\": 404,
  \"message\": \"Morador com ID \\\"uuid\\\" não encontrado\",
  \"error\": \"Not Found\"
}
```

### 409 Conflict
```json
{
  \"statusCode\": 409,
  \"message\": \"Pagamento para 3/2024 já existe\",
  \"error\": \"Conflict\"
}
```

---

## 📋 Validações

### Mês/Ano
- Mês: 1-12
- Ano: 2020-2050

### Valor
- Deve ser positivo
- Máximo 2 casas decimais

### Data de Pagamento
- Formato: YYYY-MM-DD
- Não pode ser futura

### Método de Pagamento
- \"Dinheiro\" ou \"Pix\"

---

## 🚀 Exemplos de Uso Completo

### 1. Configurar pagamentos para um morador:
```bash
# Inicializar todos os meses de 2024
curl -X POST http://localhost:3000/api/moradores/uuid-morador/pagamentos/inicializar/2024 \\
  -H \"Authorization: Bearer SEU_TOKEN\" \\
  -H \"Content-Type: application/json\" \\
  -d '{\"valorMensal\": 150.00}'
```

### 2. Ver carnê digital:
```bash
curl -X GET \"http://localhost:3000/api/moradores/uuid-morador/pagamentos/carne-digital?ano=2024\" \\
  -H \"Authorization: Bearer SEU_TOKEN\"
```

### 3. Registrar pagamento:
```bash
curl -X POST http://localhost:3000/api/moradores/uuid-morador/pagamentos/registrar \\
  -H \"Authorization: Bearer SEU_TOKEN\" \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"mesAno\": \"03/2024\",
    \"valor\": 150.00,
    \"dataPagamento\": \"2024-03-15\",
    \"metodo\": \"Pix\",
    \"comprovante\": \"data:image/jpeg;base64,/9j/4AAQ...\",
    \"observacao\": \"Pagamento referente à taxa de condomínio\"
  }'
```

### 4. Ver histórico:
```bash
curl -X GET http://localhost:3000/api/moradores/uuid-morador/pagamentos/historico \\
  -H \"Authorization: Bearer SEU_TOKEN\"
```

### 5. Filtrar pagamentos atrasados:
```bash
curl -X GET \"http://localhost:3000/api/moradores/uuid-morador/pagamentos?status=Atrasado\" \\
  -H \"Authorization: Bearer SEU_TOKEN\"
```

---

## 🎯 Casos de Uso do Frontend

### Tela de Pagamentos do Morador (`/moradores/1/pagamentos`)

**1. Seção Carnê Digital:**
- Chama `GET /moradores/:id/pagamentos/carne-digital`
- Mostra nome, CPF, endereço do morador
- Grid com 12 meses mostrando status de cada um
- Cores: Verde (Pago), Vermelho (Atrasado), Amarelo (Pendente)

**2. Seção Histórico:**
- Chama `GET /moradores/:id/pagamentos/historico`
- Tabela com mês/ano, valor, data pagamento, método, comprovante
- Opção de download/visualizar comprovante
- Filtros por ano, status, método

**3. Ações:**
- Botão \"Registrar Pagamento\" para cada mês
- Modal com formulário de pagamento
- Upload de comprovante
- Atualização em tempo real do status