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
import { usePerfisAPI } from "@/hooks/use-perfis-api"
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

// Estrutura dos módulos e suas funcionalidades baseada na API
const modulosEstrutura = {
  "Gestão de Usuários": {
    "Cadastro de Usuário": ["cadastro_usuario"],
    "Cadastro de Perfil": ["cadastro_perfil"],
  },
  "Operações": {
    "Cadastro de Moradores": ["cadastro_moradores"],
    "Registrar Pagamentos": ["registrar_pagamentos"],
    "Gerenciar Pontos": ["gerenciar_pontos"],
  },
  "Relatórios e Análises": {
    "Visualizar Dashboards": ["visualizar_dashboards"],
    "Exportar Relatórios": ["exportar_relatorios"],
  },
  "Módulos Avançados": {
    "Acesso a Finanças": ["acesso_financas"],
    "Acesso à Administração": ["acesso_administracao"],
  },
}

export function CriarPerfilModal({ open, onOpenChange }: CriarPerfilModalProps) {
  const { toast } = useToast()
  const { criarPerfil } = usePerfisAPI()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({})
  const [permissions, setPermissions] = useState<Record<string, Record<string, string[]>>>({})

  const toggleModule = (module: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }))
  }

  const handlePermissionChange = (module: string, funcionalidade: string, permissao: string, checked: boolean) => {
    setPermissions((prev) => {
      const newPermissions = { ...prev }
      if (!newPermissions[module]) {
        newPermissions[module] = {}
      }
      if (!newPermissions[module][funcionalidade]) {
        newPermissions[module][funcionalidade] = []
      }

      if (checked) {
        if (!newPermissions[module][funcionalidade].includes(permissao)) {
          newPermissions[module][funcionalidade].push(permissao)
        }
      } else {
        newPermissions[module][funcionalidade] = newPermissions[module][funcionalidade].filter((p) => p !== permissao)
      }

      return newPermissions
    })
  }

  const handleSelectAll = (module: string, funcionalidade: string) => {
    const allPermissions = modulosEstrutura[module as keyof typeof modulosEstrutura][funcionalidade]
    const currentPermissions = permissions[module]?.[funcionalidade] || []
    const allSelected = allPermissions.every((permissao: any) => currentPermissions.includes(permissao))

    setPermissions((prev) => {
      const newPermissions = { ...prev }
      if (!newPermissions[module]) {
        newPermissions[module] = {}
      }

      if (allSelected) {
        newPermissions[module][funcionalidade] = []
      } else {
        newPermissions[module][funcionalidade] = [...allPermissions]
      }

      return newPermissions
    })
  }

  // Função para converter permissões selecionadas para formato da API
  const convertPermissoesToAPI = (permissoesState: Record<string, Record<string, string[]>>) => {
    const apiPermissions = {
      user_management: {
        name: "user_management",
        permissions: [] as string[]
      },
      operation: {
        name: "operation", 
        permissions: [] as string[]
      },
      reports_analytics: {
        name: "reports_analytics",
        permissions: [] as string[]
      },
      advanced: {
        name: "advanced",
        permissions: [] as string[]
      }
    };

    // Mapear permissões selecionadas para os módulos da API
    Object.entries(permissoesState).forEach(([module, funcionalidades]) => {
      Object.entries(funcionalidades).forEach(([funcionalidade, permissoes]) => {
        permissoes.forEach(permissao => {
          switch (module) {
            case "Gestão de Usuários":
              if (!apiPermissions.user_management.permissions.includes(permissao)) {
                apiPermissions.user_management.permissions.push(permissao);
              }
              break;
            case "Operações":
              if (!apiPermissions.operation.permissions.includes(permissao)) {
                apiPermissions.operation.permissions.push(permissao);
              }
              break;
            case "Relatórios e Análises":
              if (!apiPermissions.reports_analytics.permissions.includes(permissao)) {
                apiPermissions.reports_analytics.permissions.push(permissao);
              }
              break;
            case "Módulos Avançados":
              if (!apiPermissions.advanced.permissions.includes(permissao)) {
                apiPermissions.advanced.permissions.push(permissao);
              }
              break;
          }
        });
      });
    });

    return apiPermissions;
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
      // Converter permissões para formato da API
      const permissoesAPI = convertPermissoesToAPI(permissions);
      
      const perfilData = {
        nome,
        status: true, // API espera boolean
        permissoes: permissoesAPI
      };
      
      // Se descrição foi fornecida, adicionar ao objeto
      if (descricao.trim()) {
        (perfilData as any).descricao = descricao;
      }

      console.log('📤 Enviando dados para API:', perfilData);

      await criarPerfil(perfilData);

      toast({
        title: "Perfil criado",
        description: "O perfil foi criado com sucesso.",
      })

      // Limpar formulário
      setNome("")
      setDescricao("")
      setPermissions({})
      setOpenModules({})
      onOpenChange(false)
    } catch (error: any) {
      console.error('❌ Erro ao criar perfil:', error);
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
            {/* Nome, Descrição e Status */}
            <div className="grid grid-cols-1 gap-4">
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
                <Label htmlFor="descricao">Descrição (Opcional)</Label>
                <Input
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva brevemente este perfil"
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
                    {Object.entries(funcionalidades).map(([funcionalidade, permissoes]) => (
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
                          {permissoes.map((permissao) => (
                            <div key={permissao} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${modulo}-${funcionalidade}-${permissao}`}
                                checked={permissions[modulo]?.[funcionalidade]?.includes(permissao) || false}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(modulo, funcionalidade, permissao, checked === true)
                                }
                              />
                              <Label
                                htmlFor={`${modulo}-${funcionalidade}-${permissao}`}
                                className="text-sm cursor-pointer"
                              >
                                {permissao.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
