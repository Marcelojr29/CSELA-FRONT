# API de Finanças

Esta API permite acessar relatórios financeiros e consultar pagamentos com comprovantes para controle administrativo.

## Endpoints Disponíveis

### 🔒 Todos os endpoints requerem autenticação JWT

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Base URL:**
```
/api/financas
```

---

## 📊 Relatório de Pagamentos com Comprovantes

**GET** `/api/financas/pagamentos?mes=3&ano=2024`

Retorna todos os pagamentos de um mês específico que possuem comprovante anexado, incluindo informações do morador.

### Query Parameters Obrigatórios:
- `mes`: Mês desejado (1-12)
- `ano`: Ano desejado (2020-2050)

### Exemplo de Requisição:
```bash
curl -X GET "http://localhost:3000/api/financas/pagamentos?mes=3&ano=2024" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
{
  "periodo": {
    "mes": 3,
    "ano": 2024,
    "mesAno": "Março/2024"
  },
  "estatisticas": {
    "totalArrecadado": 4500.00,
    "quantidadePagamentosComAnexos": 25,
    "mediaPorMorador": 150.00
  },
  "totalPagamentos": 25,
  "valorTotal": 3750.00,
  "pagamentos": [
    {
      "id": "uuid-pagamento-1",
      "morador": {
        "nome": "João Silva Santos"
      },
      "mesAno": "Março/2024",
      "valor": 150.00,
      "dataPagamento": "2024-03-15T00:00:00.000Z",
      "metodo": "Pix",
      "comprovante": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
      "status": "Pago"
    },
    {
      "id": "uuid-pagamento-2",
      "morador": {
        "nome": "Maria Oliveira Costa"
      },
      "mesAno": "Março/2024",
      "valor": 150.00,
      "dataPagamento": "2024-03-10T00:00:00.000Z",
      "metodo": "Dinheiro",
      "comprovante": "data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDo...",
      "status": "Pago"
    },
    {
      "id": "uuid-pagamento-3",
      "morador": {
        "nome": "Carlos Roberto Silva"
      },
      "mesAno": "Março/2024",
      "valor": 150.00,
      "dataPagamento": "2024-03-20T00:00:00.000Z",
      "metodo": "Pix",
      "comprovante": "https://storage.exemplo.com/comprovantes/comprovante-carlos-mar2024.jpg",
      "status": "Pago"
    }
  ]
}
```

### Estrutura da Response:

#### Resumo do Período:
- `periodo.mes`: Número do mês consultado
- `periodo.ano`: Ano consultado
- `periodo.mesAno`: Nome do mês + ano formatado

#### Estatísticas Financeiras:
- `estatisticas.totalArrecadado`: Valor total arrecadado no mês (todos os pagamentos confirmados, com ou sem comprovante)
- `estatisticas.quantidadePagamentosComAnexos`: Quantidade de pagamentos que possuem comprovante anexado
- `estatisticas.mediaPorMorador`: Valor médio pago por morador (baseado nos pagamentos com comprovante)

#### Compatibilidade (campos mantidos):
- `totalPagamentos`: Quantidade total de pagamentos com comprovante
- `valorTotal`: Soma de todos os valores dos pagamentos com comprovante

#### Lista de Pagamentos:
- `id`: Identificador único do pagamento
- `morador.nome`: Nome completo do morador
- `mesAno`: Período formatado (nome do mês/ano)
- `valor`: Valor pago
- `dataPagamento`: Data em que foi efetuado o pagamento
- `metodo`: "Dinheiro" ou "Pix"
- `comprovante`: Base64 da imagem/PDF ou URL do arquivo
- `status`: Status do pagamento (sempre "Pago" nesta consulta)

---

## 🔍 Filtros e Características

### Filtros Automáticos:
1. **Apenas pagamentos com comprovante**: Só retorna pagamentos que possuem arquivo anexado
2. **Período específico**: Filtra exatamente pelo mês/ano solicitado
3. **Status "Pago"**: Apenas pagamentos efetivados
4. **Ordenação**: Ordenado alfabeticamente pelo nome do morador

### Tipos de Comprovante Aceitos:
- **Imagens**: Base64 de JPG, PNG, GIF
- **PDFs**: Base64 de arquivos PDF
- **URLs**: Links para arquivos hospedados

---

## ❌ Códigos de Erro

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "Mês deve ser entre 1 e 12",
    "Ano deve ser maior que 2020"
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

---

## 📋 Validações

### Mês:
- Obrigatório
- Deve ser entre 1 e 12
- Número inteiro

### Ano:
- Obrigatório
- Deve ser entre 2020 e 2050
- Número inteiro

---

## 🚀 Exemplos de Uso

### Consultar pagamentos de Janeiro/2024:
```bash
curl -X GET "http://localhost:3000/api/financas/pagamentos?mes=1&ano=2024" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Consultar pagamentos de Dezembro/2024:
```bash
curl -X GET "http://localhost:3000/api/financas/pagamentos?mes=12&ano=2024" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response quando não há pagamentos:
```json
{
  "periodo": {
    "mes": 5,
    "ano": 2024,
    "mesAno": "Maio/2024"
  },
  "estatisticas": {
    "totalArrecadado": 0,
    "quantidadePagamentosComAnexos": 0,
    "mediaPorMorador": 0
  },
  "totalPagamentos": 0,
  "valorTotal": 0,
  "pagamentos": []
}
```

---

## 💡 Casos de Uso

### 1. Controle Financeiro Mensal:
- Verificar todos os pagamentos recebidos no mês
- Conferir comprovantes antes de baixar as contas
- Calcular receita total do período

### 2. Auditoria e Prestação de Contas:
- Gerar relatórios para assembleias
- Comprovar recebimentos para síndico
- Documentação para contabilidade

### 3. Backup de Comprovantes:
- Baixar todos os comprovantes do mês
- Organizar documentação fiscal
- Arquivo histórico de pagamentos

---

## 🎯 Integração Frontend

### Tela de Finanças Mensais:

**1. Filtro de Período:**
- Seletores para mês e ano
- Botão "Consultar" que chama a API

**2. Resumo Financeiro:**
- Card com total de pagamentos
- Card com valor total recebido
- Indicadores visuais de performance

**3. Lista de Pagamentos:**
- Tabela com nome do morador
- Valor e data de pagamento
- Método de pagamento com ícones
- Botão para visualizar/baixar comprovante

**4. Ações Disponíveis:**
- Visualizar comprovante em modal
- Baixar comprovante individual
- Exportar relatório completo
- Imprimir lista de pagamentos

### Exemplo de Implementação:
```javascript
// Buscar pagamentos do mês atual
const mes = new Date().getMonth() + 1;
const ano = new Date().getFullYear();

fetch(`/api/financas/pagamentos?mes=${mes}&ano=${ano}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => {
  // Exibir resumo
  document.getElementById('total-pagamentos').textContent = data.totalPagamentos;
  document.getElementById('valor-total').textContent = `R$ ${data.valorTotal.toFixed(2)}`;
  
  // Popular tabela
  const tabela = document.getElementById('tabela-pagamentos');
  data.pagamentos.forEach(pagamento => {
    // Criar linha da tabela com dados do pagamento
  });
});
```

---

## 📝 Observações Importantes

1. **Apenas pagamentos com comprovante**: A API só retorna pagamentos que possuem arquivo anexado
2. **Ordenação**: Resultados sempre ordenados alfabeticamente por nome do morador
3. **Performance**: Consulta otimizada com join para evitar N+1 queries
4. **Segurança**: Protegido por JWT, apenas usuários autenticados podem acessar