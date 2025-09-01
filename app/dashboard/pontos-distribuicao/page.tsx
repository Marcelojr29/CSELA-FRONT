import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Plus, MapPin } from "lucide-react"
import { PontosDistribuicaoTable } from "@/components/dashboard/pontos-distribuicao/pontos-distribuicao-table"
import Link from "next/link"

export default function PontosDistribuicaoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pontos de Distribuição</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/pontos-distribuicao/mapa">
              <MapPin className="mr-2 h-4 w-4" />
              Ver Mapa
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/pontos-distribuicao/cadastro">
              <Plus className="mr-2 h-4 w-4" />
              Novo Ponto
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pontos de Distribuição</CardTitle>
          <CardDescription>Gerencie os pontos de distribuição de água cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <PontosDistribuicaoTable />
        </CardContent>
      </Card>
    </div>
  )
}
