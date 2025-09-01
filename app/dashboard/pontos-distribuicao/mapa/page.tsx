import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MapaComunidade } from '@/components/dashboard/pontos-distribuicao/mapa-comunidade'

export default function MapaPontosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/pontos-distribuicao">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Mapa da Comunidade</h1>
          <p className="text-muted-foreground">Visualização dos pontos de distribuição e poços</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Água - Comunidade Bela Vista</CardTitle>
          <CardDescription>Mapa com localização dos poços e pontos de distribuição de água</CardDescription>
        </CardHeader>
        <CardContent>
          <MapaComunidade />
        </CardContent>
      </Card>
    </div>
  )
}
