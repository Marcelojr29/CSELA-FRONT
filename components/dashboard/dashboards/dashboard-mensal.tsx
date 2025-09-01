"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Dados simulados para o dashboard mensal (Janeiro 2024)
const dadosMensais = [
  { dia: "01", pagamentos: 1200, pendentes: 800 },
  { dia: "02", pagamentos: 1500, pendentes: 600 },
  { dia: "03", pagamentos: 1800, pendentes: 400 },
  { dia: "04", pagamentos: 1100, pendentes: 900 },
  { dia: "05", pagamentos: 2200, pendentes: 300 },
  { dia: "06", pagamentos: 1900, pendentes: 500 },
  { dia: "07", pagamentos: 1600, pendentes: 700 },
  { dia: "08", pagamentos: 2100, pendentes: 200 },
  { dia: "09", pagamentos: 1400, pendentes: 800 },
  { dia: "10", pagamentos: 1700, pendentes: 600 },
  { dia: "11", pagamentos: 2000, pendentes: 400 },
  { dia: "12", pagamentos: 1300, pendentes: 900 },
  { dia: "13", pagamentos: 1800, pendentes: 500 },
  { dia: "14", pagamentos: 2300, pendentes: 100 },
  { dia: "15", pagamentos: 1900, pendentes: 400 },
  { dia: "16", pagamentos: 1600, pendentes: 700 },
  { dia: "17", pagamentos: 2100, pendentes: 300 },
  { dia: "18", pagamentos: 1500, pendentes: 800 },
  { dia: "19", pagamentos: 1800, pendentes: 500 },
  { dia: "20", pagamentos: 2200, pendentes: 200 },
  { dia: "21", pagamentos: 1700, pendentes: 600 },
  { dia: "22", pagamentos: 1900, pendentes: 400 },
  { dia: "23", pagamentos: 2000, pendentes: 300 },
  { dia: "24", pagamentos: 1400, pendentes: 900 },
  { dia: "25", pagamentos: 1800, pendentes: 500 },
  { dia: "26", pagamentos: 2100, pendentes: 200 },
  { dia: "27", pagamentos: 1600, pendentes: 700 },
  { dia: "28", pagamentos: 1900, pendentes: 400 },
  { dia: "29", pagamentos: 2200, pendentes: 100 },
  { dia: "30", pagamentos: 1800, pendentes: 500 },
  { dia: "31", pagamentos: 2000, pendentes: 300 },
]

// Calcular totais
const totalPagamentos = dadosMensais.reduce((acc, item) => acc + item.pagamentos, 0)
const totalPendentes = dadosMensais.reduce((acc, item) => acc + item.pendentes, 0)
const totalGeral = totalPagamentos + totalPendentes

// Formatador para valores em reais
const formatarReal = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}

// Tooltip customizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{`Dia ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${formatarReal(entry.value)}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DashboardMensal() {
  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Arrecadado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatarReal(totalPagamentos)}</div>
            <p className="text-xs text-muted-foreground">Pagamentos recebidos no mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatarReal(totalPendentes)}</div>
            <p className="text-xs text-muted-foreground">Pagamentos em atraso no mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarReal(totalGeral)}</div>
            <p className="text-xs text-muted-foreground">Soma de todos os valores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Adimplência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{((totalPagamentos / totalGeral) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Percentual de pagamentos recebidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de barras */}
      <Card>
        <CardHeader>
          <CardTitle>Pagamentos Diários - Janeiro 2024</CardTitle>
          <CardDescription>Comparativo entre pagamentos recebidos e pendentes por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={dadosMensais}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" tick={{ fontSize: 12 }} interval={2} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => formatarReal(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pagamentos" name="Pagamentos Recebidos" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pendentes" name="Pagamentos Pendentes" fill="#f43f5e" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Estatísticas adicionais */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo do Período</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Maior arrecadação em um dia:</span>
              <span className="font-medium text-green-600">
                {formatarReal(Math.max(...dadosMensais.map((d) => d.pagamentos)))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Menor arrecadação em um dia:</span>
              <span className="font-medium text-red-600">
                {formatarReal(Math.min(...dadosMensais.map((d) => d.pagamentos)))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média diária:</span>
              <span className="font-medium">{formatarReal(totalPagamentos / dadosMensais.length)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Dias com 100% de adimplência:</span>
              <span className="font-medium text-green-600">
                {dadosMensais.filter((d) => d.pendentes === 0).length} dias
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Análise de Tendências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Primeira quinzena:</span>
              <span className="font-medium">
                {formatarReal(dadosMensais.slice(0, 15).reduce((acc, d) => acc + d.pagamentos, 0))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Segunda quinzena:</span>
              <span className="font-medium">
                {formatarReal(dadosMensais.slice(15).reduce((acc, d) => acc + d.pagamentos, 0))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Melhor semana:</span>
              <span className="font-medium text-green-600">3ª semana</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Pior semana:</span>
              <span className="font-medium text-red-600">1ª semana</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
