"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, Edit, Trash, UserCog, Loader2 } from "lucide-react"
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
import { useUsuariosAPI, type Usuario } from "@/hooks/use-usuarios-api"

export function UsuariosTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  
  const {
    usuarios,
    isLoading,
    error,
    fetchUsuarios,
    alternarStatus,
    excluirUsuario,
    clearError
  } = useUsuariosAPI()

  // Carregar usuários na montagem do componente
  useEffect(() => {
    fetchUsuarios()
  }, [])

  // Limpar erros quando houver mudanças
  useEffect(() => {
    if (error) {
      clearError()
    }
  }, [searchTerm])

  // Filtrar usuários com base no termo de busca
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.perfil.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para obter a cor do badge com base no perfil
  const getPerfilBadgeVariant = (perfilNome: string) => {
    const nome = perfilNome.toLowerCase()
    if (nome.includes('admin')) return "destructive"
    if (nome.includes('contador')) return "secondary"
    if (nome.includes('funcionário') || nome.includes('funcionario')) return "outline"
    if (nome.includes('suporte')) return "default"
    return "outline"
  }

  const handleToggleStatus = async (usuario: Usuario) => {
    try {
      const resultado = await alternarStatus(usuario.id)
      if (resultado) {
        toast({
          title: "Status alterado",
          description: `O usuário ${usuario.nome} foi ${resultado.status ? 'ativado' : 'desativado'} com sucesso.`,
        })
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do usuário.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (usuario: Usuario) => {
    try {
      const sucesso = await excluirUsuario(usuario.id)
      if (sucesso) {
        toast({
          title: "Usuário excluído",
          description: `O usuário ${usuario.nome} foi excluído com sucesso.`,
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o usuário.",
        variant: "destructive",
      })
    }
  }

  // Função para formatar data de último acesso
  const formatarDataAcesso = (dataISO: string | null) => {
    if (!dataISO) return "Nunca"
    try {
      return new Date(dataISO).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit", 
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch {
      return "Data inválida"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Carregando usuários...</span>
      </div>
    )
  }

  if (error && usuarios.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Erro ao carregar usuários: {error.message}</p>
        <Button 
          variant="outline" 
          onClick={() => fetchUsuarios()}
          className="mt-4"
        >
          Tentar novamente
        </Button>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar usuários por nome, email ou perfil..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 w-[350px]"
        />
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 text-sm text-destructive">
          ⚠️ {error.message}
        </div>
      )}

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
            {filteredUsuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "Nenhum usuário encontrado com os critérios de busca." : "Nenhum usuário encontrado."}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Badge variant={getPerfilBadgeVariant(usuario.perfil.nome)}>
                      {usuario.perfil.nome}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={usuario.status ? "outline" : "secondary"}>
                      {usuario.status ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatarDataAcesso(usuario.ultimoAcesso)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleToggleStatus(usuario)}>
                          <UserCog className="mr-2 h-4 w-4" />
                          {usuario.status ? "Desativar usuário" : "Ativar usuário"}
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
                                Tem certeza que deseja excluir o usuário <strong>{usuario.nome}</strong>? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUser(usuario)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
