"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { galleryService, type GalleryPhoto } from "@/lib/gallery-service"

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([])

  useEffect(() => {
    const activePhotos = galleryService.getPhotos({ status: "ativa" })
    setGalleryPhotos(activePhotos)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || galleryPhotos.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, galleryPhotos.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryPhotos.length) % galleryPhotos.length)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
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
