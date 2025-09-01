"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, MessageSquare, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados de notificações
const notificationsData = [
  {
    id: "1",
    morador: "João Silva",
    endereco: "Rua das Flores, 123",
    mesesAtraso: 3,
    valorDevido: 150.0,
    ultimoPagamento: "2023-03-15",
    status: "pendente",
  },
  {
    id: "2",
    morador: "Maria Oliveira",
    endereco: "Av. Principal, 456",
    mesesAtraso: 4,
    valorDevido: 200.0,
    ultimoPagamento: "2023-02-10",
    status: "notificado",
  },
  {
    id: "3",
    morador: "Pedro Santos",
    endereco: "Rua dos Pinheiros, 789",
    mesesAtraso: 5,
    valorDevido: 250.0,
    ultimoPagamento: "2023-01-05",
    status: "corte_agendado",
  },
  {
    id: "4",
    morador: "Ana Souza",
    endereco: "Alameda Santos, 1011",
    mesesAtraso: 3,
    valorDevido: 150.0,
    ultimoPagamento: "2023-03-20",
    status: "pendente",
  },
  {
    id: "5",
    morador: "Carlos Ferreira",
    endereco: "Rua Augusta, 1213",
    mesesAtraso: 6,
    valorDevido: 300.0,
    ultimoPagamento: "2022-12-15",
    status: "corte_agendado",
  },
]

export function NotificationsTable() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(notificationsData)

  const handleSendNotification = (id: string, type: "email" | "sms") => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, status: "notificado" } : notification)),
    )

    toast({
      title: `Notificação enviada com sucesso`,
      description: `A notificação foi enviada por ${type === "email" ? "e-mail" : "SMS"}.`,
    })
  }

  const handleScheduleCut = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, status: "corte_agendado" } : notification,
      ),
    )

    toast({
      title: "Corte agendado",
      description: "O corte de fornecimento foi agendado com sucesso.",
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "notificado":
        return <Badge variant="secondary">Notificado</Badge>
      case "corte_agendado":
        return <Badge variant="destructive">Corte Agendado</Badge>
      default:
        return <Badge variant="outline">Pendente</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Morador</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Meses em Atraso</TableHead>
          <TableHead>Valor Devido</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications.map((notification) => (
          <TableRow key={notification.id}>
            <TableCell className="font-medium">{notification.morador}</TableCell>
            <TableCell>{notification.endereco}</TableCell>
            <TableCell>
              <Badge variant={notification.mesesAtraso >= 4 ? "destructive" : "secondary"}>
                {notification.mesesAtraso} meses
              </Badge>
            </TableCell>
            <TableCell>R$ {notification.valorDevido.toFixed(2)}</TableCell>
            <TableCell>{getStatusBadge(notification.status)}</TableCell>
            <TableCell className="text-right">
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
                  <DropdownMenuItem onClick={() => handleSendNotification(notification.id, "email")}>
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar por E-mail
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSendNotification(notification.id, "sms")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enviar por SMS
                  </DropdownMenuItem>
                  {notification.mesesAtraso >= 3 && notification.status !== "corte_agendado" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleScheduleCut(notification.id)}>
                        <span className="text-destructive">Agendar Corte</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
