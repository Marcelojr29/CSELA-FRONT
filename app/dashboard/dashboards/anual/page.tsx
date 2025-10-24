"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Settings } from "lucide-react"
import { DashboardMensal } from "@/components/dashboard/dashboards/dashboard-mensal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-context"
import { UserRole } from "@/types/user"

const defaultFormulas = {
  totalArrecadado: "SUM(pagamentos WHERE status = 'pago' AND mes = mes_atual)",
  totalPendente: "SUM(pagamentos WHERE status = 'pendente' AND mes = mes_atual)",
  totalGeral: "totalArrecadado + totalPendente",
  taxaAdimplencia: "(totalArrecadado / totalGeral) * 100",
}

export default function DashboardMensalPage() {
  const [formulas, setFormulas] = useState(defaultFormulas)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const { user } = useAuth()
  const isContador = user?.role === UserRole.ACCOUNTANT

  const handleSave = () => {
    setIsConfigOpen(false)
  }

  const handleReset = () => {
    setFormulas(defaultFormulas)
  }

  const totalArrecadado = 24565.0
  const totalPendente = 8350.0
  const totalGeral = totalArrecadado + totalPendente
  const taxaAdimplencia = (totalArrecadado / totalGeral) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Mensal</h1>
        <div className="flex items-center gap-2">
          {isContador && (
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar Cálculos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Configurar Fórmulas de Cálculo</DialogTitle>
                  <DialogDescription>
                    Configure as fórmulas usadas para calcular os valores do dashboard mensal
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="formulas" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="formulas">Editar Fórmulas</TabsTrigger>
                    <TabsTrigger value="preview">Prévia</TabsTrigger>
                  </TabsList>

                  <TabsContent value="formulas" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalArrecadado">Total Arrecadado</Label>
                      <Textarea
                        id="totalArrecadado"
                        value={formulas.totalArrecadado}
                        onChange={(e) => setFormulas({ ...formulas, totalArrecadado: e.target.value })}
                        className="font-mono text-sm"
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Fórmula para calcular o total de pagamentos recebidos no mês
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="totalPendente">Total Pendente</Label>
                      <Textarea
                        id="totalPendente"
                        value={formulas.totalPendente}
                        onChange={(e) => setFormulas({ ...formulas, totalPendente: e.target.value })}
                        className="font-mono text-sm"
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Fórmula para calcular o total de pagamentos pendentes no mês
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="totalGeral">Total Geral</Label>
                      <Textarea
                        id="totalGeral"
                        value={formulas.totalGeral}
                        onChange={(e) => setFormulas({ ...formulas, totalGeral: e.target.value })}
                        className="font-mono text-sm"
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Fórmula para calcular o total geral (arrecadado + pendente)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxaAdimplencia">Taxa de Adimplência</Label>
                      <Textarea
                        id="taxaAdimplencia"
                        value={formulas.taxaAdimplencia}
                        onChange={(e) => setFormulas({ ...formulas, taxaAdimplencia: e.target.value })}
                        className="font-mono text-sm"
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Fórmula para calcular a porcentagem de adimplência
                      </p>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave}>Salvar Configurações</Button>
                      <Button variant="outline" onClick={handleReset}>
                        Restaurar Padrão
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4 mt-4">
                    <div className="grid gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Total Arrecadado</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-xs bg-muted p-2 rounded block mb-2">{formulas.totalArrecadado}</code>
                          <p className="text-2xl font-bold text-green-600">R$ {totalArrecadado.toFixed(2)}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Total Pendente</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-xs bg-muted p-2 rounded block mb-2">{formulas.totalPendente}</code>
                          <p className="text-2xl font-bold text-red-600">R$ {totalPendente.toFixed(2)}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Total Geral</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-xs bg-muted p-2 rounded block mb-2">{formulas.totalGeral}</code>
                          <p className="text-2xl font-bold">R$ {totalGeral.toFixed(2)}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Taxa de Adimplência</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-xs bg-muted p-2 rounded block mb-2">{formulas.taxaAdimplencia}</code>
                          <p className="text-2xl font-bold text-blue-600">{taxaAdimplencia.toFixed(2)}%</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar para Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Arrecadado</CardTitle>
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
            <div className="text-2xl font-bold text-green-600">R$ {totalArrecadado.toFixed(2)}</div>
            {isContador && (
              <p className="text-xs text-muted-foreground font-mono mt-1 truncate" title={formulas.totalArrecadado}>
                {formulas.totalArrecadado}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
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
            <div className="text-2xl font-bold text-red-600">R$ {totalPendente.toFixed(2)}</div>
            {isContador && (
              <p className="text-xs text-muted-foreground font-mono mt-1 truncate" title={formulas.totalPendente}>
                {formulas.totalPendente}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
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
            <div className="text-2xl font-bold">R$ {totalGeral.toFixed(2)}</div>
            {isContador && (
              <p className="text-xs text-muted-foreground font-mono mt-1 truncate" title={formulas.totalGeral}>
                {formulas.totalGeral}
              </p>
            )}
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
            <div className="text-2xl font-bold text-blue-600">{taxaAdimplencia.toFixed(2)}%</div>
            {isContador && (
              <p className="text-xs text-muted-foreground font-mono mt-1 truncate" title={formulas.taxaAdimplencia}>
                {formulas.taxaAdimplencia}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pagamentos Diários</CardTitle>
          <CardDescription>Valores arrecadados por dia durante o mês atual</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardMensal />
        </CardContent>
      </Card>
    </div>
  )
}
