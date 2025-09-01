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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { RegistrarPagamentoModalProps } from "@/interfaces/IRegistrarPagamentoModal"

export function RegistrarPagamentoModal({ children, morador, onPagamentoRegistrado }: RegistrarPagamentoModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [metodoPagamento, setMetodoPagamento] = useState("dinheiro")
  const [comprovante, setComprovante] = useState<File | null>(null)
  const [observacao, setObservacao] = useState("")
  const { toast } = useToast()

  // Calcula o valor total com base nos meses em atraso
  const valorTotal = morador.valorMensal * (morador.mesesAtraso ? morador.mesesAtraso + 1 : 1)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprovante(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validação básica
    if (!comprovante) {
      toast({
        title: "Erro ao registrar pagamento",
        description: "É necessário anexar um comprovante de pagamento.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulação de envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setOpen(false)

      // Limpar formulário
      setComprovante(null)
      setObservacao("")
      setMetodoPagamento("dinheiro")

      // Notificar o componente pai
      onPagamentoRegistrado(morador.id)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
            <DialogDescription>
              Registrar pagamento para <strong>{morador.nome}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <Input id="valor" type="text" value={`R$ ${valorTotal.toFixed(2)}`} className="col-span-3" readOnly />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Método</Label>
              <RadioGroup defaultValue="dinheiro" className="col-span-3 flex gap-4" onValueChange={setMetodoPagamento}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dinheiro" id="dinheiro" />
                  <Label htmlFor="dinheiro">Dinheiro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">PIX</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comprovante" className="text-right">
                {metodoPagamento === "dinheiro" ? "Foto do Recibo" : "Comprovante"}
              </Label>
              <Input
                id="comprovante"
                type="file"
                className="col-span-3"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="observacao" className="text-right">
                Observação
              </Label>
              <Textarea
                id="observacao"
                className="col-span-3"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Observações sobre o pagamento (opcional)"
              />
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
                  Registrando...
                </>
              ) : (
                "Registrar Pagamento"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
