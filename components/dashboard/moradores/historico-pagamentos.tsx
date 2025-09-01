"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HistoricoPagamento, HistoricoPagamentosProps } from "@/interfaces/IHistoricoPagamento"

// Dados simulados do histórico
const historicoData: HistoricoPagamento[] = [
  {
    id: "1",
    mes: "Junho",
    ano: 2024,
    valor: 50.0,
    metodoPagamento: "pix",
    dataPagamento: "15/06/2024",
    comprovante: "comprovante-junho-2024.pdf",
    observacao: "Pagamento via PIX",
    registradoPor: "Admin",
  },
  {
    id: "2",
    mes: "Maio",
    ano: 2024,
    valor: 50.0,
    metodoPagamento: "dinheiro",
    dataPagamento: "10/05/2024",
    observacao: "Pagamento em dinheiro",
    registradoPor: "Admin",
  },
  {
    id: "3",
    mes: "Abril",
    ano: 2024,
    valor: 50.0,
    metodoPagamento: "dinheiro",
    dataPagamento: "08/04/2024",
    observacao: "Pagamento em dinheiro",
    registradoPor: "Admin",
  },
  {
    id: "4",
    mes: "Março",
    ano: 2024,
    valor: 50.0,
    metodoPagamento: "pix",
    dataPagamento: "12/03/2024",
    comprovante: "comprovante-marco-2024.pdf",
    observacao: "Pagamento via PIX",
    registradoPor: "Admin",
  },
]

export function HistoricoPagamentos({ moradorId }: HistoricoPagamentosProps) {
  const [selectedPagamento, setSelectedPagamento] = useState<HistoricoPagamento | null>(null)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mês/Ano</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Registrado por</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicoData.map((pagamento) => (
              <TableRow key={pagamento.id}>
                <TableCell className="font-medium">
                  {pagamento.mes}/{pagamento.ano}
                </TableCell>
                <TableCell>R$ {pagamento.valor.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={pagamento.metodoPagamento === "pix" ? "default" : "secondary"}>
                    {pagamento.metodoPagamento === "pix" ? "PIX" : "Dinheiro"}
                  </Badge>
                </TableCell>
                <TableCell>{pagamento.dataPagamento}</TableCell>
                <TableCell>{pagamento.registradoPor}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPagamento(pagamento)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Detalhes do Pagamento</DialogTitle>
                        <DialogDescription>
                          {pagamento.mes}/{pagamento.ano} - R$ {pagamento.valor.toFixed(2)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Método:</p>
                            <p>{pagamento.metodoPagamento === "pix" ? "PIX" : "Dinheiro"}</p>
                          </div>
                          <div>
                            <p className="font-medium">Data:</p>
                            <p>{pagamento.dataPagamento}</p>
                          </div>
                          <div>
                            <p className="font-medium">Registrado por:</p>
                            <p>{pagamento.registradoPor}</p>
                          </div>
                          <div>
                            <p className="font-medium">Valor:</p>
                            <p>R$ {pagamento.valor.toFixed(2)}</p>
                          </div>
                        </div>

                        {pagamento.observacao && (
                          <div>
                            <p className="font-medium text-sm">Observação:</p>
                            <p className="text-sm text-muted-foreground">{pagamento.observacao}</p>
                          </div>
                        )}

                        {pagamento.comprovante && (
                          <div>
                            <p className="font-medium text-sm mb-2">Comprovante:</p>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <FileText className="mr-2 h-4 w-4" />
                              Visualizar Comprovante
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {historicoData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum pagamento registrado ainda.</p>
        </div>
      )}
    </div>
  )
}
