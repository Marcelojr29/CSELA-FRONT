"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { financasApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface PaymentRecord {
  id: string
  morador: {
    nome: string
  }
  mesAno: string
  valor: number
  dataPagamento: string
  metodo: string
  comprovante: string
  status: string
}

interface FinancasResponse {
  periodo: {
    mes: number
    ano: number
    mesAno: string
  }
  estatisticas: {
    totalArrecadado: number
    quantidadePagamentosComAnexos: number
    mediaPorMorador: number
  }
  totalPagamentos: number
  valorTotal: number
  pagamentos: PaymentRecord[]
}

export default function FinancasPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedComprovante, setSelectedComprovante] = useState<string | null>(null)
  const [financasData, setFinancasData] = useState<FinancasResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Buscar dados da API
  useEffect(() => {
    const fetchFinancas = async () => {
      setIsLoading(true)
      try {
        const response = await financasApi.getPagamentos(selectedMonth, selectedYear)
        if (response.error) {
          throw new Error(response.error)
        }
        setFinancasData(response.data)
      } catch (error: any) {
        toast({
          title: "Erro ao carregar dados financeiros",
          description: error.message || "Ocorreu um erro inesperado",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFinancas()
  }, [selectedMonth, selectedYear, toast])

  const handleDownload = (payment: PaymentRecord) => {
    // Criar link para download do comprovante
    const link = document.createElement('a')
    link.href = payment.comprovante
    link.download = `comprovante-${payment.morador.nome}-${payment.mesAno}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const totalArrecadado = financasData?.estatisticas.totalArrecadado || 0
  const totalPagamentos = financasData?.totalPagamentos || 0
  const mediaPorMorador = financasData?.estatisticas.mediaPorMorador || 0
  const pagamentos = financasData?.pagamentos || []

  // Gerar lista de meses
  const meses = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
    { value: 10, label: "Outubro" },
    { value: 11, label: "Novembro" },
    { value: 12, label: "Dezembro" },
  ]

  // Gerar lista de anos (últimos 5 anos)
  const currentYear = new Date().getFullYear()
  const anos = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Finanças</h1>
            <p className="text-muted-foreground">Visualize todos os pagamentos confirmados com comprovantes</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
              <div className="text-2xl font-bold text-green-600">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `R$ ${totalArrecadado.toFixed(2)}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {financasData?.periodo.mesAno || "Selecione um período"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagamentos Confirmados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  totalPagamentos
                )}
              </div>
              <p className="text-xs text-muted-foreground">Com comprovantes anexados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média por Pagamento</CardTitle>
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
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `R$ ${mediaPorMorador.toFixed(2)}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">Valor médio por morador</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pagamentos com Comprovante</CardTitle>
                <CardDescription>Apenas pagamentos confirmados e com comprovantes anexados</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(Number(v))}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {meses.map((mes) => (
                      <SelectItem key={mes.value} value={mes.value.toString()}>
                        {mes.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(Number(v))}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {anos.map((ano) => (
                      <SelectItem key={ano} value={ano.toString()}>
                        {ano}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Morador</TableHead>
                  <TableHead>Mês</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Comprovante</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <span className="ml-2">Carregando pagamentos...</span>
                    </TableCell>
                  </TableRow>
                ) : pagamentos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum pagamento com comprovante encontrado para este período
                    </TableCell>
                  </TableRow>
                ) : (
                  pagamentos.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.morador.nome}</TableCell>
                      <TableCell>{payment.mesAno}</TableCell>
                      <TableCell>R$ {payment.valor.toFixed(2)}</TableCell>
                      <TableCell>{new Date(payment.dataPagamento).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.metodo}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedComprovante(payment.comprovante)}>
                          <img
                            src={payment.comprovante || "/placeholder.svg"}
                            alt="Comprovante thumbnail"
                            className="h-8 w-8 object-cover rounded"
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedComprovante(payment.comprovante)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownload(payment)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedComprovante} onOpenChange={() => setSelectedComprovante(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Comprovante de Pagamento</DialogTitle>
            <DialogDescription>Visualização do comprovante anexado</DialogDescription>
          </DialogHeader>
          {selectedComprovante && (
            <div className="mt-4">
              <img
                src={selectedComprovante || "/placeholder.svg"}
                alt="Comprovante"
                className="w-full h-auto rounded-lg border"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
