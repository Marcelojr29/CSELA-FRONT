import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import { GanhosMensais } from "@/components/dashboard/administracao/ganhos-mensais"
import { GanhosAnuais } from "@/components/dashboard/administracao/ganhos-anuais"
import { DatePickerWithRange } from "@/components/dashboard/administracao/date-range-picker"

export default function AdministracaoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Administração</h1>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar para Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <div className="text-2xl font-bold">R$ 12.350,00</div>
            <p className="text-xs text-muted-foreground">-5.2% do mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido (Mês)</CardTitle>
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
            <div className="text-2xl font-bold">R$ 12.215,00</div>
            <p className="text-xs text-muted-foreground">+18.3% do mês anterior</p>
          </CardContent>
        </Card>
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
