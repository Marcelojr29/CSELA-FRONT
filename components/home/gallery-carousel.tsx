"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, Image as ImageIcon } from "lucide-react"

interface GalleryPhoto {
  id: number
  imageUrl: string
  title: string
  description: string
  addedBy: string
  views: number
}

// Função para buscar fotos da API pública
async function fetchGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    // URL da API - ajuste conforme necessário
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    
    const response = await fetch(`${apiUrl}/public/gallery/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Note: NÃO enviamos token de autenticação aqui
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar fotos da galeria:', error)
    // Retorna array vazio em caso de erro
    return []
  }
}

// Fotos mockadas para fallback (caso a API não responda)
const MOCK_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    imageUrl: "/images/AcaoSocial.jpeg",
    title: "Ação Social da Comunidade Bela Vista",
    description: "Ação Social da Comunidade Bela Vista realizada em dezembro de 2024",
    addedBy: "Admin",
    views: 125
  },
  {
    id: 2,
    imageUrl: "/images/Padre.jpeg",
    title: "Presidente Edivaldo Barreto",
    description: "Presidente Edivaldo Barreto em Ação Social da Comunidade Bela Vista",
    addedBy: "Admin",
    views: 98
  },
  {
    id: 3,
    imageUrl: "/images/Acao.jpeg",
    title: "Ação Social",
    description: "Entrega de alimentos durante a Ação Social da Comunidade Bela Vista",
    addedBy: "Admin",
    views: 85
  }
]

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar fotos ativas da API
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        console.log('Carregando fotos do carrossel...')
        const photos = await fetchGalleryPhotos()
        
        if (photos.length > 0) {
          setGalleryPhotos(photos)
          console.log(`${photos.length} fotos carregadas da API`)
        } else {
          // Se não houver fotos da API, usa as mockadas
          console.log('Usando fotos mockadas')
          setGalleryPhotos(MOCK_PHOTOS)
        }
      } catch (err) {
        console.error('Erro ao carregar fotos:', err)
        setError('Não foi possível carregar as fotos da galeria')
        // Usa fotos mockadas em caso de erro
        setGalleryPhotos(MOCK_PHOTOS)
      } finally {
        setIsLoading(false)
      }
    }

    loadPhotos()
  }, [])

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoPlaying || galleryPhotos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length)
    }, 5000) // Troca a cada 5 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying, galleryPhotos.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length)
    // Reativa o auto-play após 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + galleryPhotos.length) % galleryPhotos.length
    )
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Nossa Galeria</h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Acompanhe nosso trabalho através das fotos dos nossos projetos e ações.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Carregando galeria...</p>
        </div>
      </section>
    )
  }

  // Error state
  if (error && galleryPhotos.length === 0) {
    return (
      <section className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Nossa Galeria</h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Acompanhe nosso trabalho através das fotos dos nossos projetos e ações.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-64 gap-4 bg-muted rounded-lg">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground text-center">{error}</p>
        </div>
      </section>
    )
  }

  // Empty state
  if (galleryPhotos.length === 0) {
    return (
      <section className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Nossa Galeria</h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Acompanhe nosso trabalho através das fotos dos nossos projetos e ações.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-64 gap-4 bg-muted rounded-lg">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Nenhuma foto disponível no momento</p>
        </div>
      </section>
    )
  }

  // Normal state
  return (
    <section className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Nossa Galeria</h2>
        <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
          Acompanhe nosso trabalho através das fotos dos nossos projetos e ações.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 shadow-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="w-full flex-shrink-0">
                <div className="relative aspect-video md:aspect-[16/9]">
                  <img
                    src={photo.imageUrl || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback para imagem quebrada
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  {/* Gradiente escuro no fundo para legibilidade do texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Informações da foto */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl font-bold mb-3">{photo.title}</h3>
                      <p className="text-base opacity-95 mb-4">{photo.description}</p>
                      <div className="flex items-center justify-between text-sm opacity-90">
                        <span>Adicionado por: {photo.addedBy}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> {photo.views} visualizações
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-white/30 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Foto anterior</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-white/30 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Próxima foto</span>
          </Button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-8 gap-2">
          {galleryPhotos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary w-8 scale-110" 
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para foto ${index + 1} de ${galleryPhotos.length}`}
            />
          ))}
        </div>

        {/* Contador */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Foto {currentIndex + 1} de {galleryPhotos.length}
        </div>
      </div>
    </section>
  )
}
