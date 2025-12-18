"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Bell, Download, Users, TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react"
import { NotificationsTable } from "@/components/dashboard/notifications-table"
import { RecentPayments } from "@/components/dashboard/recent-payments"
import { Overview } from "@/components/dashboard/overview"
import { homeApi } from "@/lib/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardData {
  periodo: {
    mesAtual: { mes: number; ano: number; nome: string }
    mesAnterior: { mes: number; ano: number; nome: string }
  }
  moradores: {
    total: number
    novosMesAtual: number
    novosMesAnterior: number
    variacao: number
    tendencia: string
  }
  pagamentos: {
    totalMesAtual: number
    valorTotalMesAtual: number
    valorTotalMesAnterior: number
    variacao: number
    tendencia: string
  }
  adimplencia: {
    taxaMesAtual: number
    taxaMesAnterior: number
    variacao: number
    tendencia: string
    pagantesAtual: number
    esperadosAtual: number
  }
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true)
        const response = await homeApi.getDashboard()
        
        if (response.data) {
          setDashboardData(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const getTrendIcon = (tendencia: string) => {
    if (tendencia === 'crescimento' || tendencia === 'melhora') {
      return <TrendingUp className="h-4 w-4" />
    }
    if (tendencia === 'queda' || tendencia === 'piora') {
      return <TrendingDown className="h-4 w-4" />
    }
    return <Minus className="h-4 w-4" />
  }

  const getTrendColor = (tendencia: string) => {
    if (tendencia === 'crescimento' || tendencia === 'melhora') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (tendencia === 'queda' || tendencia === 'piora') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Notificações
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">5</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações Recentes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-sm">Pagamento em Atraso</span>
                  <span className="text-xs text-muted-foreground ml-auto">2h atrás</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">João Silva - 3 meses em atraso</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-sm">Vencimento Próximo</span>
                  <span className="text-xs text-muted-foreground ml-auto">5h atrás</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">15 moradores com vencimento em 3 dias</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-sm">Pagamento Recebido</span>
                  <span className="text-xs text-muted-foreground ml-auto">1d atrás</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Maria Santos - R$ 45,00</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-sm">Novo Morador</span>
                  <span className="text-xs text-muted-foreground ml-auto">2d atrás</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Carlos Oliveira foi cadastrado</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-sm">Relatório Mensal</span>
                  <span className="text-xs text-muted-foreground ml-auto">3d atrás</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Relatório de dezembro disponível</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              <span className="text-sm text-primary">Ver todas as notificações</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : dashboardData ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.moradores.total}</div>
                <p className="text-xs text-muted-foreground">
                  +{dashboardData.moradores.novosMesAtual} novos este mês
                </p>
                <Badge className={`mt-2 ${getTrendColor(dashboardData.moradores.tendencia)}`}>
                  {getTrendIcon(dashboardData.moradores.tendencia)}
                  <span className="ml-1">
                    {Math.abs(dashboardData.moradores.variacao).toFixed(1)}%
                  </span>
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Arrecadação do Mês</CardTitle>
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
                  R$ {dashboardData.pagamentos.valorTotalMesAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.pagamentos.totalMesAtual} pagamentos confirmados
                </p>
                <Badge className={`mt-2 ${getTrendColor(dashboardData.pagamentos.tendencia)}`}>
                  {getTrendIcon(dashboardData.pagamentos.tendencia)}
                  <span className="ml-1">
                    {Math.abs(dashboardData.pagamentos.variacao).toFixed(1)}%
                  </span>
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
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
                  {dashboardData.adimplencia.esperadosAtual - dashboardData.adimplencia.pagantesAtual}
                </div>
                <p className="text-xs text-muted-foreground">
                  moradores com pagamento pendente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Adimplência</CardTitle>
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.adimplencia.taxaMesAtual.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.adimplencia.pagantesAtual} de {dashboardData.adimplencia.esperadosAtual} moradores
                </p>
                <Badge className={`mt-2 ${getTrendColor(dashboardData.adimplencia.tendencia)}`}>
                  {getTrendIcon(dashboardData.adimplencia.tendencia)}
                  <span className="ml-1">
                    {Math.abs(dashboardData.adimplencia.variacao).toFixed(1)} pontos
                  </span>
                </Badge>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="col-span-4 text-center text-muted-foreground">
            Erro ao carregar dados do dashboard
          </div>
        )}
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          {dashboardData && dashboardData.adimplencia.esperadosAtual - dashboardData.adimplencia.pagantesAtual > 0
            ? `Existem ${dashboardData.adimplencia.esperadosAtual - dashboardData.adimplencia.pagantesAtual} moradores com pagamento pendente neste mês.`
            : 'Todos os pagamentos do mês estão em dia!'}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos Recentes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
              <CardDescription>Pagamentos recebidos nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notificações Pendentes</CardTitle>
                <CardDescription>Moradores que precisam ser notificados</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              <NotificationsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Recentes</CardTitle>
              <CardDescription>Últimos pagamentos registrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentPayments />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
