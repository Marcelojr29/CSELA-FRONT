import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-primary/10 py-16 md:py-24">
      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Água limpa é um direito de todos
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Trabalhamos para garantir acesso à água potável para comunidades em situação de vulnerabilidade, transformando
          vidas e promovendo saúde.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/associe-se">Faça Parte</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/nossa-historia">Conheça Nossa História</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
