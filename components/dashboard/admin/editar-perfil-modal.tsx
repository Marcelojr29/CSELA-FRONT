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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { categoriaPermissoes, permissoesDescricoes } from "./perfis-table"
import { usePerfis } from "@/hooks/use-perfis"
import { EditarPerfilModalProps } from "@/interfaces/IEditarPerfilModalProps"

export function EditarPerfilModal({ perfil, open, onOpenChange }: EditarPerfilModalProps) {
  const { toast } = useToast()
  const { updatePerfil } = usePerfis()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [permissoes, setPermissoes] = useState<Record<string, boolean>>({
    cadastroUsuarios: false,
    gerenciarPerfis: false,
    cadastroMoradores: false,
    registrarPagamentos: false,
    gerenciarPontos: false,
    visualizarDashboards: false,
    exportarRelatorios: false,
    acessoFinancas: false,
    acessoAdministracao: false,
  })

  useEffect(() => {
    if (perfil) {
      setNome(perfil.nome || "")
      setDescricao(perfil.descricao || "")
      setPermissoes(perfil.permissoes || {})
    }
  }, [perfil])

  const handlePermissaoChange = (permissao: string, checked: boolean) => {
    setPermissoes((prev) => ({
      ...prev,
      [permissao]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validação básica
      if (!nome.trim()) {
        throw new Error("O nome do perfil é obrigatório")
      }

      await updatePerfil(perfil.id, {
        nome,
        descricao,
        permissoes,
      })

      toast({
        title: "Perfil atualizado",
        description: "O perfil foi atualizado com sucesso.",
      })

      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar o perfil. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelectAll = (categoria: string) => {
    const permissoesCategoria = categoriaPermissoes[categoria as keyof typeof categoriaPermissoes]
    const allChecked = permissoesCategoria.every((p) => permissoes[p])

    const newPermissoes = { ...permissoes }
    permissoesCategoria.forEach((p) => {
      newPermissoes[p] = !allChecked
    })

    setPermissoes(newPermissoes)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>Atualize as informações e permissões do perfil.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Perfil</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Gerente Regional"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva brevemente as responsabilidades deste perfil"
                  className="h-[38px] resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permissões</Label>
              <Tabs defaultValue="categorias" className="w-full">
                <TabsList className="mb-2">
                  <TabsTrigger value="categorias">Por Categoria</TabsTrigger>
                  <TabsTrigger value="todas">Todas as Permissões</TabsTrigger>
                </TabsList>

                <TabsContent value="categorias" className="space-y-4">
                  {Object.entries(categoriaPermissoes).map(([categoria, permissoesList]) => (
                    <div key={categoria} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{categoria}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => handleSelectAll(categoria)}
                        >
                          {permissoesList.every((p) => permissoes[p]) ? "Desmarcar Todos" : "Selecionar Todos"}
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 gap-2 rounded-md border p-2">
                        {permissoesList.map((permissao) => (
                          <div key={permissao} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-permissao-${permissao}`}
                              checked={permissoes[permissao]}
                              onCheckedChange={(checked) => handlePermissaoChange(permissao, checked === true)}
                            />
                            <Label
                              htmlFor={`edit-permissao-${permissao}`}
                              className="flex flex-1 items-center justify-between text-sm"
                            >
                              <span>
                                {permissao.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {permissoesDescricoes[permissao as keyof typeof permissoesDescricoes]}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="todas">
                  <div className="grid grid-cols-1 gap-2 rounded-md border p-4">
                    {Object.entries(permissoes).map(([permissao, checked]) => (
                      <div key={permissao} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-all-${permissao}`}
                          checked={checked}
                          onCheckedChange={(checked) => handlePermissaoChange(permissao, checked === true)}
                        />
                        <Label
                          htmlFor={`edit-all-${permissao}`}
                          className="flex flex-1 items-center justify-between text-sm"
                        >
                          <span>{permissao.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                          <span className="text-xs text-muted-foreground">
                            {permissoesDescricoes[permissao as keyof typeof permissoesDescricoes]}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
