"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Plus } from "lucide-react"

// Dados simulados de pagamentos
const payments = [
  {
    id: "1",
    user: "Maria Silva",
    amount: 250.0,
    date: "2023-06-15",
    status: "pago",
    method: "Cartão de Crédito",
  },
  {
    id: "2",
    user: "João Santos",
    amount: 150.0,
    date: "2023-06-14",
    status: "pago",
    method: "Boleto",
  },
  {
    id: "3",
    user: "Ana Oliveira",
    amount: 350.0,
    date: "2023-06-13",
    status: "pendente",
    method: "Pix",
  },
  {
    id: "4",
    user: "Carlos Ferreira",
    amount: 200.0,
    date: "2023-06-12",
    status: "pago",
    method: "Cartão de Crédito",
  },
  {
    id: "5",
    user: "Lúcia Mendes",
    amount: 180.0,
    date: "2023-06-10",
    status: "atrasado",
    method: "Boleto",
  },
  {
    id: "6",
    user: "Roberto Alves",
    amount: 220.0,
    date: "2023-06-09",
    status: "pago",
    method: "Pix",
  },
  {
    id: "7",
    user: "Fernanda Lima",
    amount: 300.0,
    date: "2023-06-08",
    status: "pendente",
    method: "Cartão de Crédito",
  },
  {
    id: "8",
    user: "Ricardo Souza",
    amount: 175.0,
    date: "2023-06-07",
    status: "pago",
    method: "Boleto",
  },
  {
    id: "9",
    user: "Patrícia Costa",
    amount: 190.0,
    date: "2023-06-06",
    status: "atrasado",
    method: "Pix",
  },
  {
    id: "10",
    user: "Eduardo Martins",
    amount: 210.0,
    date: "2023-06-05",
    status: "pago",
    method: "Cartão de Crédito",
  },
]

export function PaymentsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPayments = payments.filter(
    (payment) =>
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pagamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-[250px]"
          />
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Pagamento
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Método</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.user}</TableCell>
                <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "pago"
                        ? "outline"
                        : payment.status === "pendente"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar pagamento</DropdownMenuItem>
                      <DropdownMenuItem>Emitir recibo</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Cancelar pagamento</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
