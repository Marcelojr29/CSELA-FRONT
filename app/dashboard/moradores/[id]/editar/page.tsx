import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EditarMoradorForm } from "@/components/dashboard/moradores/editar-morador-form"

export default function EditarMoradorPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/moradores">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Editar Morador</h1>
              <p className="text-sm text-gray-600">Atualize os dados do morador ID: {params.id}</p>
            </div>
          </div>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-lg text-gray-800">Dados do Morador</CardTitle>
              <CardDescription>Atualize as informações pessoais e de contato</CardDescription>
            </CardHeader>
            <CardContent>
              <EditarMoradorForm moradorId={params.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
