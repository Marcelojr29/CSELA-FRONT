"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { EditPhotoModalProps } from "@/interfaces/IEditPhotoModal"

export function EditPhotoModal({ photo, open, onOpenChange, onSave }: EditPhotoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (photo) {
      setTitle(photo.title || "")
      setDescription(photo.description || "")
      setIsActive(photo.status === "ativa")
    }
  }, [photo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de salvamento
    setTimeout(() => {
      setIsSubmitting(false)

      const updatedPhoto = {
        ...photo,
        title,
        description,
        status: isActive ? "ativa" : "inativa",
      }

      onSave(updatedPhoto)

      toast({
        title: "Foto atualizada",
        description: "As informações da foto foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Foto</DialogTitle>
            <DialogDescription>Atualize as informações da foto na galeria.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Imagem Atual</Label>
              <img
                src={photo?.imageUrl || "/placeholder.svg"}
                alt={photo?.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title">Título</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da foto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o que está acontecendo na foto..."
                rows={3}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="edit-active" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="edit-active">Ativar foto no carrossel</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
