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
import { MoreHorizontal, Search, UserPlus } from "lucide-react"

// Dados simulados de usuários
const users = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    address: "Rua das Flores, 123",
    status: "ativo",
    lastPayment: "2023-06-15",
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@example.com",
    address: "Av. Principal, 456",
    status: "ativo",
    lastPayment: "2023-06-14",
  },
  {
    id: "3",
    name: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    address: "Rua dos Pinheiros, 789",
    status: "pendente",
    lastPayment: "2023-06-13",
  },
  {
    id: "4",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    address: "Alameda Santos, 1011",
    status: "ativo",
    lastPayment: "2023-06-12",
  },
  {
    id: "5",
    name: "Lúcia Mendes",
    email: "lucia.mendes@example.com",
    address: "Rua Augusta, 1213",
    status: "inativo",
    lastPayment: "2023-06-10",
  },
  {
    id: "6",
    name: "Roberto Alves",
    email: "roberto.alves@example.com",
    address: "Av. Paulista, 1415",
    status: "ativo",
    lastPayment: "2023-06-09",
  },
  {
    id: "7",
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    address: "Rua Oscar Freire, 1617",
    status: "pendente",
    lastPayment: "2023-06-08",
  },
  {
    id: "8",
    name: "Ricardo Souza",
    email: "ricardo.souza@example.com",
    address: "Av. Brigadeiro Faria Lima, 1819",
    status: "ativo",
    lastPayment: "2023-06-07",
  },
  {
    id: "9",
    name: "Patrícia Costa",
    email: "patricia.costa@example.com",
    address: "Rua Consolação, 2021",
    status: "inativo",
    lastPayment: "2023-06-06",
  },
  {
    id: "10",
    name: "Eduardo Martins",
    email: "eduardo.martins@example.com",
    address: "Av. Rebouças, 2223",
    status: "ativo",
    lastPayment: "2023-06-05",
  },
]

export function UsersList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-[250px]"
          />
        </div>
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Pagamento</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "ativo" ? "outline" : user.status === "pendente" ? "secondary" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.lastPayment).toLocaleDateString("pt-BR")}</TableCell>
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
                      <DropdownMenuItem>Editar usuário</DropdownMenuItem>
                      <DropdownMenuItem>Registrar pagamento</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Desativar usuário</DropdownMenuItem>
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
