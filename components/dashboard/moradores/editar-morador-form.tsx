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
import { EditarMoradorFormProps } from "@/interfaces/IEditarMoradorFormProps"

export function EditarMoradorForm({ moradorId }: EditarMoradorFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Dados simulados do morador
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    comunidade: "",
    observacoes: "",
  })

  useEffect(() => {
    // Simulação de carregamento dos dados
    setTimeout(() => {
      setFormData({
        nome: "João Silva Santos",
        cpf: "123.456.789-00",
        telefone: "(85) 99999-9999",
        email: "joao.silva@email.com",
        cep: "60000-000",
        endereco: "Rua das Flores, 123",
        bairro: "Vila Esperança",
        cidade: "Fortaleza",
        comunidade: "Vila Esperança",
        observacoes: "Morador ativo desde 2023",
      })
      setIsLoading(false)
    }, 1000)
  }, [moradorId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Dados atualizados com sucesso!",
        description: "As informações do morador foram atualizadas.",
      })
      router.push("/dashboard/moradores")
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
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input id="nome" value={formData.nome} onChange={(e) => handleInputChange("nome", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input id="cpf" value={formData.cpf} onChange={(e) => handleInputChange("cpf", e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Endereço</h3>
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
            <Label htmlFor="bairro">Bairro</Label>
            <Input id="bairro" value={formData.bairro} onChange={(e) => handleInputChange("bairro", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" value={formData.cidade} onChange={(e) => handleInputChange("cidade", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Informações Adicionais</h3>
        <div className="space-y-2">
          <Label htmlFor="comunidade">Comunidade/Região</Label>
          <Input
            id="comunidade"
            value={formData.comunidade}
            onChange={(e) => handleInputChange("comunidade", e.target.value)}
          />
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
