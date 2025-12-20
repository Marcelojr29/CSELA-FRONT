import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Plus } from "lucide-react"
import { UsuariosTable } from "@/components/dashboard/admin/usuarios-table"
import { CriarUsuarioModal } from "@/components/dashboard/admin/criar-usuario-modal"

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Usuários do Sistema</h1>
        <div className="flex items-center gap-2">
          <CriarUsuarioModal>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </CriarUsuarioModal>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Gerencie os usuários que têm acesso ao sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <UsuariosTable />
        </CardContent>
      </Card>
    </div>
  )
}
