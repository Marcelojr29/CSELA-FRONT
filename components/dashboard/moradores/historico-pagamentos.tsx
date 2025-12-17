"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Eye, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/components/auth/auth-context"
import { UserRole } from "@/types/user"
import { pagamentosApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface Payment {
  id: string
  mes: number
  ano: number
  mesAno: string
  valor: number
  dataPagamento: string
  metodo: string
  status: "Pago" | "Pendente" | "Atrasado"
  comprovante?: string
  observacao?: string
  criadoEm: string
}

export function HistoricoPagamentos({ moradorId }: { moradorId: string }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedComprovante, setSelectedComprovante] = useState<string | null>(null)

  // Buscar histórico de pagamentos
  useEffect(() => {
    const fetchHistorico = async () => {
      setIsLoading(true)
      try {
        const response = await pagamentosApi.getHistorico(moradorId)
        if (response.error) {
          throw new Error(response.error)
        }
        setPayments(response.data || [])
      } catch (error: any) {
        toast({
          title: "Erro ao carregar histórico",
          description: error.message || "Ocorreu um erro inesperado",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistorico()
  }, [moradorId, toast])

  const isContador = user?.role === UserRole.ADMIN

  const handleDownload = (payment: Payment) => {
    if (!payment.comprovante) return
    const link = document.createElement('a')
    link.href = payment.comprovante
    link.download = `comprovante-${payment.mesAno}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Carregando histórico...</span>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum pagamento registrado ainda
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mês/Ano</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comprovante</TableHead>
              {isContador && <TableHead>Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.mesAno}</TableCell>
                <TableCell>R$ {payment.valor}</TableCell>
                <TableCell>{new Date(payment.dataPagamento).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.metodo}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={payment.status === "Pago" ? "default" : "destructive"}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {payment.comprovante ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedComprovante(payment.comprovante!)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                {isContador && (
                  <TableCell>
                    {payment.comprovante && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(payment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

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
