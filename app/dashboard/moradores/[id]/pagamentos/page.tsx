import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { RegistroPagamentoForm } from "@/components/dashboard/moradores/registro-pagamento-form"
import { HistoricoPagamentos } from "@/components/dashboard/moradores/historico-pagamentos"
import { CarneDigital } from "@/components/dashboard/moradores/carne-digital"

export default function PagamentosMoradorPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/moradores">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Pagamentos do Morador</h1>
        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Exportar Histórico
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Registrar Pagamento</CardTitle>
            <CardDescription>Registre um novo pagamento para este morador</CardDescription>
          </CardHeader>
          <CardContent>
            <RegistroPagamentoForm moradorId={params.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carnê Digital</CardTitle>
            <CardDescription>Visualize e imprima o carnê de pagamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <CarneDigital moradorId={params.id} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>Todos os pagamentos registrados para este morador</CardDescription>
        </CardHeader>
        <CardContent>
          <HistoricoPagamentos moradorId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
