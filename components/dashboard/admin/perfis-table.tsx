"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { UserRole } from "@/types/user"
import { Eye, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditarPerfilModal } from "@/components/dashboard/admin/editar-perfil-modal"
import { VisualizarPerfilModal } from "@/components/dashboard/admin/visualizar-perfil-modal"
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
import { usePerfisAPI } from "@/hooks/use-perfis-api"

// --- Permissões e categorias (mantidos para compatibilidade com outros modais) ---
export const permissoesDescricoes = {
  cadastroUsuarios: "Permite criar, editar e visualizar usuários do sistema",
  gerenciarPerfis: "Permite visualizar e gerenciar perfis de acesso",
  cadastroMoradores: "Permite cadastrar e gerenciar moradores",
  registrarPagamentos: "Permite registrar e visualizar pagamentos",
  gerenciarPontos: "Permite gerenciar pontos de distribuição de água",
  visualizarDashboards: "Permite visualizar dashboards e estatísticas",
  exportarRelatorios: "Permite exportar relatórios do sistema",
  acessoFinancas: "Permite acesso ao módulo de finanças",
  acessoAdministracao: "Permite acesso ao módulo de administração",
} as const

export const categoriaPermissoes = {
  "Gestão de Usuários": ["cadastroUsuarios", "gerenciarPerfis"],
  Operações: ["cadastroMoradores", "registrarPagamentos", "gerenciarPontos"],
  "Relatórios e Análises": ["visualizarDashboards", "exportarRelatorios"],
  "Módulos Avançados": ["acessoFinancas", "acessoAdministracao"],
} as const

export function PerfisTable({ perfis }: { perfis: any[] }) {
  const { toast } = useToast()
  const { excluirPerfil } = usePerfisAPI()
  const [editingPerfil, setEditingPerfil] = useState<any | null>(null)
  const [viewingPerfil, setViewingPerfil] = useState<any | null>(null)

  // Função para obter a cor do badge com base no status
  const getStatusBadgeVariant = (status: boolean) => {
    return status === true ? "default" : "secondary"
  }

  const handleDelete = async (id: string) => {
    try {
      console.log('🗑️ Excluindo perfil:', id);
      const sucesso = await excluirPerfil(id);
      
      if (sucesso) {
        toast({
          title: "Perfil excluído",
          description: "O perfil foi excluído com sucesso.",
        });
      } else {
        throw new Error('Falha ao excluir perfil');
      }
    } catch (error: any) {
      console.error('❌ Erro ao excluir perfil:', error);
      toast({
        title: "Erro ao excluir perfil",
        description: error.message || "Ocorreu um erro ao excluir o perfil. Tente novamente.",
        variant: "destructive",
      });
    }
  }

  // Verifica se o perfil é um dos perfis padrão do sistema
  const isDefaultPerfil = (perfil: any) => {
    // Considerar como perfil padrão se tiver role definido ou se for um dos nomes padrão
    const nomesPerfisPadrao = ['Administrador', 'Contador', 'Funcionário', 'Suporte'];
    return perfil.role && [UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.EMPLOYEE, UserRole.SUPPORT].includes(perfil.role) ||
           nomesPerfisPadrao.includes(perfil.nome);
  }

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-6 py-4 text-left text-sm font-medium">Perfil</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
            <th className="px-6 py-4 text-center text-sm font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {perfis.map((perfil) => (
            <tr key={perfil.id} className="border-b hover:bg-muted/25">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium">{perfil.nome}</span>
                  <span className="text-sm text-muted-foreground">{perfil.descricao}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant={getStatusBadgeVariant(perfil.status || "Ativo")}>{perfil.status ? "Ativo" : "Inativo"}</Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setViewingPerfil(perfil)} className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingPerfil(perfil)}
                    disabled={isDefaultPerfil(perfil)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isDefaultPerfil(perfil)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir perfil</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o perfil "{perfil.nome}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(perfil.id)}>Excluir</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPerfil && (
        <EditarPerfilModal
          perfil={editingPerfil}
          open={!!editingPerfil}
          onOpenChange={(open) => !open && setEditingPerfil(null)}
        />
      )}

      {viewingPerfil && (
        <VisualizarPerfilModal
          perfil={viewingPerfil}
          open={!!viewingPerfil}
          onOpenChange={(open) => !open && setViewingPerfil(null)}
        />
      )}
    </div>
  )
}
