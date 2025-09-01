import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Target, Heart } from "lucide-react"

export default function MissionVisionValues() {
  return (
    <section className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Missão, Visão e Valores</h2>
        <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
          Nossos princípios fundamentais que guiam todas as nossas ações e projetos.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <CardHeader className="pb-2">
            <Droplet className="h-12 w-12 text-primary" />
            <CardTitle className="mt-4">Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Garantir o acesso à água potável e saneamento básico para comunidades em situação de vulnerabilidade,
              promovendo saúde, dignidade e desenvolvimento sustentável.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center text-center">
          <CardHeader className="pb-2">
            <Target className="h-12 w-12 text-primary" />
            <CardTitle className="mt-4">Visão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Um mundo onde todas as pessoas tenham acesso garantido à água limpa e saneamento adequado,
              independentemente de sua condição socioeconômica ou localização geográfica.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center text-center">
          <CardHeader className="pb-2">
            <Heart className="h-12 w-12 text-primary" />
            <CardTitle className="mt-4">Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-left text-muted-foreground">
              <li>• Compromisso com a sustentabilidade</li>
              <li>• Respeito às culturas locais</li>
              <li>• Transparência em todas as ações</li>
              <li>• Inovação e melhoria contínua</li>
              <li>• Empoderamento comunitário</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
