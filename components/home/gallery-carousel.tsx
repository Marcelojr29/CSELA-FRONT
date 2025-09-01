"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Dados simulados das fotos da galeria
const galleryPhotos = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    title: "Inauguração do novo sistema de captação",
    description: "Cerimônia de inauguração do sistema de captação de água na comunidade Vila Esperança",
    addedBy: "Admin",
    addedAt: "2024-01-15",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
    title: "Voluntários em ação",
    description: "Equipe de voluntários trabalhando na construção de cisternas no semiárido",
    addedBy: "Funcionário",
    addedAt: "2024-01-10",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    title: "Alegria das crianças",
    description: "Crianças da comunidade celebrando o acesso à água potável pela primeira vez",
    addedBy: "Admin",
    addedAt: "2024-01-08",
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop",
    title: "Educação ambiental",
    description: "Workshop sobre uso consciente da água e preservação ambiental",
    addedBy: "Funcionário",
    addedAt: "2024-01-05",
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    title: "Tecnologia a serviço da vida",
    description: "Novo sistema de purificação de água instalado na comunidade",
    addedBy: "Admin",
    addedAt: "2024-01-03",
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop",
    title: "Parceria com comunidades indígenas",
    description: "Trabalho conjunto para preservação de nascentes em terras indígenas",
    addedBy: "Admin",
    addedAt: "2024-01-01",
  },
]

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length)
    }, 4000) // Muda a cada 4 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length)
    // Reativa o auto-play após 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryPhotos.length) % galleryPhotos.length)
    // Reativa o auto-play após 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    // Reativa o auto-play após 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (galleryPhotos.length === 0) {
    return (
      <section className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Nossa Galeria</h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Acompanhe nosso trabalho através das fotos dos nossos projetos e ações.
          </p>
        </div>
        <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
          <p className="text-muted-foreground">Nenhuma foto disponível no momento.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Nossa Galeria</h2>
        <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
          Acompanhe nosso trabalho através das fotos dos nossos projetos e ações.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Carrossel principal */}
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="w-full flex-shrink-0">
                <div className="relative">
                  <img
                    src={photo.imageUrl || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                    <p className="text-sm opacity-90">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-white/20 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Foto anterior</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-white/20 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Próxima foto</span>
          </Button>
        </div>

        {/* Indicadores de posição */}
        <div className="flex justify-center mt-6 space-x-2">
          {galleryPhotos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para foto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
