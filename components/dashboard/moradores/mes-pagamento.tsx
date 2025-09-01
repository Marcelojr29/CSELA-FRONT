"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Paperclip, Eye, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { MesPagamentoProps, ArquivoAnexado } from "@/interfaces/IMesPagamento"

export function MesPagamento({ mes, ano, mesNumero, moradorId }: MesPagamentoProps) {
  const [isPago, setIsPago] = useState(false)
  const [arquivos, setArquivos] = useState<ArquivoAnexado[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      // Validar tipo de arquivo
      const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!tiposPermitidos.includes(file.type)) {
        toast({
          title: "Tipo de arquivo não permitido",
          description: "Apenas imagens (JPG, PNG) e PDFs são aceitos.",
          variant: "destructive",
        })
        return
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 5MB.",
          variant: "destructive",
        })
        return
      }

      // Criar URL temporária para o arquivo
      const url = URL.createObjectURL(file)
      const novoArquivo: ArquivoAnexado = {
        nome: file.name,
        tipo: file.type,
        url,
        dataUpload: new Date().toLocaleString("pt-BR"),
      }

      setArquivos((prev) => [...prev, novoArquivo])
      toast({
        title: "Arquivo anexado",
        description: `${file.name} foi anexado com sucesso.`,
      })
    })

    // Limpar o input
    event.target.value = ""
  }

  const removerArquivo = (index: number) => {
    setArquivos((prev) => {
      const novoArray = [...prev]
      // Revogar a URL do objeto para liberar memória
      URL.revokeObjectURL(novoArray[index].url)
      novoArray.splice(index, 1)
      return novoArray
    })
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido com sucesso.",
    })
  }

  const visualizarArquivo = (arquivo: ArquivoAnexado) => {
    if (arquivo.tipo.startsWith("image/")) {
      setIsDialogOpen(true)
    } else {
      // Para PDFs, abrir em nova aba
      window.open(arquivo.url, "_blank")
    }
  }

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
        isPago ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          id={`${moradorId}-${ano}-${mesNumero}`}
          checked={isPago}
          onCheckedChange={(checked) => setIsPago(checked as boolean)}
        />
        <Label htmlFor={`${moradorId}-${ano}-${mesNumero}`} className="font-medium cursor-pointer">
          {mes} {ano}
        </Label>
      </div>

      <div className="flex items-center gap-2">
        {/* Mostrar quantidade de arquivos anexados */}
        {arquivos.length > 0 && (
          <span className="text-xs text-muted-foreground bg-blue-100 px-2 py-1 rounded">
            {arquivos.length} arquivo{arquivos.length > 1 ? "s" : ""}
          </span>
        )}

        {/* Botão para anexar arquivo */}
        <div className="relative">
          <Input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
            <Paperclip className="h-3 w-3" />
          </Button>
        </div>

        {/* Botão para visualizar arquivos */}
        {arquivos.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                <Eye className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Comprovantes - {mes} {ano}
                </DialogTitle>
                <DialogDescription>Arquivos anexados para este mês</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {arquivos.map((arquivo, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{arquivo.nome}</p>
                      <p className="text-xs text-muted-foreground">{arquivo.dataUpload}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => visualizarArquivo(arquivo)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerArquivo(index)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Dialog para visualizar imagens */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visualizar Comprovante</DialogTitle>
          </DialogHeader>
          {arquivos.length > 0 && arquivos[0].tipo.startsWith("image/") && (
            <div className="flex justify-center">
              <img
                src={arquivos[0].url || "/placeholder.svg"}
                alt="Comprovante"
                className="max-w-full max-h-96 object-contain rounded"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
