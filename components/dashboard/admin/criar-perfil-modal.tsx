"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { usePerfis } from "@/hooks/use-perfis"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CriarPerfilModalProps } from "@/interfaces/ICriarPerfilModalProps"

// Estrutura dos módulos e suas funcionalidades
const modulosEstrutura = {
  Admin: {
    Usuários: ["Leitura", "Edição", "Atualização", "Exclusão"],
    Perfis: ["Leitura", "Edição", "Atualização", "Exclusão"],
  },
  Operações: {
    Moradores: ["Leitura", "Edição", "Atualização", "Exclusão"],
    "Pontos de Distribuição": ["Leitura", "Edição", "Atualização", "Exclusão"],
    Pagamentos: ["Leitura", "Edição", "Atualização", "Exclusão"],
  },
  "Relatórios e Análises": {
    Dashboards: ["Leitura", "Exportação"],
    Relatórios: ["Leitura", "Exportação"],
  },
  "Módulos Avançados": {
    Finanças: ["Leitura", "Edição", "Atualização"],
    Administração: ["Leitura", "Edição", "Atualização"],
  },
}

export function CriarPerfilModal({ open, onOpenChange }: CriarPerfilModalProps) {
  const { toast } = useToast()
  const { createPerfil } = usePerfis()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [nome, setNome] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({})
  const [permissions, setPermissions] = useState<Record<string, Record<string, string[]>>>({})

  const toggleModule = (module: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }))
  }

  const handlePermissionChange = (module: string, funcionalidade: string, nivel: string, checked: boolean) => {
    setPermissions((prev) => {
      const newPermissions = { ...prev }
      if (!newPermissions[module]) {
        newPermissions[module] = {}
      }
      if (!newPermissions[module][funcionalidade]) {
        newPermissions[module][funcionalidade] = []
      }

      if (checked) {
        if (!newPermissions[module][funcionalidade].includes(nivel)) {
          newPermissions[module][funcionalidade].push(nivel)
        }
      } else {
        newPermissions[module][funcionalidade] = newPermissions[module][funcionalidade].filter((n) => n !== nivel)
      }

      return newPermissions
    })
  }

  const handleSelectAll = (module: string, funcionalidade: string) => {
    const allLevels = modulosEstrutura[module as keyof typeof modulosEstrutura][funcionalidade]
    const currentLevels = permissions[module]?.[funcionalidade] || []
    const allSelected = allLevels.every((level: any) => currentLevels.includes(level))

    setPermissions((prev) => {
      const newPermissions = { ...prev }
      if (!newPermissions[module]) {
        newPermissions[module] = {}
      }

      if (allSelected) {
        newPermissions[module][funcionalidade] = []
      } else {
        newPermissions[module][funcionalidade] = [...allLevels]
      }

      return newPermissions
    })
  }

  const handleCreateClick = () => {
    if (!nome.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "O nome do perfil é obrigatório.",
        variant: "destructive",
      })
      return
    }
    setShowConfirmDialog(true)
  }

  const handleConfirmCreate = async () => {
    setIsSubmitting(true)
    setShowConfirmDialog(false)

    try {
      await createPerfil({
        nome,
        status: "Ativo",
        descricao: `Perfil personalizado: ${nome}`,
        permissions,
        role: "custom",
      })

      toast({
        title: "Perfil criado",
        description: "O perfil foi criado com sucesso.",
      })

      // Limpar formulário
      setNome("")
      setPermissions({})
      setOpenModules({})
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Erro ao criar perfil",
        description: error.message || "Ocorreu um erro ao criar o perfil. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold text-left">Novo Perfil</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Nome e Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Perfil</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome do perfil"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center h-10">
                  <Badge variant="default" className="pointer-events-none">
                    Ativo
                  </Badge>
                </div>
              </div>
            </div>

            {/* Módulos e Permissões */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Módulos e Permissões</Label>

              {Object.entries(modulosEstrutura).map(([modulo, funcionalidades]) => (
                <Collapsible key={modulo} open={openModules[modulo]} onOpenChange={() => toggleModule(modulo)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-12 text-left">
                      <span className="font-medium">{modulo}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openModules[modulo] ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-3 border rounded-md p-4 bg-muted/20">
                    {Object.entries(funcionalidades).map(([funcionalidade, niveis]) => (
                      <div key={funcionalidade} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">{funcionalidade}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectAll(modulo, funcionalidade)}
                            className="text-xs"
                          >
                            Tudo
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {niveis.map((nivel) => (
                            <div key={nivel} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${modulo}-${funcionalidade}-${nivel}`}
                                checked={permissions[modulo]?.[funcionalidade]?.includes(nivel) || false}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(modulo, funcionalidade, nivel, checked === true)
                                }
                              />
                              <Label
                                htmlFor={`${modulo}-${funcionalidade}-${nivel}`}
                                className="text-sm cursor-pointer"
                              >
                                {nivel}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleCreateClick} disabled={isSubmitting}>
              Criar Perfil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar criação do perfil</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que quer continuar com a criação desse perfil?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCreate} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
