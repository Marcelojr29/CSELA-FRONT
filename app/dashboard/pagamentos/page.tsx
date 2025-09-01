import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PaymentsList } from "@/components/dashboard/payments-list"
import { Download, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PaymentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pagamentos" text="Gerencie os pagamentos do sistema de distribuição de água.">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </DashboardHeader>

      <Card>
        <PaymentsList />
      </Card>
    </DashboardShell>
  )
}
