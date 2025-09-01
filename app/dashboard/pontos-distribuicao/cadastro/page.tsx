import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CadastroPontoForm } from "@/components/dashboard/pontos-distribuicao/cadastro-ponto-form"

export default function CadastroPontoPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/pontos-distribuicao">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cadastrar Ponto de Distribuição</h1>
              <p className="text-sm text-gray-600">Registre um novo ponto de distribuição de água</p>
            </div>
          </div>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-lg text-gray-800">Dados do Ponto</CardTitle>
              <CardDescription>Informações de localização e características</CardDescription>
            </CardHeader>
            <CardContent>
              <CadastroPontoForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
