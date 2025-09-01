import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { UsersList } from "@/components/dashboard/users-list"
import { PlusCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Usuários" text="Gerencie os usuários do sistema de distribuição de água.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </DashboardHeader>

      <Card>
        <UsersList />
      </Card>
    </DashboardShell>
  )
}
