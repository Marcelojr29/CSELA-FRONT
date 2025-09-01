"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Search, Eye, Edit, Trash, ToggleLeft, ToggleRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { EditPhotoModal } from "./edit-photo-modal"
import { GalleryManagerProps } from "@/interfaces/IGalleryManager"

// Dados simulados das fotos
const galleryPhotosData = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=300&width=400&text=Inauguração+sistema",
    title: "Inauguração do novo sistema de captação",
    description: "Cerimônia de inauguração do sistema de captação de água na comunidade Vila Esperança",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2024-01-15",
    views: 1250,
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=300&width=400&text=Voluntários+cisternas",
    title: "Voluntários em ação",
    description: "Equipe de voluntários trabalhando na construção de cisternas no semiárido",
    status: "ativa",
    addedBy: "Funcionário",
    addedAt: "2024-01-10",
    views: 980,
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=300&width=400&text=Crianças+água+potável",
    title: "Alegria das crianças",
    description: "Crianças da comunidade celebrando o acesso à água potável pela primeira vez",
    status: "inativa",
    addedBy: "Admin",
    addedAt: "2024-01-08",
    views: 750,
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=300&width=400&text=Workshop+educação",
    title: "Educação ambiental",
    description: "Workshop sobre uso consciente da água e preservação ambiental",
    status: "ativa",
    addedBy: "Funcionário",
    addedAt: "2024-01-05",
    views: 650,
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=300&width=400&text=Sistema+purificação",
    title: "Tecnologia a serviço da vida",
    description: "Novo sistema de purificação de água instalado na comunidade",
    status: "inativa",
    addedBy: "Admin",
    addedAt: "2024-01-03",
    views: 420,
  },
]

export function GalleryManager({ filter }: GalleryManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [photos, setPhotos] = useState(galleryPhotosData)
  const [editingPhoto, setEditingPhoto] = useState<any>(null)
  const { toast } = useToast()

  // Filtra as fotos com base no filtro e termo de busca
  const filteredPhotos = photos
    .filter((photo) => {
      if (filter === "ativas") return photo.status === "ativa"
      if (filter === "inativas") return photo.status === "inativa"
      return true
    })
    .filter(
      (photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.addedBy.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const togglePhotoStatus = (id: number) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === id ? { ...photo, status: photo.status === "ativa" ? "inativa" : "ativa" } : photo,
      ),
    )

    const photo = photos.find((p) => p.id === id)
    toast({
      title: "Status alterado",
      description: `A foto "${photo?.title}" foi ${photo?.status === "ativa" ? "desativada" : "ativada"}.`,
    })
  }

  const deletePhoto = (id: number) => {
    const photo = photos.find((p) => p.id === id)
    setPhotos(photos.filter((photo) => photo.id !== id))
    toast({
      title: "Foto excluída",
      description: `A foto "${photo?.title}" foi excluída com sucesso.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar fotos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 w-[300px]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <div className="relative">
              <img src={photo.imageUrl || "/placeholder.svg"} alt={photo.title} className="h-48 w-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant={photo.status === "ativa" ? "default" : "secondary"}>
                  {photo.status === "ativa" ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <div className="absolute top-2 left-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{photo.title}</DialogTitle>
                          <DialogDescription>{photo.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img
                            src={photo.imageUrl || "/placeholder.svg"}
                            alt={photo.title}
                            className="w-full rounded-md object-cover"
                          />
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Adicionado por:</span> {photo.addedBy}
                            </div>
                            <div>
                              <span className="font-medium">Data:</span>{" "}
                              {new Date(photo.addedAt).toLocaleDateString("pt-BR")}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span>{" "}
                              {photo.status === "ativa" ? "Ativa" : "Inativa"}
                            </div>
                            <div>
                              <span className="font-medium">Visualizações:</span> {photo.views}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <DropdownMenuItem onClick={() => setEditingPhoto(photo)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => togglePhotoStatus(photo.id)}>
                      {photo.status === "ativa" ? (
                        <>
                          <ToggleLeft className="mr-2 h-4 w-4" />
                          Desativar
                        </>
                      ) : (
                        <>
                          <ToggleRight className="mr-2 h-4 w-4" />
                          Ativar
                        </>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir foto</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir a foto "{photo.title}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deletePhoto(photo.id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">{photo.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{photo.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Por {photo.addedBy}</span>
                <span>{photo.views} views</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma foto encontrada.</p>
        </div>
      )}

      {editingPhoto && (
        <EditPhotoModal
          photo={editingPhoto}
          open={!!editingPhoto}
          onOpenChange={(open) => !open && setEditingPhoto(null)}
          onSave={(updatedPhoto) => {
            setPhotos(photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p)))
            setEditingPhoto(null)
          }}
        />
      )}
    </div>
  )
}
