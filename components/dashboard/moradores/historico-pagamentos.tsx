"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/components/auth/auth-context"
import { UserRole } from "@/types/user"

interface Payment {
  id: string
  mes: string
  valor: number
  dataPagamento: string
  metodoPagamento: string
  status: "pago" | "pendente"
  comprovante?: string
}

const mockPayments: Payment[] = [
  {
    id: "1",
    mes: "Janeiro/2024",
    valor: 50.0,
    dataPagamento: "05/01/2024",
    metodoPagamento: "PIX",
    status: "pago",
    comprovante: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    mes: "Fevereiro/2024",
    valor: 50.0,
    dataPagamento: "03/02/2024",
    metodoPagamento: "Dinheiro",
    status: "pago",
    comprovante: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    mes: "Março/2024",
    valor: 50.0,
    dataPagamento: "10/03/2024",
    metodoPagamento: "PIX",
    status: "pago",
    comprovante: "/placeholder.svg?height=400&width=300",
  },
]

export function HistoricoPagamentos({ moradorId }: { moradorId: string }) {
  const [selectedComprovante, setSelectedComprovante] = useState<string | null>(null)
  const { user } = useAuth()
  const isContador = user?.role === UserRole.ACCOUNTANT

  const handleDownload = (payment: Payment) => {
    // Aqui você implementaria o download real
    console.log("Downloading comprovante:", payment.id)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Comprovante</TableHead>
                <TableHead>Status</TableHead>
                {isContador && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.mes}</TableCell>
                  <TableCell>R$ {payment.valor.toFixed(2)}</TableCell>
                  <TableCell>{payment.dataPagamento}</TableCell>
                  <TableCell>{payment.metodoPagamento}</TableCell>
                  <TableCell>
                    {payment.comprovante ? (
                      <Button variant="ghost" size="sm" onClick={() => setSelectedComprovante(payment.comprovante!)}>
                        <img
                          src={payment.comprovante || "/placeholder.svg"}
                          alt="Comprovante thumbnail"
                          className="h-8 w-8 object-cover rounded"
                        />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">Sem comprovante</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "pago" ? "default" : "secondary"}>
                      {payment.status === "pago" ? "Pago" : "Pendente"}
                    </Badge>
                  </TableCell>
                  {isContador && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedComprovante(payment.comprovante!)}
                          disabled={!payment.comprovante}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(payment)}
                          disabled={!payment.comprovante}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
