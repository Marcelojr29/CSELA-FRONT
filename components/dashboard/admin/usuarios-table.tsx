"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, Edit, Trash, UserCog } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditarUsuarioModal } from "@/components/dashboard/admin/editar-usuario-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { UserRole } from "@/types/user"

// Dados simulados de usuários
const usuariosData = [
  {
    id: "1",
    nome: "Administrador",
    email: "admin@csela.org",
    role: UserRole.ADMIN,
    status: "ativo",
    ultimoAcesso: "2023-06-25",
  },
  {
    id: "2",
    nome: "João Contador",
    email: "contador@csela.org",
    role: UserRole.ACCOUNTANT,
    status: "ativo",
    ultimoAcesso: "2023-06-24",
  },
  {
    id: "3",
    nome: "Maria Funcionária",
    email: "funcionario@csela.org",
    role: UserRole.EMPLOYEE,
    status: "ativo",
    ultimoAcesso: "2023-06-23",
  },
  {
    id: "4",
    nome: "Pedro Suporte",
    email: "suporte@csela.org",
    role: UserRole.SUPPORT,
    status: "ativo",
    ultimoAcesso: "2023-06-22",
  },
  {
    id: "5",
    nome: "Ana Silva",
    email: "ana.silva@csela.org",
    role: UserRole.EMPLOYEE,
    status: "inativo",
    ultimoAcesso: "2023-05-15",
  },
]

export function UsuariosTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [usuarios, setUsuarios] = useState(usuariosData)
  const { toast } = useToast()

  // Função para obter o nome do perfil com base no enum
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Administrador"
      case UserRole.ACCOUNTANT:
        return "Contador"
      case UserRole.EMPLOYEE:
        return "Funcionário"
      case UserRole.SUPPORT:
        return "Suporte"
      default:
        return "Desconhecido"
    }
  }

  // Filtra os usuários com base no termo de busca
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getRoleName(usuario.role).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para obter a cor do badge com base no perfil
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "destructive"
      case UserRole.ACCOUNTANT:
        return "secondary"
      case UserRole.EMPLOYEE:
        return "outline"
      case UserRole.SUPPORT:
        return "default"
      default:
        return "outline"
    }
  }

  const handleToggleStatus = (id: string) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, status: usuario.status === "ativo" ? "inativo" : "ativo" } : usuario,
      ),
    )

    toast({
      title: "Status alterado",
      description: "O status do usuário foi alterado com sucesso.",
    })
  }

  const handleDeleteUser = (id: string) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))

    toast({
      title: "Usuário excluído",
      description: "O usuário foi excluído com sucesso.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 w-[300px]"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(usuario.role)}>{getRoleName(usuario.role)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={usuario.status === "ativo" ? "outline" : "secondary"}>
                    {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(usuario.ultimoAcesso).toLocaleDateString("pt-BR")}</TableCell>
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
                      <EditarUsuarioModal usuario={usuario}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar usuário
                        </DropdownMenuItem>
                      </EditarUsuarioModal>
                      <DropdownMenuItem onClick={() => handleToggleStatus(usuario.id)}>
                        <UserCog className="mr-2 h-4 w-4" />
                        {usuario.status === "ativo" ? "Desativar usuário" : "Ativar usuário"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Excluir usuário
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir usuário</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(usuario.id)}>Excluir</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
