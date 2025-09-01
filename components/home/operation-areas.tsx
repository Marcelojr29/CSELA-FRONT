import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Droplet, School, Users, Wrench, Leaf } from "lucide-react"

export default function OperationAreas() {
  return (
    <section className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Cenários de Atuação</h2>
        <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
          Conheça as principais áreas onde desenvolvemos nossos projetos e iniciativas.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: MapPin,
            title: "Comunidades Rurais",
            description:
              "Implementação de sistemas de captação de água da chuva e poços artesianos em regiões isoladas.",
          },
          {
            icon: Droplet,
            title: "Regiões de Seca",
            description: "Desenvolvimento de tecnologias de dessalinização e aproveitamento de água em regiões áridas.",
          },
          {
            icon: School,
            title: "Escolas",
            description: "Instalação de bebedouros e sistemas de tratamento de água em instituições educacionais.",
          },
          {
            icon: Users,
            title: "Comunidades Urbanas",
            description: "Projetos de acesso à água potável em comunidades periféricas e assentamentos urbanos.",
          },
          {
            icon: Wrench,
            title: "Emergências",
            description: "Resposta rápida em situações de desastres naturais e crises humanitárias.",
          },
          {
            icon: Leaf,
            title: "Preservação Ambiental",
            description: "Proteção de nascentes e mananciais para garantir a qualidade da água e a sustentabilidade.",
          },
        ].map((area, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <area.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{area.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{area.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
