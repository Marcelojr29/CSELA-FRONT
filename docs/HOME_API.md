# API de Dashboard / Home

Esta API fornece estatísticas e indicadores-chave para o dashboard principal do sistema, incluindo métricas de moradores, pagamentos e adimplência com comparação mensal.

## Endpoints Disponíveis

### 🔒 Todos os endpoints requerem autenticação JWT

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Base URL:**
```
/api/home
```

---

## 📊 Dashboard Principal

**GET** `/api/home/dashboard`

Retorna estatísticas consolidadas do sistema com comparação entre o mês atual e o mês anterior.

---

## 💰 Arrecadação Mensal

**GET** `/api/home/arrecadacao-mensal`

Retorna o total arrecadado de pagamentos de cada mês dos últimos 6 meses.

---

## 🕒 Últimos Pagamentos

**GET** `/api/home/ultimos-pagamentos`

Retorna os 5 pagamentos mais recentes com informações do morador, endereço e valor.

### Exemplo de Requisição:
```bash
curl -X GET "http://localhost:3000/api/home/dashboard" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
{
  "periodo": {
    "mesAtual": {
      "mes": 12,
      "ano": 2025,
      "nome": "Dezembro"
    },
    "mesAnterior": {
      "mes": 11,
      "ano": 2025,
      "nome": "Novembro"
    }
  },
  "moradores": {
    "total": 150,
    "novosMesAtual": 8,
    "novosMesAnterior": 5,
    "variacao": 60.00,
    "tendencia": "crescimento"
  },
  "pagamentos": {
    "totalMesAtual": 142,
    "valorTotalMesAtual": 21300.00,
    "valorTotalMesAnterior": 19500.00,
    "variacao": 9.23,
    "tendencia": "crescimento"
  },
  "adimplencia": {
    "taxaMesAtual": 94.67,
    "taxaMesAnterior": 92.00,
    "variacao": 2.67,
    "tendencia": "melhora",
    "pagantesAtual": 142,
    "esperadosAtual": 150
  }
}
```

### Estrutura da Response:

#### 📅 **Período**
- `mesAtual`: Informações do mês atual (mês, ano, nome)
- `mesAnterior`: Informações do mês anterior para comparação

#### 👥 **Moradores**
- `total`: Total de moradores cadastrados no sistema
- `novosMesAtual`: Quantidade de moradores cadastrados neste mês
- `novosMesAnterior`: Quantidade de moradores cadastrados no mês anterior
- `variacao`: Variação percentual de novos moradores (positivo = crescimento, negativo = queda)
- `tendencia`: "crescimento", "queda" ou "estavel"

**Exemplo de interpretação:**
- Se `variacao: 60.00`, significa que houve **60% mais** moradores novos neste mês comparado ao anterior
- Se `novosMesAtual: 8` e `novosMesAnterior: 5`, houve aumento de 3 moradores (60% a mais)

#### 💰 **Pagamentos**
- `totalMesAtual`: Quantidade de pagamentos confirmados neste mês
- `valorTotalMesAtual`: Valor total arrecadado neste mês
- `valorTotalMesAnterior`: Valor total arrecadado no mês anterior
- `variacao`: Variação percentual do valor arrecadado
- `tendencia`: "crescimento", "queda" ou "estavel"

**Exemplo de interpretação:**
- Se `variacao: 9.23`, significa **9.23% a mais** de arrecadação neste mês
- Compara valor total, não quantidade de pagamentos

#### 📈 **Adimplência**
- `taxaMesAtual`: Percentual de adimplência do mês atual (pagantes / total moradores × 100)
- `taxaMesAnterior`: Percentual de adimplência do mês anterior
- `variacao`: Variação em pontos percentuais (não é porcentagem de porcentagem!)
- `tendencia`: "melhora", "piora" ou "estavel"
- `pagantesAtual`: Quantidade de moradores que pagaram neste mês
- `esperadosAtual`: Quantidade total de moradores (pagamentos esperados)

**Exemplo de interpretação:**
- Se `taxaMesAtual: 94.67` e `taxaMesAnterior: 92.00`, a variação é `2.67` pontos percentuais
- Isso significa que a taxa subiu de 92% para 94.67% (melhora de 2.67 pontos)

---

## 📊 Indicadores de Tendência

### Possíveis valores de `tendencia`:

**Para Moradores e Pagamentos:**
- `"crescimento"`: Houve aumento em relação ao mês anterior (variação positiva)
- `"queda"`: Houve redução em relação ao mês anterior (variação negativa)
- `"estavel"`: Não houve mudança em relação ao mês anterior (variação zero)

**Para Adimplência:**
- `"melhora"`: A taxa de adimplência aumentou (mais moradores pagando)
- `"piora"`: A taxa de adimplência diminuiu (menos moradores pagando)
- `"estavel"`: A taxa de adimplência permaneceu igual

---

## 🎨 Cores Sugeridas para UI

### Moradores:
- **Crescimento**: Verde (`#10b981`)
- **Queda**: Vermelho (`#ef4444`)
- **Estável**: Cinza (`#6b7280`)

### Pagamentos:
- **Crescimento**: Verde (`#10b981`)
- **Queda**: Vermelho (`#ef4444`)
- **Estável**: Amarelo (`#f59e0b`)

### Adimplência:
- **Melhora**: Verde (`#10b981`)
- **Piora**: Vermelho (`#ef4444`)
- **Estável**: Azul (`#3b82f6`)

---

## 📐 Cálculos Utilizados

### Variação de Moradores:
```
variacao = ((novosMesAtual - novosMesAnterior) / novosMesAnterior) × 100
```

### Variação de Pagamentos:
```
variacao = ((valorTotalMesAtual - valorTotalMesAnterior) / valorTotalMesAnterior) × 100
```

### Taxa de Adimplência:
```
taxa = (pagantesAtual / esperadosAtual) × 100
```

### Variação de Adimplência:
```
variacao = taxaMesAtual - taxaMesAnterior (em pontos percentuais)
```

---

## ❌ Códigos de Erro

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 🚀 Exemplos de Uso

### Buscar estatísticas do dashboard:
```bash
curl -X GET "http://localhost:3000/api/home/dashboard" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response de exemplo com todos os cenários:
```json
{
  "periodo": {
    "mesAtual": {
      "mes": 12,
      "ano": 2025,
      "nome": "Dezembro"
    },
    "mesAnterior": {
      "mes": 11,
      "ano": 2025,
      "nome": "Novembro"
    }
  },
  "moradores": {
    "total": 150,
    "novosMesAtual": 8,
    "novosMesAnterior": 5,
    "variacao": 60.00,
    "tendencia": "crescimento"
  },
  "pagamentos": {
    "totalMesAtual": 142,
    "valorTotalMesAtual": 21300.00,
    "valorTotalMesAnterior": 19500.00,
    "variacao": 9.23,
    "tendencia": "crescimento"
  },
  "adimplencia": {
    "taxaMesAtual": 94.67,
    "taxaMesAnterior": 92.00,
    "variacao": 2.67,
    "tendencia": "melhora",
    "pagantesAtual": 142,
    "esperadosAtual": 150
  }
}
```

---

## 🎯 Casos de Uso do Frontend

### Dashboard Principal (`/dashboard` ou `/home`)

**1. Cards de KPIs:**
- **Card Moradores**: 
  - Título: "Total de Moradores"
  - Valor principal: `moradores.total`
  - Subtítulo: `+{novosMesAtual} novos este mês`
  - Badge de variação: `{variacao}%` com cor baseada em tendência
  
- **Card Pagamentos**:
  - Título: "Arrecadação Mensal"
  - Valor principal: `R$ {valorTotalMesAtual}`
  - Subtítulo: `{totalMesAtual} pagamentos`
  - Badge de variação: `{variacao}%` com cor baseada em tendência

- **Card Adimplência**:
  - Título: "Taxa de Adimplência"
  - Valor principal: `{taxaMesAtual}%`
  - Subtítulo: `{pagantesAtual} de {esperadosAtual} moradores`
  - Badge de variação: `{variacao} pontos` com cor baseada em tendência

**2. Gráficos:**
- Gráfico de linha comparando mês atual vs anterior
- Gráfico de barras para adimplência mensal
- Gráfico de pizza para distribuição de pagamentos

**3. Indicadores Visuais:**
- Ícone de seta para cima (crescimento/melhora)
- Ícone de seta para baixo (queda/piora)
- Ícone de igual (estável)

### Exemplo de Implementação React/Vue:
```javascript
const { data } = await fetch('/api/home/dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Card de Moradores
<Card>
  <h3>Total de Moradores</h3>
  <div className="value">{data.moradores.total}</div>
  <div className="subtitle">
    +{data.moradores.novosMesAtual} novos este mês
  </div>
  <Badge color={getBadgeColor(data.moradores.tendencia)}>
    {data.moradores.variacao > 0 ? '↑' : '↓'} {Math.abs(data.moradores.variacao)}%
  </Badge>
</Card>

// Card de Pagamentos
<Card>
  <h3>Arrecadação Mensal</h3>
  <div className="value">R$ {data.pagamentos.valorTotalMesAtual.toLocaleString('pt-BR')}</div>
  <div className="subtitle">
    {data.pagamentos.totalMesAtual} pagamentos confirmados
  </div>
  <Badge color={getBadgeColor(data.pagamentos.tendencia)}>
    {data.pagamentos.variacao > 0 ? '↑' : '↓'} {Math.abs(data.pagamentos.variacao).toFixed(2)}%
  </Badge>
</Card>

// Card de Adimplência
<Card>
  <h3>Taxa de Adimplência</h3>
  <div className="value">{data.adimplencia.taxaMesAtual.toFixed(2)}%</div>
  <div className="subtitle">
    {data.adimplencia.pagantesAtual} de {data.adimplencia.esperadosAtual} moradores
  </div>
  <Badge color={getBadgeColor(data.adimplencia.tendencia)}>
    {data.adimplencia.variacao > 0 ? '↑' : '↓'} {Math.abs(data.adimplencia.variacao).toFixed(2)} pontos
  </Badge>
</Card>

function getBadgeColor(tendencia) {
  if (tendencia === 'crescimento' || tendencia === 'melhora') return 'green';
  if (tendencia === 'queda' || tendencia === 'piora') return 'red';
  return 'gray';
}
```

---

## 💰 Exemplo de Uso - Arrecadação Mensal

### Exemplo de Requisição:
```bash
curl -X GET "http://localhost:3000/api/home/arrecadacao-mensal" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
{
  "periodo": {
    "inicio": {
      "mes": 7,
      "ano": 2025,
      "nomeMes": "Julho",
      "mesAno": "Julho/2025",
      "totalArrecadado": 18500.50,
      "quantidadePagamentos": 142
    },
    "fim": {
      "mes": 12,
      "ano": 2025,
      "nomeMes": "Dezembro",
      "mesAno": "Dezembro/2025",
      "totalArrecadado": 22450.75,
      "quantidadePagamentos": 148
    }
  },
  "arrecadacaoPorMes": [
    {
      "mes": 7,
      "ano": 2025,
      "nomeMes": "Julho",
      "mesAno": "Julho/2025",
      "totalArrecadado": 18500.50,
      "quantidadePagamentos": 142
    },
    {
      "mes": 8,
      "ano": 2025,
      "nomeMes": "Agosto",
      "mesAno": "Agosto/2025",
      "totalArrecadado": 19200.00,
      "quantidadePagamentos": 145
    },
    {
      "mes": 9,
      "ano": 2025,
      "nomeMes": "Setembro",
      "mesAno": "Setembro/2025",
      "totalArrecadado": 20100.25,
      "quantidadePagamentos": 143
    },
    {
      "mes": 10,
      "ano": 2025,
      "nomeMes": "Outubro",
      "mesAno": "Outubro/2025",
      "totalArrecadado": 21350.00,
      "quantidadePagamentos": 147
    },
    {
      "mes": 11,
      "ano": 2025,
      "nomeMes": "Novembro",
      "mesAno": "Novembro/2025",
      "totalArrecadado": 20800.00,
      "quantidadePagamentos": 146
    },
    {
      "mes": 12,
      "ano": 2025,
      "nomeMes": "Dezembro",
      "mesAno": "Dezembro/2025",
      "totalArrecadado": 22450.75,
      "quantidadePagamentos": 148
    }
  ],
  "resumo": {
    "totalGeral": 122401.50,
    "totalPagamentos": 871,
    "mediaMensal": 20400.25,
    "mesesAnalisados": 6
  }
}
```

### Campos de Resposta:

#### `periodo`
- **inicio**: Dados do primeiro mês do período analisado
- **fim**: Dados do último mês do período analisado

#### `arrecadacaoPorMes` (array)
- **mes**: Número do mês (1-12)
- **ano**: Ano
- **nomeMes**: Nome do mês por extenso
- **mesAno**: String formatada "Mês/Ano"
- **totalArrecadado**: Soma total dos valores de pagamentos PAGOS do mês
- **quantidadePagamentos**: Número de pagamentos confirmados no mês

#### `resumo`
- **totalGeral**: Soma total arrecadada nos 6 meses
- **totalPagamentos**: Quantidade total de pagamentos nos 6 meses
- **mediaMensal**: Média de arrecadação por mês
- **mesesAnalisados**: Quantidade de meses incluídos no resultado (sempre 6)

### Exemplo de Implementação Frontend:

```jsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ArrecadacaoChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/home/arrecadacao-mensal', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <div className="arrecadacao-container">
      <h2>Arrecadação dos Últimos 6 Meses</h2>
      
      {/* Gráfico de Linha */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.arrecadacaoPorMes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nomeMes" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="totalArrecadado" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Arrecadação"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Resumo */}
      <div className="resumo-cards">
        <Card>
          <h3>Total Arrecadado</h3>
          <div className="value">
            R$ {data.resumo.totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="subtitle">Últimos 6 meses</div>
        </Card>

        <Card>
          <h3>Média Mensal</h3>
          <div className="value">
            R$ {data.resumo.mediaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="subtitle">{data.resumo.totalPagamentos} pagamentos</div>
        </Card>

        <Card>
          <h3>Melhor Mês</h3>
          <div className="value">
            {data.arrecadacaoPorMes.reduce((max, item) => 
              item.totalArrecadado > max.totalArrecadado ? item : max
            ).nomeMes}
          </div>
          <div className="subtitle">
            R$ {data.arrecadacaoPorMes.reduce((max, item) => 
              item.totalArrecadado > max.totalArrecadado ? item : max
            ).totalArrecadado.toLocaleString('pt-BR')}
          </div>
        </Card>
      </div>

      {/* Tabela detalhada */}
      <table className="table">
        <thead>
          <tr>
            <th>Mês/Ano</th>
            <th>Arrecadação</th>
            <th>Pagamentos</th>
            <th>Ticket Médio</th>
          </tr>
        </thead>
        <tbody>
          {data.arrecadacaoPorMes.map((item) => (
            <tr key={`${item.mes}-${item.ano}`}>
              <td>{item.mesAno}</td>
              <td>R$ {item.totalArrecadado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td>{item.quantidadePagamentos}</td>
              <td>
                R$ {(item.totalArrecadado / item.quantidadePagamentos).toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🕒 Exemplo de Uso - Últimos Pagamentos

### Exemplo de Requisição:
```bash
curl -X GET "http://localhost:3000/api/home/ultimos-pagamentos" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "valor": 450.50,
    "mes": 12,
    "ano": 2025,
    "mesAno": "Dezembro/2025",
    "status": "Pago",
    "metodoPagamento": "Pix",
    "dataPagamento": "2025-12-15T10:30:00.000Z",
    "criadoEm": "2025-12-15T10:30:00.000Z",
    "morador": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "nome": "João Silva",
      "endereco": "Rua das Flores, 123 - Apt 201",
      "telefone": "(11) 98765-4321"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "valor": 380.00,
    "mes": 12,
    "ano": 2025,
    "mesAno": "Dezembro/2025",
    "status": "Pago",
    "metodoPagamento": "Dinheiro",
    "dataPagamento": "2025-12-14T15:20:00.000Z",
    "criadoEm": "2025-12-14T15:20:00.000Z",
    "morador": {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "nome": "Maria Santos",
      "endereco": "Avenida Central, 456 - Casa 5",
      "telefone": "(11) 97654-3210"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "valor": 520.75,
    "mes": 12,
    "ano": 2025,
    "mesAno": "Dezembro/2025",
    "status": "Pago",
    "metodoPagamento": "Pix",
    "dataPagamento": "2025-12-13T09:45:00.000Z",
    "criadoEm": "2025-12-13T09:45:00.000Z",
    "morador": {
      "id": "323e4567-e89b-12d3-a456-426614174002",
      "nome": "Pedro Oliveira",
      "endereco": "Rua do Comércio, 789 - Bloco B",
      "telefone": "(11) 96543-2109"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "valor": 410.00,
    "mes": 11,
    "ano": 2025,
    "mesAno": "Novembro/2025",
    "status": "Pago",
    "metodoPagamento": "Pix",
    "dataPagamento": "2025-11-28T14:10:00.000Z",
    "criadoEm": "2025-11-28T14:10:00.000Z",
    "morador": {
      "id": "423e4567-e89b-12d3-a456-426614174003",
      "nome": "Ana Costa",
      "endereco": "Travessa da Paz, 321 - Apt 102",
      "telefone": "(11) 95432-1098"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440005",
    "valor": 395.25,
    "mes": 11,
    "ano": 2025,
    "mesAno": "Novembro/2025",
    "status": "Pago",
    "metodoPagamento": "Dinheiro",
    "dataPagamento": "2025-11-27T16:30:00.000Z",
    "criadoEm": "2025-11-27T16:30:00.000Z",
    "morador": {
      "id": "523e4567-e89b-12d3-a456-426614174004",
      "nome": "Carlos Mendes",
      "endereco": "Alameda dos Pássaros, 654 - Casa 12",
      "telefone": "(11) 94321-0987"
    }
  }
]
```

### Campos de Resposta:

#### Dados do Pagamento
- **id**: ID único do pagamento
- **valor**: Valor do pagamento (sempre 2 casas decimais)
- **mes**: Número do mês (1-12)
- **ano**: Ano do pagamento
- **mesAno**: String formatada "Mês/Ano"
- **status**: Status do pagamento (Pago, Pendente, Atrasado)
- **metodoPagamento**: Método usado (Pix, Dinheiro)
- **dataPagamento**: Data em que o pagamento foi efetuado
- **criadoEm**: Data de registro do pagamento no sistema

#### Dados do Morador
- **id**: ID único do morador
- **nome**: Nome completo do morador
- **endereco**: Endereço completo (rua, número, complemento)
- **telefone**: Telefone de contato

### Exemplo de Implementação Frontend:

```jsx
import React, { useEffect, useState } from 'react';

function UltimosPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/home/ultimos-pagamentos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPagamentos(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="ultimos-pagamentos">
      <h2>Últimos Pagamentos Recebidos</h2>
      
      <div className="pagamentos-list">
        {pagamentos.map((pagamento) => (
          <div key={pagamento.id} className="pagamento-card">
            <div className="pagamento-header">
              <div className="morador-info">
                <h3>{pagamento.morador.nome}</h3>
                <p className="endereco">{pagamento.morador.endereco}</p>
                <p className="telefone">{pagamento.morador.telefone}</p>
              </div>
              <div className="valor-info">
                <div className="valor">
                  R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="metodo">{pagamento.metodoPagamento}</div>
              </div>
            </div>
            
            <div className="pagamento-footer">
              <span className="periodo">{pagamento.mesAno}</span>
              <span className="data">
                {new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR')}
              </span>
              <span className={`status ${pagamento.status.toLowerCase()}`}>
                {pagamento.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Versão em Tabela */}
      <table className="table">
        <thead>
          <tr>
            <th>Morador</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Período</th>
            <th>Valor</th>
            <th>Método</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map((pagamento) => (
            <tr key={pagamento.id}>
              <td>{pagamento.morador.nome}</td>
              <td>{pagamento.morador.endereco}</td>
              <td>{pagamento.morador.telefone}</td>
              <td>{pagamento.mesAno}</td>
              <td className="valor">
                R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td>
                <span className="badge badge-metodo">
                  {pagamento.metodoPagamento}
                </span>
              </td>
              <td>
                {new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Estilos CSS Sugeridos:

```css
.pagamento-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s;
}

.pagamento-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.pagamento-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}

.morador-info h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
}

.morador-info p {
  margin: 2px 0;
  color: #666;
  font-size: 14px;
}

.valor-info {
  text-align: right;
}

.valor-info .valor {
  font-size: 24px;
  font-weight: bold;
  color: #2ecc71;
}

.valor-info .metodo {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.pagamento-footer {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  color: #666;
}

.status.pago {
  color: #2ecc71;
  font-weight: 600;
}

.badge-metodo {
  background-color: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
```

---

## 💡 Observações Importantes

1. **Comparação Mensal**: Todos os cálculos comparam o mês atual com o mês anterior
2. **Variação de Adimplência**: É expressa em pontos percentuais, não em percentual de percentual
3. **Moradores Novos**: Conta apenas moradores cadastrados no respectivo mês
4. **Pagamentos**: Considera apenas pagamentos com status "Pago"
5. **Performance**: Queries otimizadas para retorno rápido
6. **Atualização**: Dados calculados em tempo real a cada requisição