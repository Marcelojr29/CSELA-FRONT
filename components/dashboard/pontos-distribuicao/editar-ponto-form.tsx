"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { EditarPontoFormProps } from "@/interfaces/IEditarPontoFormProps"

export function EditarPontoForm({ pontoId }: EditarPontoFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Dados simulados do ponto
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    capacidade: "",
    status: "",
    observacoes: "",
  })

  useEffect(() => {
    // Simulação de carregamento dos dados
    setTimeout(() => {
      setFormData({
        nome: "Cisterna Vila Esperança",
        tipo: "cisterna",
        cep: "60000-000",
        endereco: "Rua Principal, s/n",
        bairro: "Vila Esperança",
        cidade: "Fortaleza",
        capacidade: "16000",
        status: "ativo",
        observacoes: "Cisterna instalada em 2023, atende 50 famílias",
      })
      setIsLoading(false)
    }, 1000)
  }, [pontoId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Ponto atualizado com sucesso!",
        description: "As informações do ponto de distribuição foram atualizadas.",
      })
      router.push("/dashboard/pontos-distribuicao")
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando dados...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Ponto *</Label>
          <Input id="nome" value={formData.nome} onChange={(e) => handleInputChange("nome", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Ponto *</Label>
          <select
            id="tipo"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.tipo}
            onChange={(e) => handleInputChange("tipo", e.target.value)}
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
            <Input id="cep" value={formData.cep} onChange={(e) => handleInputChange("cep", e.target.value)} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="endereco">Endereço *</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro/Comunidade</Label>
            <Input id="bairro" value={formData.bairro} onChange={(e) => handleInputChange("bairro", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" value={formData.cidade} onChange={(e) => handleInputChange("cidade", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Características Técnicas</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="capacidade">Capacidade (Litros)</Label>
            <Input
              id="capacidade"
              type="number"
              value={formData.capacidade}
              onChange={(e) => handleInputChange("capacidade", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option value="ativo">Ativo</option>
              <option value="manutencao">Em Manutenção</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => handleInputChange("observacoes", e.target.value)}
            rows={3}
          />
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
              Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </div>
    </form>
  )
}
