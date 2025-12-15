"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus } from "lucide-react"
import { useUsuariosAPI } from "@/hooks/use-usuarios-api"
import { usePerfisAPI } from "@/hooks/use-perfis-api"

interface CriarUsuarioModalProps {
  children?: React.ReactNode
}

export function CriarUsuarioModal({ children }: CriarUsuarioModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [perfilId, setPerfilId] = useState("")
  const { toast } = useToast()
  
  const { criarUsuario, fetchUsuarios } = useUsuariosAPI()
  const { perfis, fetchPerfis } = usePerfisAPI()

  // Carregar perfis quando o modal abrir
  useEffect(() => {
    if (open) {
      fetchPerfis()
    }
  }, [open])

  // Resetar campos quando o modal fechar
  useEffect(() => {
    if (!open) {
      setNome("")
      setEmail("")
      setSenha("")
      setConfirmarSenha("")
      setPerfilId("")
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (!nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome é obrigatório.",
        variant: "destructive",
      })
      return
    }

    if (!email.trim()) {
      toast({
        title: "Erro",
        description: "O email é obrigatório.",
        variant: "destructive",
      })
      return
    }

    if (!senha.trim()) {
      toast({
        title: "Erro",
        description: "A senha é obrigatória.",
        variant: "destructive",
      })
      return
    }

    if (senha.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    if (senha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    if (!perfilId) {
      toast({
        title: "Erro",
        description: "Selecione um perfil.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const novoUsuario = await criarUsuario({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        perfilId,
        status: true
      })
      
      if (novoUsuario) {
        toast({
          title: "Usuário criado",
          description: `O usuário ${novoUsuario.nome} foi criado com sucesso.`,
        })
        
        setOpen(false)
        // Recarregar a lista de usuários
        fetchUsuarios()
      }
    } catch (err: any) {
      console.error('Erro ao criar usuário:', err)
      toast({
        title: "Erro",
        description: "Não foi possível criar o usuário. Verifique se o email já não está em uso.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar um novo usuário no sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome *
              </Label>
              <Input 
                id="nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                className="col-span-3" 
                placeholder="Nome completo"
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="usuario@email.com"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="perfil" className="text-right">
                Perfil *
              </Label>
              <Select onValueChange={setPerfilId} value={perfilId}>
                <SelectTrigger id="perfil" className="col-span-3">
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  {perfis
                    .filter(perfil => perfil.status) // Apenas perfis ativos
                    .map((perfil) => (
                      <SelectItem key={perfil.id} value={perfil.id}>
                        {perfil.nome}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="senha" className="text-right">
                Senha *
              </Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="col-span-3"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmarSenha" className="text-right">
                Confirmar *
              </Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="col-span-3"
                placeholder="Confirme a senha"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Usuário"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}