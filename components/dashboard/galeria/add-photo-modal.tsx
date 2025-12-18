"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, X } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"
import { galeriaApi } from "@/lib/api"

interface AddPhotoModalProps {
  children: React.ReactNode
  onPhotoAdded?: () => void
}

export function AddPhotoModal({ children, onPhotoAdded }: AddPhotoModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      })
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)

    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        title: "Imagem obrigatória",
        description: "Por favor, selecione uma imagem para adicionar.",
        variant: "destructive",
      })
      return
    }

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e a descrição.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Em produção, você faria upload da imagem para o servidor aqui
      // Por enquanto, vamos usar o preview URL (base64) ou um placeholder
      const imageUrl = previewUrl || "/placeholder.svg"

      await galeriaApi.createPhoto({
        imageUrl,
        title: title.trim(),
        description: description.trim(),
        status: isActive ? "ativa" : "inativa",
        addedBy: user?.name || "Admin"
      })

      setIsSubmitting(false)
      setOpen(false)

      // Limpar formulário
      setTitle("")
      setDescription("")
      setIsActive(true)
      setSelectedFile(null)
      setPreviewUrl(null)

      toast({
        title: "Foto adicionada com sucesso",
        description: `A foto "${title}" foi adicionada à galeria.`,
      })

      // Notificar componente pai para atualizar a lista
      if (onPhotoAdded) {
        onPhotoAdded()
      }

    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Erro ao adicionar foto",
        description: "Ocorreu um erro ao adicionar a foto. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Foto</DialogTitle>
            <DialogDescription>
              Adicione uma nova foto à galeria do site. A foto aparecerá no carrossel da página inicial.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="photo-upload">Imagem</Label>
              {!selectedFile ? (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Clique para selecionar uma imagem ou arraste e solte aqui
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, JPEG até 5MB</p>
                  </div>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img src={previewUrl || ""} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {selectedFile.name}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da foto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o que está acontecendo na foto..."
                rows={3}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="active">Ativar foto no carrossel</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adicionando...
                </>
              ) : (
                "Adicionar Foto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
