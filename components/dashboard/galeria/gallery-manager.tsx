"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Search, Eye, Edit, Trash, ToggleLeft, ToggleRight, Loader2 } from "lucide-react"
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
import { galeriaApi } from "@/lib/api"

interface GalleryPhoto {
  id: number
  imageUrl: string
  title: string
  description: string
  status: "ativa" | "inativa"
  addedBy: string
  views: number
  createdAt: string
  updatedAt: string
}

interface GalleryManagerProps {
  filter: "todas" | "ativas" | "inativas"
}

export function GalleryManager({ filter }: GalleryManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Carregar fotos da API
  useEffect(() => {
    loadPhotos()
  }, [filter])

  const loadPhotos = async () => {
    try {
      setIsLoading(true)
      const statusFilter = filter === "todas" ? undefined : filter === "ativas" ? "ativa" : "inativa"
      const response = await galeriaApi.getPhotos(1, 100, undefined, statusFilter)
      
      if (response.data && response.data.data) {
        setPhotos(response.data.data)
      }
    } catch (error) {
      console.error('Erro ao carregar fotos:', error)
      toast({
        title: "Erro ao carregar fotos",
        description: "Não foi possível carregar as fotos da galeria.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filtra as fotos com base no termo de busca
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.addedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePhotoStatus = async (id: number) => {
    try {
      const response = await galeriaApi.togglePhotoStatus(id)
      if (response.data) {
        loadPhotos() // Recarregar a lista
        toast({
          title: "Status alterado",
          description: `A foto foi ${response.data.status === "ativa" ? "ativada" : "desativada"}.`,
        })
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error)
      toast({
        title: "Erro ao alterar status",
        description: "Não foi possível alterar o status da foto.",
        variant: "destructive",
      })
    }
  }

  const deletePhoto = async (id: number) => {
    try {
      const photo = photos.find((p) => p.id === id)
      await galeriaApi.deletePhoto(id)
      loadPhotos() // Recarregar a lista
      toast({
        title: "Foto excluída",
        description: `A foto "${photo?.title}" foi excluída com sucesso.`,
        variant: "destructive",
      })
    } catch (error) {
      console.error('Erro ao excluir foto:', error)
      toast({
        title: "Erro ao excluir foto",
        description: "Não foi possível excluir a foto.",
        variant: "destructive",
      })
    }
  }

  const handleSavePhoto = async (updatedPhoto: GalleryPhoto) => {
    try {
      await galeriaApi.updatePhoto(updatedPhoto.id, {
        imageUrl: updatedPhoto.imageUrl,
        title: updatedPhoto.title,
        description: updatedPhoto.description,
        status: updatedPhoto.status,
        addedBy: updatedPhoto.addedBy,
      })
      loadPhotos() // Recarregar a lista
      setEditingPhoto(null)
      toast({
        title: "Foto atualizada",
        description: "A foto foi atualizada com sucesso.",
      })
    } catch (error) {
      console.error('Erro ao atualizar foto:', error)
      toast({
        title: "Erro ao atualizar foto",
        description: "Não foi possível atualizar a foto.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
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
                              {new Date(photo.createdAt).toLocaleDateString("pt-BR")}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span>{" "}
                              {photo.status === "ativa" ? "Ativa" : "Inativa"}
                            </div>
                            <div>
                              <span className="font-medium">Visualizações:</span> {photo.views || 0}
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
                <span>{photo.views || 0} views</span>
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
          onSave={handleSavePhoto}
        />
      )}
    </div>
  )
}
