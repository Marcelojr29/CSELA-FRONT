"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react"

// Dados simulados de posts do Instagram
const instagramPosts = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "Inauguração de novo sistema de captação de água na comunidade Vila Esperança. #ÁguaParaTodos",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "Voluntários em ação: Construção de cisternas no semiárido nordestino. #Voluntariado",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "Crianças celebrando o acesso à água potável pela primeira vez. #Transformação",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "Workshop de educação ambiental e uso consciente da água. #Educação",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "Tecnologia a serviço da vida: Novo sistema de purificação instalado. #Inovação",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "Parceria com comunidades indígenas para preservação de nascentes. #Preservação",
  },
]

export default function InstagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visiblePosts, setVisiblePosts] = useState<number>(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisiblePosts(1)
      } else if (window.innerWidth < 1024) {
        setVisiblePosts(2)
      } else {
        setVisiblePosts(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visiblePosts >= instagramPosts.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? instagramPosts.length - visiblePosts : prevIndex - 1))
  }

  return (
    <section className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Siga-nos no Instagram</h2>
        <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
          Acompanhe nosso trabalho e fique por dentro das nossas ações e projetos.
        </p>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Anterior</span>
          </Button>

          <div className="mx-10 flex w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)` }}
            >
              {instagramPosts.map((post) => (
                <div key={post.id} className="w-full flex-shrink-0 px-2" style={{ flex: `0 0 ${100 / visiblePosts}%` }}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={`Instagram post ${post.id}`}
                          className="aspect-square w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100">
                          <Instagram className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">{post.caption}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Próximo</span>
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2">
          <Instagram className="h-4 w-4" />
          <span>Siga-nos no Instagram</span>
        </Button>
      </div>
    </section>
  )
}
