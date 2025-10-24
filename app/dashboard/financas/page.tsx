"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PaymentRecord {
  id: string
  morador: string
  mes: string
  valor: number
  dataPagamento: string
  metodoPagamento: string
  comprovante: string
}

const mockPayments: PaymentRecord[] = [
  {
    id: "1",
    morador: "João Silva",
    mes: "Janeiro/2024",
    valor: 50.0,
    dataPagamento: "05/01/2024",
    metodoPagamento: "PIX",
    comprovante: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    morador: "Maria Santos",
    mes: "Janeiro/2024",
    valor: 50.0,
    dataPagamento: "03/01/2024",
    metodoPagamento: "Dinheiro",
    comprovante: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    morador: "Pedro Oliveira",
    mes: "Janeiro/2024",
    valor: 50.0,
    dataPagamento: "10/01/2024",
    metodoPagamento: "PIX",
    comprovante: "/placeholder.svg?height=400&width=300",
  },
]

export default function FinancasPage() {
  const [selectedMonth, setSelectedMonth] = useState("Janeiro/2024")
  const [selectedComprovante, setSelectedComprovante] = useState<string | null>(null)

  const handleDownload = (payment: PaymentRecord) => {
    console.log("Downloading comprovante:", payment.id)
  }

  const totalArrecadado = mockPayments.reduce((sum, payment) => sum + payment.valor, 0)

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
              <div className="text-2xl font-bold text-green-600">R$ {totalArrecadado.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">No mês de {selectedMonth}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagamentos Confirmados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPayments.length}</div>
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
              <div className="text-2xl font-bold">R$ {(totalArrecadado / mockPayments.length).toFixed(2)}</div>
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
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Janeiro/2024">Janeiro/2024</SelectItem>
                  <SelectItem value="Fevereiro/2024">Fevereiro/2024</SelectItem>
                  <SelectItem value="Março/2024">Março/2024</SelectItem>
                </SelectContent>
              </Select>
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
                {mockPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.morador}</TableCell>
                    <TableCell>{payment.mes}</TableCell>
                    <TableCell>R$ {payment.valor.toFixed(2)}</TableCell>
                    <TableCell>{payment.dataPagamento}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.metodoPagamento}</Badge>
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
                ))}
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
