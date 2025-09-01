import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VolunteerForm from "@/components/join/volunteer-form"

export default function JoinPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">Seja Voluntário</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Junte-se a nós na missão de levar água limpa e vida para comunidades necessitadas. Contribua com seu tempo e
          habilidades para fazer a diferença.
        </p>
      </div>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Seja Voluntário</CardTitle>
          <CardDescription>
            Contribua com seu tempo e habilidades para fazer a diferença em nossas comunidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-medium">Áreas de atuação</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  area: "Campo",
                  description: "Participe diretamente da instalação de sistemas de água e educação comunitária",
                },
                {
                  area: "Técnica",
                  description: "Contribua com conhecimentos em engenharia, geologia, biologia e áreas afins",
                },
                {
                  area: "Administrativa",
                  description: "Ajude na organização, comunicação, captação de recursos e gestão de projetos",
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.area}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <VolunteerForm />
        </CardContent>
      </Card>
    </div>
  )
}
