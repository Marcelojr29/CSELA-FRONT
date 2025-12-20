"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { categoriaPermissoes, permissoesDescricoes } from "./perfis-table"
import { UserRole } from "@/types/user"
import { VisualizarPerfilModalProps } from "@/interfaces/IVisualizarPerfilModal"

export function VisualizarPerfilModal({ perfil, open, onOpenChange }: VisualizarPerfilModalProps) {
  const checkPermission = (permissoes: any, permissao: any, categoria: any) => {
    let response = false;
    switch (categoria) {
      case "Gestão de Usuários":
        if (permissao === "cadastroUsuarios") {
          response = permissoes.user_management.permissions.includes("cadastro_usuario");
        }
        if (permissao === "gerenciarPerfis") {
          response = permissoes.user_management.permissions.includes("cadastro_perfil");
        }
        break;
      case "Operações":
        if (permissao === "cadastroMoradores") {
          response = permissoes.operation.permissions.includes("cadastro_moradores");
        }
        if (permissao === "registrarPagamentos") {
          response = permissoes.operation.permissions.includes("registrar_pagamentos");
        }
        if (permissao === "gerenciarPontos") {
          response = permissoes.operation.permissions.includes("gerenciar_pontos");
        }
        break;
      case "Relatórios e Análises":
        if (permissao === "visualizarDashboards") {
          response = permissoes.reports_analytics.permissions.includes("visualizar_dashboards");
        }
        if (permissao === "exportarRelatorios") {
          response = permissoes.reports_analytics.permissions.includes("exportar_relatorios");
        }
        break;
      case "Módulos Avançados":
        if (permissao === "acessoFinancas") {
          response = permissoes.advanced.permissions.includes("acesso_financas");
        }
        if (permissao === "acessoAdministracao") {
          response = permissoes.advanced.permissions.includes("acesso_administracao");
        }
        break;
      default:
        response = false;
      }
    return response;
  };
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

  // Componente para renderizar o status de uma permissão
  const PermissionStatus = ({ hasPermission }: { hasPermission: boolean }) => (
    <div className={`flex justify-center ${hasPermission ? "text-green-500" : "text-red-500"}`}>
      {hasPermission ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Detalhes do Perfil</span>
            <Badge variant={getRoleBadgeVariant(perfil.role)} className="ml-2">
              {perfil.nome}
            </Badge>
          </DialogTitle>
          <DialogDescription>{perfil.descricao}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="mb-4 text-sm font-medium">Permissões</h3>
          <div className="space-y-6">
            {Object.entries(categoriaPermissoes).map(([categoria, permissoesList]) => (
              <div key={categoria} className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">{categoria}</h4>
                <div className="rounded-md border">
                  <table className="w-full">
                    <tbody>
                      {permissoesList.map((permissao) => (
                        <tr key={permissao} className="border-b last:border-0">
                          <td className="px-4 py-2 text-sm">
                            {permissao.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </td>
                          <td className="px-4 py-2 text-xs text-muted-foreground">
                            {permissoesDescricoes[permissao as keyof typeof permissoesDescricoes]}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <PermissionStatus hasPermission={checkPermission(perfil.permissoes, permissao, categoria)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
