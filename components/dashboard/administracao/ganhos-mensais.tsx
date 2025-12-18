"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { administracaoApi } from "@/lib/api"

interface DashboardMensalData {
  mes: number
  ano: number
  nomeMes: string
  mesAno: string
  diasNoMes: number
  totalMoradores: number
  moradoresPagantes: number
  moradoresNaoPagantes: number
  valorMensalPadrao: number
  dias: Array<{
    dia: number
    data: string
    receita: number
    valorRecebido: number
    despesa: number
    lucro: number
  }>
  resumo: {
    totalReceita: number
    totalRecebido: number
    totalDespesa: number
    totalLucro: number
    percentualRecebido: number
  }
}

export function GanhosMensais() {
  const [dados, setDados] = useState<DashboardMensalData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1)
  const [ano, setAno] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setIsLoading(true)
        const response = await administracaoApi.getDashboardMensal(mes, ano)
        
        if (response.data) {
          setDados(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar dashboard mensal:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDados()
  }, [mes, ano])

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!dados) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
        Erro ao carregar dados
      </div>
    )
  }

  const chartData = dados.dias.map(dia => ({
    name: dia.dia.toString(),
    receitas: dia.receita,
    valorRecebido: dia.valorRecebido,
    despesas: dia.despesa,
    lucro: dia.lucro
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total Esperado</div>
            <div className="text-lg font-bold">R$ {dados.resumo.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total Recebido</div>
            <div className="text-lg font-bold text-green-600">R$ {dados.resumo.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total Despesas</div>
            <div className="text-lg font-bold text-red-600">R$ {dados.resumo.totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Percentual Arrecadado</div>
            <div className="text-lg font-bold">{dados.resumo.percentualRecebido.toFixed(1)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={mes.toString()} onValueChange={(v) => setMes(Number(v))}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Janeiro</SelectItem>
              <SelectItem value="2">Fevereiro</SelectItem>
              <SelectItem value="3">Março</SelectItem>
              <SelectItem value="4">Abril</SelectItem>
              <SelectItem value="5">Maio</SelectItem>
              <SelectItem value="6">Junho</SelectItem>
              <SelectItem value="7">Julho</SelectItem>
              <SelectItem value="8">Agosto</SelectItem>
              <SelectItem value="9">Setembro</SelectItem>
              <SelectItem value="10">Outubro</SelectItem>
              <SelectItem value="11">Novembro</SelectItem>
              <SelectItem value="12">Dezembro</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ano.toString()} onValueChange={(v) => setAno(Number(v))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              label={{ value: "Dia do Mês", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              label={{ value: "Valor (R$)", angle: -90, position: "insideLeft" }}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                const labels = {
                  receitas: "Receitas Esperadas",
                  valorRecebido: "Valor Recebido",
                  despesas: "Despesas",
                  lucro: "Lucro",
                }
                return [
                  `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                  labels[name as keyof typeof labels] || name,
                ]
              }}
              labelFormatter={(label) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar name="Receitas Esperadas" dataKey="receitas" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
            <Bar name="Valor Recebido" dataKey="valorRecebido" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            <Bar name="Despesas" dataKey="despesas" fill="#f43f5e" radius={[2, 2, 0, 0]} />
            <Bar name="Lucro" dataKey="lucro" fill="#10b981" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
