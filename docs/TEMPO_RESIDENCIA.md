# Teste do Cálculo Automático de Tempo de Residência

## O que mudou?

O campo `tempoResidencia` agora é **calculado automaticamente** com base na data de cadastro (`criadoEm`), não sendo mais necessário informá-lo no momento do cadastro.

## Como funciona?

- **No cadastro**: Apenas informe os dados pessoais e de endereço
- **Automaticamente**: O sistema calcula quantos meses se passaram desde o cadastro
- **Na consulta**: O `tempoResidencia` aparece como um campo calculado em tempo real

## Exemplo de Cadastro

### Request (sem tempoResidencia):
```bash
curl -X POST http://localhost:3000/api/moradores \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "rg": "12.345.678-9",
    "cpf": "123.456.789-00",
    "dataDeNascimento": "1990-05-15",
    "rua": "Rua das Flores",
    "numeroResidencia": "123",
    "bairro": "Centro",
    "cep": "12345-678",
    "telefone": "(11) 99999-9999",
    "tipoResidencia": "Casa",
    "quantidadePessoas": 4
  }'
```

### Response (com tempoResidencia calculado):
```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva",
  "rg": "123456789",
  "cpf": "12345678900",
  // ... outros campos
  "tempoResidencia": 0, // 0 meses (recém cadastrado)
  "criadoEm": "2024-12-12T10:30:00.000Z",
  "atualizadoEm": "2024-12-12T10:30:00.000Z"
}
```

## Exemplos de Cálculo

| Data de Cadastro | Data Atual | Tempo de Residência |
|------------------|------------|---------------------|
| 2024-12-12 | 2024-12-12 | 0 meses |
| 2024-11-12 | 2024-12-12 | 1 mês |
| 2024-10-12 | 2024-12-12 | 2 meses |
| 2023-12-12 | 2024-12-12 | 12 meses |
| 2022-06-12 | 2024-12-12 | 30 meses |

## Vantagens

1. **Precisão**: Sempre atualizado automaticamente
2. **Simplicidade**: Não precisa calcular manualmente
3. **Consistência**: Não há risco de informar valor incorreto
4. **Manutenção**: Sem necessidade de atualizar periodicamente

## Consulta com Tempo Atualizado

Quando você consultar um morador cadastrado há 3 meses:

```bash
curl -X GET http://localhost:3000/api/moradores/uuid-do-morador \
  -H "Authorization: Bearer SEU_TOKEN"
```

```json
{
  "id": "uuid-do-morador",
  "nome": "João Silva",
  // ... outros campos
  "tempoResidencia": 3, // Calculado automaticamente
  "criadoEm": "2024-09-12T10:30:00.000Z" // 3 meses atrás
}
```

## Nota Importante

- O `tempoResidencia` não pode mais ser enviado no POST ou PATCH
- Ele é sempre calculado em tempo real baseado no `criadoEm`
- A precisão é em meses completos