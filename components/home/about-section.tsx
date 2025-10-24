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
            O <strong>Centro Social e Educacional do Lago do Aleixo (CSELA)</strong> foi fundado em 24 de abril de 1972 por moradores do Lago do Aleixo em Manaus, com o propósito de enfrentar os desafios sociais do bairro e combater o preconceito contra portadores e ex-portadores do Mal de Hansen.
          </p>
          <p className="mt-4 text-muted-foreground">
            Ao longo de mais de 50 anos, o CSELA transformou-se em uma referência em desenvolvimento comunitário, atuando em 11 comunidades do Bairro Antônio Aleixo através de quatro dimensões principais: <strong> Pedagógica, Geração de Renda, Saúde da População e Habitação</strong>.
          </p>
          <p className="mt-4 text-muted-foreground">
            Destaque para projetos emblemáticos como o <strong>"Água Para Todos"</strong> que levou água encanada para 800 famílias, demonstrando a força da organização popular e autogestão comunitária.
          </p>
          <Button className="mt-6 bg-transparent" variant="outline" asChild>
            <Link href="/nossa-historia">Conheça Nossa História Completa</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src="/images/csela1.png"
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
