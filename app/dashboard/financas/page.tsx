"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import { FinancasMoradoresTable } from "@/components/dashboard/financas/financas-moradores-table"
import { PagamentosRecentes } from "@/components/dashboard/financas/pagamentos-recentes"
import { useAuth } from "@/components/auth/auth-context"
import { UserRole } from "@/types/user"

export default function FinancasPage() {
  const { user } = useAuth()
  const isFuncionario = user?.role === UserRole.EMPLOYEE

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Finanças</h1>
        {!isFuncionario && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar Relatório
            </Button>
          </div>
        )}
      </div>

      {/* Cards de estatísticas - apenas para não funcionários */}
      {!isFuncionario && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <div className="text-2xl font-bold">R$ 24.565,00</div>
              <p className="text-xs text-muted-foreground">+12.5% do mês anterior</p>
            </CardContent>
          </Card>

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
              <div className="text-2xl font-bold">R$ 287.350,00</div>
              <p className="text-xs text-muted-foreground">+8.2% do ano anterior</p>
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
      )}

      <Tabs defaultValue="moradores" className="space-y-4">
        <TabsList>
          <TabsTrigger value="moradores">Moradores</TabsTrigger>
          {!isFuncionario && <TabsTrigger value="pagamentos">Pagamentos Recentes</TabsTrigger>}
        </TabsList>
        <TabsContent value="moradores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moradores</CardTitle>
              <CardDescription>
                {isFuncionario
                  ? "Visualize os dados financeiros dos moradores"
                  : "Registre os pagamentos realizados no escritório"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FinancasMoradoresTable />
            </CardContent>
          </Card>
        </TabsContent>
        {!isFuncionario && (
          <TabsContent value="pagamentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pagamentos Recentes</CardTitle>
                <CardDescription>Últimos pagamentos registrados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <PagamentosRecentes />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
