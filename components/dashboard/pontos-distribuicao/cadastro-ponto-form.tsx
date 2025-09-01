"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function CadastroPontoForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Ponto cadastrado com sucesso!",
        description: "O novo ponto de distribuição foi adicionado ao sistema.",
      })
      router.push("/dashboard/pontos-distribuicao")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Ponto *</Label>
          <Input id="nome" placeholder="Ex: Cisterna Vila Esperança" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Ponto *</Label>
          <select
            id="tipo"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="cisterna">Cisterna</option>
            <option value="poco">Poço Artesiano</option>
            <option value="reservatorio">Reservatório</option>
            <option value="estacao">Estação de Tratamento</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Localização</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input id="cep" placeholder="00000-000" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="endereco">Endereço *</Label>
            <Input id="endereco" placeholder="Rua, número" required />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro/Comunidade</Label>
            <Input id="bairro" placeholder="Nome do bairro ou comunidade" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" placeholder="Nome da cidade" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Características Técnicas</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="capacidade">Capacidade (Litros)</Label>
            <Input id="capacidade" type="number" placeholder="Ex: 16000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status Inicial</Label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="ativo">Ativo</option>
              <option value="manutencao">Em Manutenção</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea id="observacoes" placeholder="Informações adicionais sobre o ponto..." rows={3} />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar Ponto"
          )}
        </Button>
      </div>
    </form>
  )
}
