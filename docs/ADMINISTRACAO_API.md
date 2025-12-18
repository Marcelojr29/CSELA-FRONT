# API de Administração

Esta API fornece métricas administrativas e indicadores financeiros para gestão do sistema.

## Endpoints Disponíveis

### 🔒 Todos os endpoints requerem autenticação JWT

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Base URL:**
```
/api/administracao
```

---

## 📊 Métricas Gerais

**GET** `/api/administracao/metricas`

Retorna métricas administrativas com comparações de arrecadação anual e mensal.

### Query Parameters (Opcionais):
- **mes** (número): Mês de referência (1-12). Se não informado, usa o mês atual.
- **ano** (número): Ano de referência (ex: 2025). Se não informado, usa o ano atual.

### Exemplos de Requisição:

**Métricas do mês atual:**
```bash
curl -X GET "http://localhost:3000/api/administracao/metricas" \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Métricas de um mês específico:**
```bash
curl -X GET "http://localhost:3000/api/administracao/metricas?mes=10&ano=2025" \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Métricas de Janeiro/2024:**
```bash
curl -X GET "http://localhost:3000/api/administracao/metricas?mes=1&ano=2024" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
{
  "arrecadacaoAnual": {
    "anoAtual": {
      "ano": 2025,
      "total": 245680.50,
      "quantidadePagamentos": 1824
    },
    "anoAnterior": {
      "ano": 2024,
      "total": 218450.00,
      "quantidadePagamentos": 1680
    },
    "variacao": 12.47,
    "diferencaAbsoluta": 27230.50,
    "tendencia": "ganho"
  },
  "arrecadacaoMensal": {
    "mesAtual": {
      "mes": 12,
      "ano": 2025,
      "nomeMes": "Dezembro",
      "mesAno": "Dezembro/2025",
      "total": 22450.75,
      "quantidadePagamentos": 148
    },
    "mesAnterior": {
      "mes": 11,
      "ano": 2025,
      "nomeMes": "Novembro",
      "mesAno": "Novembro/2025",
      "total": 20800.00,
      "quantidadePagamentos": 146
    },
    "variacao": 7.93,
    "diferencaAbsoluta": 1650.75,
    "tendencia": "ganho"
  },
  "despesasMensal": {
    "mesAtual": {
      "mes": 12,
      "ano": 2025,
      "nomeMes": "Dezembro",
      "mesAno": "Dezembro/2025",
      "valorEsperado": 7500.00,
      "valorArrecadado": 6850.50,
      "despesa": 649.50,
      "totalMoradores": 150,
      "valorMensalPadrao": 50.00,
      "percentualArrecadado": 91.34
    },
    "mesAnterior": {
      "mes": 11,
      "ano": 2025,
      "nomeMes": "Novembro",
      "mesAno": "Novembro/2025",
      "valorEsperado": 7350.00,
      "valorArrecadado": 6720.00,
      "despesa": 630.00,
      "totalMoradores": 147,
      "valorMensalPadrao": 50.00,
      "percentualArrecadado": 91.43
    },
    "variacao": 3.10,
    "diferencaAbsoluta": 19.50,
    "tendencia": "aumento"
  }
}
```

### Campos de Resposta:

#### `arrecadacaoAnual`
Comparação da arrecadação do ano atual com o ano anterior.

**anoAtual:**
- **ano**: Ano atual (ex: 2025)
- **total**: Valor total arrecadado no ano atual
- **quantidadePagamentos**: Número de pagamentos confirmados no ano

**anoAnterior:**
- **ano**: Ano anterior (ex: 2024)
- **total**: Valor total arrecadado no ano anterior
- **quantidadePagamentos**: Número de pagamentos confirmados no ano anterior

**Comparação:**
- **variacao**: Percentual de ganho/perda em relação ao ano anterior
  - Positivo = ganho
  - Negativo = perda
  - Zero = estável
- **diferencaAbsoluta**: Diferença em valor absoluto (anoAtual - anoAnterior)
- **tendencia**: Indicador textual ('ganho', 'perda' ou 'estavel')

#### `arrecadacaoMensal`
Comparação da arrecadação do mês atual com o mês anterior.

**mesAtual:**
- **mes**: Número do mês (1-12)
- **ano**: Ano do mês atual
- **nomeMes**: Nome do mês por extenso
- **mesAno**: String formatada "Mês/Ano"
- **total**: Valor total arrecadado no mês
- **quantidadePagamentos**: Número de pagamentos confirmados

**mesAnterior:**
- **mes**: Número do mês anterior
- **ano**: Ano do mês anterior
- **nomeMes**: Nome do mês anterior por extenso
- **mesAno**: String formatada "Mês/Ano"
- **total**: Valor total arrecadado no mês anterior
- **quantidadePagamentos**: Número de pagamentos confirmados

**Comparação:**
- **variacao**: Percentual de ganho/perda em relação ao mês anterior
- **diferencaAbsoluta**: Diferença em valor absoluto (mesAtual - mesAnterior)
- **tendencia**: Indicador textual ('ganho', 'perda' ou 'estavel')

#### `despesasMensal`
Comparação das despesas do mês atual com o mês anterior.

**Cálculo da Despesa:**
```
valorEsperado = totalMoradores × valorMensalPadrao
despesa = max(0, valorEsperado - valorArrecadado)
```

A despesa representa o valor que **deixou de ser arrecadado** em relação ao esperado.

**mesAtual:**
- **mes**: Número do mês (1-12)
- **ano**: Ano do mês atual
- **nomeMes**: Nome do mês por extenso
- **mesAno**: String formatada "Mês/Ano"
- **valorEsperado**: Valor que deveria ser arrecadado (moradores × valor padrão)
- **valorArrecadado**: Valor efetivamente arrecadado no mês
- **despesa**: Diferença entre esperado e arrecadado (quando arrecadado < esperado)
- **totalMoradores**: Quantidade de moradores cadastrados até o mês
- **valorMensalPadrao**: Valor padrão configurado que cada morador deve pagar
- **percentualArrecadado**: Percentual arrecadado em relação ao esperado

**mesAnterior:**
- Mesmos campos do mês anterior para comparação

**Comparação:**
- **variacao**: Percentual de aumento/redução da despesa em relação ao mês anterior
  - Positivo = aumento da despesa (piorou)
  - Negativo = redução da despesa (melhorou)
  - Zero = estável
- **diferencaAbsoluta**: Diferença absoluta da despesa entre os meses
- **tendencia**: Indicador textual ('aumento', 'reducao' ou 'estavel')

---

## 💡 Cálculos e Fórmulas

### Variação Percentual
```
variacao = ((valorAtual - valorAnterior) / valorAnterior) * 100
```

**Exemplos:**
- Atual: R$ 100.000, Anterior: R$ 80.000 → Variação: +25%
- Atual: R$ 80.000, Anterior: R$ 100.000 → Variação: -20%
- Atual: R$ 100.000, Anterior: R$ 100.000 → Variação: 0%

### Diferença Absoluta
```
diferencaAbsoluta = valorAtual - valorAnterior
```

### Cálculo de Despesa
```
valorEsperado = totalMoradores × valorMensalPadrao
despesa = max(0, valorEsperado - valorArrecadado)
percentualArrecadado = (valorArrecadado / valorEsperado) × 100
```

**Exemplo:**
- Total de moradores: 150
- Valor padrão: R$ 50,00
- Esperado: 150 × 50 = R$ 7.500,00
- Arrecadado: R$ 6.850,50
- Despesa: R$ 7.500 - R$ 6.850,50 = **R$ 649,50**
- Percentual: (6.850,50 / 7.500) × 100 = **91,34%**

### Tendência
- **ganho**: variacao > 0
- **perda**: variacao < 0
- **estavel**: variacao = 0

---

## 🎯 Exemplos de Implementação Frontend

### Exemplo 1: Cards de Métricas

```jsx
import React, { useEffect, useState } from 'react';

function MetricasAdministracao() {
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mesAno, setMesAno] = useState({ mes: null, ano: null }); // null = mês/ano atual

  const carregarMetricas = (mes, ano) => {
    const params = new URLSearchParams();
    if (mes) params.append('mes', mes);
    if (ano) params.append('ano', ano);
    
    const url = `http://localhost:3000/api/administracao/metricas${params.toString() ? '?' + params.toString() : ''}`;
    
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setMetricas(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarMetricas(mesAno.mes, mesAno.ano);
  }, [mesAno]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setMesAno(prev => ({
      ...prev,
      [name]: value || null
    }));
  };

  if (loading) return <div>Carregando...</div>;

  const { arrecadacaoAnual, arrecadacaoMensal, despesasMensal } = metricas;

  return (
    <div className="metricas-admin">
      <h1>Painel Administrativo</h1>
      
      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-group">
          <label htmlFor="mes">Mês:</label>
          <select 
            id="mes" 
            name="mes" 
            value={mesAno.mes || ''} 
            onChange={handleFiltroChange}
          >
            <option value="">Mês Atual</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>

        <div className="filtro-group">
          <label htmlFor="ano">Ano:</label>
          <input 
            type="number" 
            id="ano" 
            name="ano" 
            placeholder="Ano Atual"
            value={mesAno.ano || ''} 
            onChange={handleFiltroChange}
            min="2020"
            max="2030"
          />
        </div>

        <button onClick={() => setMesAno({ mes: null, ano: null })}>
          Limpar Filtros
        </button>
      </div>
      
      <div className="cards-container">
        {/* Card Arrecadação Anual */}
        <div className="metric-card">
          <h3>Arrecadação Anual {arrecadacaoAnual.anoAtual.ano}</h3>
          <div className="value">
            R$ {arrecadacaoAnual.anoAtual.total.toLocaleString('pt-BR', { 
              minimumFractionDigits: 2 
            })}
          </div>
          <div className="subtitle">
            {arrecadacaoAnual.anoAtual.quantidadePagamentos} pagamentos
          </div>
          <div className={`badge ${arrecadacaoAnual.tendencia}`}>
            {arrecadacaoAnual.variacao > 0 ? '↑' : arrecadacaoAnual.variacao < 0 ? '↓' : '→'} 
            {' '}
            {Math.abs(arrecadacaoAnual.variacao).toFixed(2)}% em relação a {arrecadacaoAnual.anoAnterior.ano}
          </div>
          <div className="comparison">
            Diferença: R$ {Math.abs(arrecadacaoAnual.diferencaAbsoluta).toLocaleString('pt-BR', {
              minimumFractionDigits: 2
            })}
          </div>
        </div>

        {/* Card Arrecadação Mensal */}
        <div className="metric-card">
          <h3>Arrecadação Mensal</h3>
          <div className="periodo">{arrecadacaoMensal.mesAtual.mesAno}</div>
          <div className="value">
            R$ {arrecadacaoMensal.mesAtual.total.toLocaleString('pt-BR', { 
              minimumFractionDigits: 2 
            })}
          </div>
          <div className="subtitle">
            {arrecadacaoMensal.mesAtual.quantidadePagamentos} pagamentos
          </div>
          <div className={`badge ${arrecadacaoMensal.tendencia}`}>
            {arrecadacaoMensal.variacao > 0 ? '↑' : arrecadacaoMensal.variacao < 0 ? '↓' : '→'} 
            {' '}
            {Math.abs(arrecadacaoMensal.variacao).toFixed(2)}% vs {arrecadacaoMensal.mesAnterior.nomeMes}
          </div>
          <div className="comparison">
            Diferença: R$ {Math.abs(arrecadacaoMensal.diferencaAbsoluta).toLocaleString('pt-BR', {
              minimumFractionDigits: 2
            })}
          </div>
        </div>

        {/* Card Despesas Mensal */}
        <div className="metric-card">
          <h3>Despesas do Mês</h3>
          <div className="periodo">{despesasMensal.mesAtual.mesAno}</div>
          <div className="value despesa">
            R$ {despesasMensal.mesAtual.despesa.toLocaleString('pt-BR', { 
              minimumFractionDigits: 2 
            })}
          </div>
          <div className="subtitle">
            {despesasMensal.mesAtual.percentualArrecadado.toFixed(2)}% arrecadado
          </div>
          <div className="info-row">
            <span>Esperado: R$ {despesasMensal.mesAtual.valorEsperado.toLocaleString('pt-BR', { 
              minimumFractionDigits: 2 
            })}</span>
            <span>Arrecadado: R$ {despesasMensal.mesAtual.valorArrecadado.toLocaleString('pt-BR', { 
              minimumFractionDigits: 2 
            })}</span>
          </div>
          <div className={`badge ${despesasMensal.tendencia}`}>
            {despesasMensal.variacao > 0 ? '↑' : despesasMensal.variacao < 0 ? '↓' : '→'} 
            {' '}
            {Math.abs(despesasMensal.variacao).toFixed(2)}% vs {despesasMensal.mesAnterior.nomeMes}
          </div>
          <div className="comparison">
            {despesasMensal.mesAtual.totalMoradores} moradores × R$ {despesasMensal.mesAtual.valorMensalPadrao}
          </div>
        </div>
      </div>

      {/* Comparação Detalhada */}
      <div className="comparacao-detalhada">
        <h2>Comparação Detalhada</h2>
        
        <table className="table">
          <thead>
            <tr>
              <th>Período</th>
              <th>Ano Atual</th>
              <th>Ano Anterior</th>
              <th>Variação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arrecadação Anual</td>
              <td>
                R$ {arrecadacaoAnual.anoAtual.total.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
              <td>
                R$ {arrecadacaoAnual.anoAnterior.total.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
              <td className={arrecadacaoAnual.tendencia}>
                {arrecadacaoAnual.variacao > 0 ? '+' : ''}
                {arrecadacaoAnual.variacao.toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td>Arrecadação Mensal</td>
              <td>
                R$ {arrecadacaoMensal.mesAtual.total.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
              <td>
                R$ {arrecadacaoMensal.mesAnterior.total.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
              <td className={arrecadacaoMensal.tendencia}>
                {arrecadacaoMensal.variacao > 0 ? '+' : ''}
                {arrecadacaoMensal.variacao.toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td>Despesas Mensal</td>
              <td>
                R$ {despesasMensal.mesAtual.despesa.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
              <td>
                R$ {despesasMensal.mesAnterior.despesa.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2 
                })}
              </td>
              <td className={despesasMensal.tendencia}>
                {despesasMensal.variacao > 0 ? '+' : ''}
                {despesasMensal.variacao.toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Exemplo 2: Gráfico de Tendência

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function GraficoComparacao({ metricas }) {
  const data = [
    {
      periodo: metricas.arrecadacaoAnual.anoAnterior.ano.toString(),
      valor: metricas.arrecadacaoAnual.anoAnterior.total
    },
    {
      periodo: metricas.arrecadacaoAnual.anoAtual.ano.toString(),
      valor: metricas.arrecadacaoAnual.anoAtual.total
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="periodo" />
        <YAxis />
        <Tooltip 
          formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="valor" 
          stroke="#8884d8" 
          strokeWidth={2}
          name="Arrecadação"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Estilos CSS Sugeridos

```css
.metricas-admin {
  padding: 24px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.metric-card h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #666;
  font-weight: 600;
}

.metric-card .periodo {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.metric-card .value {
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
  margin: 12px 0;
}

.metric-card .subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
}

.badge.ganho {
  background-color: #d4edda;
  color: #155724;
}

.badge.perda {
  background-color: #f8d7da;
  color: #721c24;
}

.badge.estavel {
  background-color: #e2e3e5;
  color: #383d41;
}

.badge.aumento {
  background-color: #f8d7da;
  color: #721c24;
}

.badge.reducao {
  background-color: #d4edda;
  color: #155724;
}

.comparison {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e9ecef;
  font-size: 14px;
  color: #6c757d;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.table td.ganho {
  color: #28a745;
  font-weight: 600;
}

.table td.perda {
  color: #dc3545;
  font-weight: 600;
}

.table td.estavel {
  color: #6c757d;
  font-weight: 600;
}

.table td.aumento {
  color: #dc3545;
  font-weight: 600;
}

.table td.reducao {
  color: #28a745;
  font-weight: 600;
}

.value.despesa {
  color: #dc3545;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6c757d;
  margin: 8px 0;
}

.filtros {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.filtro-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filtro-group label {
  font-size: 14px;
  font-weight: 600;
  color: #495057;
}

.filtro-group select,
.filtro-group input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
}

.filtros button {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.filtros button:hover {
  background-color: #5a6268;
}
```

---

## 📈 Interpretação das Métricas

### Arrecadação Anual
- **Positiva**: Indica crescimento da receita em relação ao ano anterior
- **Negativa**: Indica redução da receita, pode necessitar investigação
- **Estável**: Manutenção do nível de arrecadação

### Arrecadação Mensal
- **Positiva**: Mês atual melhor que o anterior
- **Negativa**: Mês atual pior que o anterior (pode ser sazonal)
- **Estável**: Receita constante entre os meses

### Despesas Mensal
- **Despesa**: Diferença entre o esperado e o arrecadado
- **Aumento**: Despesa cresceu (piorou - menos moradores pagaram)
- **Redução**: Despesa diminuiu (melhorou - mais moradores pagaram)
- **Percentual Arrecadado**: Indica a eficiência da arrecadação
  - 100% = todos pagaram
  - < 100% = alguns moradores não pagaram
  - > 100% = arrecadou mais que o esperado (pode haver pagamentos extras)

---

## 💡 Observações Importantes

1. **Apenas Pagamentos Pagos**: Métricas consideram apenas pagamentos com status "Pago"
2. **Comparação Ano Anterior**: Para janeiro, compara com dezembro do ano anterior
3. **Valores em Real**: Todos os valores são formatados com 2 casas decimais
4. **Atualização em Tempo Real**: Os dados refletem o estado atual do banco de dados
5. **Despesas Calculadas**: Baseadas no valor mensal padrão configurado e total de moradores
6. **Valor Mensal Padrão**: Obtido da configuração do sistema (endpoint `/api/configuracoes/valor-mensal`)
7. **Contagem de Moradores**: Considera todos os moradores cadastrados até a data do mês analisado
8. **Filtros Opcionais**: Se não informados, usa o mês e ano atuais como referência
9. **Validação**: O mês deve estar entre 1 e 12; o ano deve ser um número válido
10. **Comparações**: Sempre compara com o período imediatamente anterior (mês anterior ou ano anterior)

---

## 🔐 Autenticação

Todos os endpoints requerem token JWT válido:

```http
GET /api/administracao/metricas HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**401 Unauthorized** - Token inválido ou ausente:
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 📅 Dashboard Mensal por Dia

**GET** `/api/administracao/dashboard-mensal`

Retorna a receita, despesa e lucro de cada dia do mês especificado.

### Query Parameters (Obrigatórios):
- **mes** (número): Mês desejado (1-12)
- **ano** (número): Ano desejado (ex: 2025)

### Exemplo de Requisição:
```bash
curl -X GET "http://localhost:3000/api/administracao/dashboard-mensal?mes=12&ano=2025" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
{
  "mes": 12,
  "ano": 2025,
  "nomeMes": "Dezembro",
  "mesAno": "Dezembro/2025",
  "diasNoMes": 31,
  "totalMoradores": 150,
  "moradoresPagantes": 145,
  "moradoresNaoPagantes": 5,
  "valorMensalPadrao": 50.00,
  "dias": [
    {
      "dia": 1,
      "data": "2025-12-01",
      "receita": 0.00,
      "valorRecebido": 0.00,
      "despesa": 0.00,
      "lucro": 0.00
    },
    {
      "dia": 2,
      "data": "2025-12-02",
      "receita": 100.00,
      "valorRecebido": 110.00,
      "despesa": 0.00,
      "lucro": 10.00
    },
    {
      "dia": 3,
      "data": "2025-12-03",
      "receita": 150.00,
      "valorRecebido": 150.00,
      "despesa": 0.00,
      "lucro": 0.00
    },
    {
      "dia": 31,
      "data": "2025-12-31",
      "receita": 500.00,
      "valorRecebido": 200.00,
      "despesa": 300.00,
      "lucro": 0.00
    }
  ],
  "resumo": {
    "totalReceita": 7500.00,
    "totalRecebido": 7250.50,
    "totalDespesa": 249.50,
    "totalLucro": 0.00,
    "percentualRecebido": 96.67
  }
}
```

### Campos de Resposta:

#### Informações do Mês
- **mes**: Número do mês (1-12)
- **ano**: Ano
- **nomeMes**: Nome do mês por extenso
- **mesAno**: String formatada "Mês/Ano"
- **diasNoMes**: Quantidade de dias no mês (28-31)
- **totalMoradores**: Total de moradores cadastrados até o fim do mês
- **moradoresPagantes**: Quantidade de moradores que pagaram no mês
- **moradoresNaoPagantes**: Quantidade de moradores que não pagaram
- **valorMensalPadrao**: Valor configurado que cada morador deve pagar

#### Array `dias`
Cada objeto no array representa um dia do mês:
- **dia**: Número do dia (1-31)
- **data**: Data no formato ISO (YYYY-MM-DD)
- **receita**: Valor esperado no dia (valorMensalPadrao × quantidade de moradores que pagaram neste dia)
  - **Regra**: A receita só aparece no dia em que o pagamento foi feito
  - **Exceção**: Moradores que não pagaram têm sua receita acumulada no último dia do mês
- **valorRecebido**: Valor efetivamente recebido no dia (soma dos pagamentos)
- **despesa**: Diferença negativa (quando valorRecebido < receita)
- **lucro**: Diferença positiva (quando valorRecebido > receita)

**Exemplo de comportamento:**
- Se 2 moradores pagaram no dia 2: `receita dia 2 = R$ 100` (2 × R$ 50)
- Se 3 moradores pagaram no dia 5: `receita dia 5 = R$ 150` (3 × R$ 50)
- Se 5 moradores não pagaram o mês todo: `receita dia 31 += R$ 250` (5 × R$ 50)
- Dias sem pagamentos: `receita = R$ 0`

**Regras de cálculo por dia:**
```javascript
if (valorRecebido > receita) {
  lucro = valorRecebido - receita;
  despesa = 0;
} else if (valorRecebido < receita) {
  despesa = receita - valorRecebido;
  lucro = 0;
} else {
  lucro = 0;
  despesa = 0;
}
```

#### Objeto `resumo`
Totalizadores do mês completo:
- **totalReceita**: Soma da receita esperada de todos os dias
- **totalRecebido**: Soma dos valores recebidos em todos os dias
- **totalDespesa**: Soma das despesas de todos os dias
- **totalLucro**: Soma dos lucros de todos os dias
- **percentualRecebido**: Percentual do total recebido em relação ao esperado

---

### Exemplo de Implementação Frontend:

```jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardMensal() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear()
  });

  const carregarDados = () => {
    setLoading(true);
    fetch(`http://localhost:3000/api/administracao/dashboard-mensal?mes=${filtro.mes}&ano=${filtro.ano}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarDados();
  }, [filtro]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="dashboard-mensal">
      <h1>Dashboard Mensal - {dados.mesAno}</h1>

      {/* Filtros */}
      <div className="filtros">
        <select 
          value={filtro.mes} 
          onChange={(e) => setFiltro({...filtro, mes: parseInt(e.target.value)})}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2000, i).toLocaleString('pt-BR', { month: 'long' })}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          value={filtro.ano}
          onChange={(e) => setFiltro({...filtro, ano: parseInt(e.target.value)})}
        />
      </div>

      {/* Cards de Resumo */}
      <div className="cards-resumo">
        <div className="card">
          <h3>Total Esperado</h3>
          <div className="value">
            R$ {dados.resumo.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card">
          <h3>Total Recebido</h3>
          <div className="value">
            R$ {dados.resumo.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="subtitle">{dados.resumo.percentualRecebido}%</div>
        </div>
        <div className="card despesa">
          <h3>Total Despesas</h3>
          <div className="value">
            R$ {dados.resumo.totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card lucro">
          <h3>Total Lucro</h3>
          <div className="value">
            R$ {dados.resumo.totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="grafico">
        <h2>Receita vs Valor Recebido por Dia</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dados.dias}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            />
            <Legend />
            <Bar dataKey="receita" fill="#82ca9d" name="Receita Esperada" />
            <Bar dataKey="valorRecebido" fill="#8884d8" name="Valor Recebido" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela Detalhada */}
      <div className="tabela-dias">
        <h2>Detalhamento por Dia</h2>
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Data</th>
              <th>Receita Esperada</th>
              <th>Valor Recebido</th>
              <th>Despesa</th>
              <th>Lucro</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dados.dias.map((dia) => (
              <tr key={dia.dia}>
                <td>{dia.dia}</td>
                <td>{new Date(dia.data).toLocaleDateString('pt-BR')}</td>
                <td>R$ {dia.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>R$ {dia.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="despesa">
                  {dia.despesa > 0 ? `R$ ${dia.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                </td>
                <td className="lucro">
                  {dia.lucro > 0 ? `R$ ${dia.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                </td>
                <td>
                  <span className={`badge ${dia.lucro > 0 ? 'lucro' : dia.despesa > 0 ? 'despesa' : 'neutro'}`}>
                    {dia.lucro > 0 ? 'Lucro' : dia.despesa > 0 ? 'Despesa' : 'Ok'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Informações Adicionais */}
      <div className="info-adicional">
        <p><strong>Total de Moradores:</strong> {dados.totalMoradores}</p>
        <p><strong>Moradores Pagantes:</strong> {dados.moradoresPagantes}</p>
        <p><strong>Moradores Não Pagantes:</strong> {dados.moradoresNaoPagantes}</p>
        <p><strong>Valor Mensal Padrão:</strong> R$ {dados.valorMensalPadrao.toFixed(2)}</p>
        <p><strong>Dias no Mês:</strong> {dados.diasNoMes}</p>
      </div>
    </div>
  );
}
```

---

## 📆 Dashboard Anual por Mês

**GET** `/api/administracao/dashboard-anual`

Retorna a receita, despesa e lucro de cada mês do ano especificado.

### Query Parameters (Obrigatórios):
- **ano** (número): Ano desejado (ex: 2025)

### Exemplo de Requisição:
```bash
curl -X GET "http://localhost:3000/api/administracao/dashboard-anual?ano=2025" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Response (200 OK):
```json
{
  "ano": 2025,
  "valorMensalPadrao": 50.00,
  "meses": [
    {
      "mes": 1,
      "nomeMes": "Janeiro",
      "mesAno": "Janeiro/2025",
      "receita": 7000.00,
      "valorRecebido": 7200.00,
      "despesa": 0.00,
      "lucro": 200.00,
      "totalMoradores": 140
    },
    {
      "mes": 2,
      "nomeMes": "Fevereiro",
      "mesAno": "Fevereiro/2025",
      "receita": 7100.00,
      "valorRecebido": 6900.00,
      "despesa": 200.00,
      "lucro": 0.00,
      "totalMoradores": 142
    },
    {
      "mes": 3,
      "nomeMes": "Março",
      "mesAno": "Março/2025",
      "receita": 7150.00,
      "valorRecebido": 7150.00,
      "despesa": 0.00,
      "lucro": 0.00,
      "totalMoradores": 143
    },
    {
      "mes": 4,
      "nomeMes": "Abril",
      "mesAno": "Abril/2025",
      "receita": 7250.00,
      "valorRecebido": 7450.00,
      "despesa": 0.00,
      "lucro": 200.00,
      "totalMoradores": 145
    }
  ],
  "resumo": {
    "totalReceita": 86500.00,
    "totalRecebido": 84200.50,
    "totalDespesa": 2299.50,
    "totalLucro": 0.00,
    "percentualRecebido": 97.34
  }
}
```

### Campos de Resposta:

#### Informações do Ano
- **ano**: Ano de referência
- **valorMensalPadrao**: Valor configurado que cada morador deve pagar

#### Array `meses`
Cada objeto no array representa um mês do ano:
- **mes**: Número do mês (1-12)
- **nomeMes**: Nome do mês por extenso
- **mesAno**: String formatada "Mês/Ano"
- **receita**: Valor esperado no mês (totalMoradores × valorMensalPadrao)
- **valorRecebido**: Valor efetivamente recebido no mês (soma dos pagamentos)
- **despesa**: Diferença negativa (quando valorRecebido < receita)
- **lucro**: Diferença positiva (quando valorRecebido > receita)
- **totalMoradores**: Total de moradores cadastrados até o fim do mês

**Regras de cálculo por mês:**
```javascript
if (valorRecebido > receita) {
  lucro = valorRecebido - receita;
  despesa = 0;
} else if (valorRecebido < receita) {
  despesa = receita - valorRecebido;
  lucro = 0;
} else {
  lucro = 0;
  despesa = 0;
}
```

#### Objeto `resumo`
Totalizadores do ano completo:
- **totalReceita**: Soma da receita esperada de todos os meses
- **totalRecebido**: Soma dos valores recebidos em todos os meses
- **totalDespesa**: Soma das despesas de todos os meses
- **totalLucro**: Soma dos lucros de todos os meses
- **percentualRecebido**: Percentual do total recebido em relação ao esperado

---

### Exemplo de Implementação Frontend:

```jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardAnual() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ano, setAno] = useState(new Date().getFullYear());

  const carregarDados = () => {
    setLoading(true);
    fetch(`http://localhost:3000/api/administracao/dashboard-anual?ano=${ano}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarDados();
  }, [ano]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="dashboard-anual">
      <div className="header">
        <h1>Dashboard Anual - {dados.ano}</h1>
        <div className="filtro-ano">
          <label>Ano:</label>
          <input 
            type="number" 
            value={ano}
            onChange={(e) => setAno(parseInt(e.target.value))}
            min="2020"
            max="2030"
          />
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="cards-resumo">
        <div className="card">
          <h3>Total Esperado</h3>
          <div className="value">
            R$ {dados.resumo.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card">
          <h3>Total Recebido</h3>
          <div className="value">
            R$ {dados.resumo.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="subtitle">{dados.resumo.percentualRecebido}%</div>
        </div>
        <div className="card despesa">
          <h3>Total Despesas</h3>
          <div className="value">
            R$ {dados.resumo.totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card lucro">
          <h3>Total Lucro</h3>
          <div className="value">
            R$ {dados.resumo.totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Gráfico de Linha - Evolução Anual */}
      <div className="grafico">
        <h2>Evolução Anual</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dados.meses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nomeMes" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            />
            <Legend />
            <Line type="monotone" dataKey="receita" stroke="#82ca9d" name="Receita Esperada" strokeWidth={2} />
            <Line type="monotone" dataKey="valorRecebido" stroke="#8884d8" name="Valor Recebido" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras - Comparativo */}
      <div className="grafico">
        <h2>Comparativo Mensal</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dados.meses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nomeMes" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            />
            <Legend />
            <Bar dataKey="receita" fill="#82ca9d" name="Receita Esperada" />
            <Bar dataKey="valorRecebido" fill="#8884d8" name="Valor Recebido" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela Detalhada */}
      <div className="tabela-meses">
        <h2>Detalhamento por Mês</h2>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Moradores</th>
              <th>Receita Esperada</th>
              <th>Valor Recebido</th>
              <th>Despesa</th>
              <th>Lucro</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dados.meses.map((mes) => (
              <tr key={mes.mes}>
                <td>{mes.nomeMes}</td>
                <td>{mes.totalMoradores}</td>
                <td>R$ {mes.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>R$ {mes.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="despesa">
                  {mes.despesa > 0 ? `R$ ${mes.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                </td>
                <td className="lucro">
                  {mes.lucro > 0 ? `R$ ${mes.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                </td>
                <td>
                  <span className={`badge ${mes.lucro > 0 ? 'lucro' : mes.despesa > 0 ? 'despesa' : 'neutro'}`}>
                    {mes.lucro > 0 ? 'Lucro' : mes.despesa > 0 ? 'Despesa' : 'Ok'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan="2"><strong>TOTAL</strong></td>
              <td><strong>R$ {dados.resumo.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></td>
              <td><strong>R$ {dados.resumo.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></td>
              <td className="despesa"><strong>R$ {dados.resumo.totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></td>
              <td className="lucro"><strong>R$ {dados.resumo.totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></td>
              <td><strong>{dados.resumo.percentualRecebido}%</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Informações Adicionais */}
      <div className="info-adicional">
        <p><strong>Valor Mensal Padrão:</strong> R$ {dados.valorMensalPadrao.toFixed(2)}</p>
        <p><strong>Meses Analisados:</strong> {dados.meses.length}</p>
      </div>
    </div>
  );
}
```

### Estilos CSS Adicionais:

```css
.dashboard-anual .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filtro-ano {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filtro-ano label {
  font-weight: 600;
}

.filtro-ano input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  width: 100px;
}

.total-row {
  background-color: #f8f9fa;
  font-size: 16px;
}

.total-row td {
  padding: 16px 12px !important;
  border-top: 2px solid #495057;
}

.badge.neutro {
  background-color: #e2e3e5;
  color: #383d41;
}

.badge.lucro {
  background-color: #d4edda;
  color: #155724;
}

.badge.despesa {
  background-color: #f8d7da;
  color: #721c24;
}
```

---
