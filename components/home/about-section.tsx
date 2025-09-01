import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section className="container mx-auto py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Sobre a CSELA</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Somos uma organização não governamental dedicada a levar água limpa e saneamento básico para comunidades em
            situação de vulnerabilidade.
          </p>
          <p className="mt-4 text-muted-foreground">
            Fundada em 2005, a CSELA já beneficiou mais de 1 milhão de pessoas em 5 países, implementando soluções
            sustentáveis e capacitando comunidades para garantir o acesso contínuo à água potável.
          </p>
          <p className="mt-4 text-muted-foreground">
            Nossa abordagem combina tecnologia, educação e participação comunitária para criar soluções duradouras que
            transformam vidas.
          </p>
          <Button className="mt-6 bg-transparent" variant="outline" asChild>
            <Link href="/nossa-historia">Conheça Nossa História Completa</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
                alt="Projeto de distribuição de água em comunidade rural"
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
