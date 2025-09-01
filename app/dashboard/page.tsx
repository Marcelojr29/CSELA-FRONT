import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Bell, Download, Users } from "lucide-react"
import { NotificationsTable } from "@/components/dashboard/notifications-table"
import { RecentPayments } from "@/components/dashboard/recent-payments"
import { Overview } from "@/components/dashboard/overview"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15 no último mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos do Mês</CardTitle>
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
            <div className="text-2xl font-bold">R$ 24.565,00</div>
            <p className="text-xs text-muted-foreground">+12.5% do mês anterior</p>
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
            <div className="text-2xl font-bold">R$ 8.350,00</div>
            <p className="text-xs text-muted-foreground">167 moradores com pagamentos pendentes</p>
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
            <div className="text-2xl font-bold">86.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% do mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Existem 32 moradores com mais de 3 meses de atraso que precisam ser notificados sobre o corte de fornecimento.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
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
