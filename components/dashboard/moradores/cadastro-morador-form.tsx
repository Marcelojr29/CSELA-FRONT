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

export function CadastroMoradorForm() {
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
        title: "Morador cadastrado com sucesso!",
        description: "O novo morador foi adicionado ao sistema.",
      })
      router.push("/dashboard/moradores")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input id="nome" placeholder="Digite o nome completo" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input id="cpf" placeholder="000.000.000-00" required />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" placeholder="(00) 00000-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="email@exemplo.com" />
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Endereço</h3>
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
            <Label htmlFor="bairro">Bairro</Label>
            <Input id="bairro" placeholder="Nome do bairro" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" placeholder="Nome da cidade" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Informações Adicionais</h3>
        <div className="space-y-2">
          <Label htmlFor="comunidade">Comunidade/Região</Label>
          <Input id="comunidade" placeholder="Nome da comunidade" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea id="observacoes" placeholder="Informações adicionais..." rows={3} />
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
            "Cadastrar Morador"
          )}
        </Button>
      </div>
    </form>
  )
}
