"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { GanhosMensais } from "@/components/dashboard/administracao/ganhos-mensais"
import { GanhosAnuais } from "@/components/dashboard/administracao/ganhos-anuais"
import { administracaoApi } from "@/lib/api"

interface MetricasData {
  arrecadacaoAnual: {
    anoAtual: {
      ano: number
      total: number
      quantidadePagamentos: number
    }
    anoAnterior: {
      ano: number
      total: number
      quantidadePagamentos: number
    }
    variacao: number
    diferencaAbsoluta: number
    tendencia: string
  }
  arrecadacaoMensal: {
    mesAtual: {
      mes: number
      ano: number
      nomeMes: string
      mesAno: string
      total: number
      quantidadePagamentos: number
    }
    mesAnterior: {
      mes: number
      ano: number
      nomeMes: string
      mesAno: string
      total: number
      quantidadePagamentos: number
    }
    variacao: number
    diferencaAbsoluta: number
    tendencia: string
  }
  despesasMensal: {
    mesAtual: {
      mes: number
      ano: number
      nomeMes: string
      mesAno: string
      valorEsperado: number
      valorArrecadado: number
      despesa: number
      totalMoradores: number
      valorMensalPadrao: number
      percentualArrecadado: number
    }
    mesAnterior: {
      mes: number
      ano: number
      nomeMes: string
      mesAno: string
      valorEsperado: number
      valorArrecadado: number
      despesa: number
      totalMoradores: number
      valorMensalPadrao: number
      percentualArrecadado: number
    }
    variacao: number
    diferencaAbsoluta: number
    tendencia: string
  }
}

export default function AdministracaoPage() {
  const [metricas, setMetricas] = useState<MetricasData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1)
  const [ano, setAno] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setIsLoading(true)
        const response = await administracaoApi.getMetricas(mes, ano)
        
        if (response.data) {
          setMetricas(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar métricas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetricas()
  }, [mes, ano])

  const getTrendIcon = (tendencia: string) => {
    if (tendencia === 'ganho' || tendencia === 'reducao') {
      return <TrendingUp className="h-4 w-4" />
    }
    if (tendencia === 'perda' || tendencia === 'aumento') {
      return <TrendingDown className="h-4 w-4" />
    }
    return <Minus className="h-4 w-4" />
  }

  const getTrendColor = (tendencia: string) => {
    if (tendencia === 'ganho' || tendencia === 'reducao') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (tendencia === 'perda' || tendencia === 'aumento') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Administração</h1>
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
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar para Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : metricas ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Arrecadado (Ano)</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {metricas.arrecadacaoAnual.anoAtual.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metricas.arrecadacaoAnual.anoAtual.quantidadePagamentos} pagamentos em {metricas.arrecadacaoAnual.anoAtual.ano}
                </p>
                <Badge className={`mt-2 ${getTrendColor(metricas.arrecadacaoAnual.tendencia)}`}>
                  {getTrendIcon(metricas.arrecadacaoAnual.tendencia)}
                  <span className="ml-1">
                    {Math.abs(metricas.arrecadacaoAnual.variacao).toFixed(1)}% vs {metricas.arrecadacaoAnual.anoAnterior.ano}
                  </span>
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Arrecadado (Mês)</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {metricas.arrecadacaoMensal.mesAtual.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metricas.arrecadacaoMensal.mesAtual.quantidadePagamentos} pagamentos em {metricas.arrecadacaoMensal.mesAtual.nomeMes}
                </p>
                <Badge className={`mt-2 ${getTrendColor(metricas.arrecadacaoMensal.tendencia)}`}>
                  {getTrendIcon(metricas.arrecadacaoMensal.tendencia)}
                  <span className="ml-1">
                    {Math.abs(metricas.arrecadacaoMensal.variacao).toFixed(1)}% vs {metricas.arrecadacaoMensal.mesAnterior.nomeMes}
                  </span>
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas (Mês)</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {metricas.despesasMensal.mesAtual.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metricas.despesasMensal.mesAtual.percentualArrecadado.toFixed(1)}% arrecadado de R$ {metricas.despesasMensal.mesAtual.valorEsperado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <Badge className={`mt-2 ${getTrendColor(metricas.despesasMensal.tendencia)}`}>
                  {getTrendIcon(metricas.despesasMensal.tendencia)}
                  <span className="ml-1">
                    {Math.abs(metricas.despesasMensal.variacao).toFixed(1)}% vs {metricas.despesasMensal.mesAnterior.nomeMes}
                  </span>
                </Badge>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="col-span-3 text-center text-muted-foreground">
            Erro ao carregar métricas
          </div>
        )}
      </div>

      <Tabs defaultValue="mensal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mensal">Ganhos Mensais</TabsTrigger>
          <TabsTrigger value="anual">Ganhos Anuais</TabsTrigger>
        </TabsList>
        <TabsContent value="mensal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ganhos Mensais</CardTitle>
              <CardDescription>Visão geral dos ganhos mensais do sistema de distribuição de água</CardDescription>
            </CardHeader>
            <CardContent>
              <GanhosMensais />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="anual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ganhos Anuais</CardTitle>
              <CardDescription>Visão geral dos ganhos anuais do sistema de distribuição de água</CardDescription>
            </CardHeader>
            <CardContent>
              <GanhosAnuais />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
