"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { EditarMoradorFormProps } from "@/interfaces/IEditarMoradorFormProps"
import { useMoradoresAPI, type Morador, type MoradorInput } from "@/hooks/use-moradores-api"

export function EditarMoradorForm({ moradorId }: EditarMoradorFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isLoading, error, buscarMoradorPorId, editarMorador } = useMoradoresAPI()
  const [morador, setMorador] = useState<Morador | null>(null)

  // Form data baseado na estrutura da API
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    rg: "",
    cpf: "",
    dataDeNascimento: "",
    rua: "",
    numeroResidencia: "",
    bairro: "",
    cep: "",
    telefone: "",
    tipoResidencia: "Casa" as "Casa" | "Apartamento" | "Kitnet" | "Sobrado" | "Comercial" | "Outro",
    quantidadePessoas: 1,
  })

  useEffect(() => {
    const carregarMorador = async () => {
      if (moradorId) {
        const moradorData = await buscarMoradorPorId(moradorId)
        if (moradorData) {
          setMorador(moradorData)
          // Função para formatar RG
          const formatarRg = (rg: string) => {
            const rgLimpo = rg.replace(/\D/g, '')
            if (rgLimpo.length <= 9) {
              return rgLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
            }
            return rg
          }

          // Função para formatar CPF
          const formatarCpf = (cpf: string) => {
            const cpfLimpo = cpf.replace(/\D/g, '')
            return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          }

          setFormData({
            nome: moradorData.nome,
            descricao: moradorData.descricao || "",
            rg: formatarRg(moradorData.rg),
            cpf: formatarCpf(moradorData.cpf),
            dataDeNascimento: moradorData.dataDeNascimento.split('T')[0], // Converter para formato date input
            rua: moradorData.rua,
            numeroResidencia: moradorData.numeroResidencia,
            bairro: moradorData.bairro,
            cep: moradorData.cep.replace(/(\d{5})(\d{3})/, '$1-$2'), // Formatar CEP
            telefone: moradorData.telefone,
            tipoResidencia: moradorData.tipoResidencia,
            quantidadePessoas: moradorData.quantidadePessoas,
          })
        } else if (error) {
          toast({
            title: "Erro ao carregar morador",
            description: error.message,
            variant: "destructive",
          })
        }
      }
    }

    carregarMorador()
  }, [moradorId, buscarMoradorPorId, error, toast])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const dataToUpdate: Partial<MoradorInput> = {
        nome: formData.nome,
        descricao: formData.descricao,
        rg: formData.rg.replace(/\D/g, ''), // Remover formatação
        cpf: formData.cpf.replace(/\D/g, ''), // Remover formatação
        dataDeNascimento: formData.dataDeNascimento,
        rua: formData.rua,
        numeroResidencia: formData.numeroResidencia,
        bairro: formData.bairro,
        cep: formData.cep.replace(/\D/g, ''), // Remover formatação
        telefone: formData.telefone,
        tipoResidencia: formData.tipoResidencia,
        quantidadePessoas: formData.quantidadePessoas,
      }

      const result = await editarMorador(moradorId, dataToUpdate)
      
      if (result) {
        toast({
          title: "Morador atualizado com sucesso!",
          description: "As informações do morador foram atualizadas.",
        })
        router.push("/dashboard/moradores")
      } else {
        throw new Error("Falha ao atualizar morador")
      }
    } catch (err: any) {
      toast({
        title: "Erro ao atualizar morador",
        description: err.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: typeof value === 'number' ? value : value
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando dados...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <span>Erro ao carregar morador: {error.message}</span>
      </div>
    )
  }

  if (!morador) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <span>Morador não encontrado</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input 
            id="nome" 
            value={formData.nome} 
            onChange={(e) => handleInputChange("nome", e.target.value)} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input 
            id="cpf" 
            value={formData.cpf} 
            onChange={(e) => handleInputChange("cpf", e.target.value)} 
            required 
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rg">RG *</Label>
          <Input
            id="rg"
            value={formData.rg}
            onChange={(e) => handleInputChange("rg", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataDeNascimento">Data de Nascimento *</Label>
          <Input
            id="dataDeNascimento"
            type="date"
            value={formData.dataDeNascimento}
            onChange={(e) => handleInputChange("dataDeNascimento", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone *</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
            placeholder="(XX) XXXXX-XXXX"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipoResidencia">Tipo de Residência *</Label>
          <Select 
            value={formData.tipoResidencia} 
            onValueChange={(value) => handleInputChange("tipoResidencia", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de residência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Kitnet">Kitnet</SelectItem>
              <SelectItem value="Sobrado">Sobrado</SelectItem>
              <SelectItem value="Comercial">Comercial</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Endereço</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP *</Label>
            <Input 
              id="cep" 
              value={formData.cep} 
              onChange={(e) => handleInputChange("cep", e.target.value)} 
              placeholder="12345-678"
              required
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="rua">Rua *</Label>
            <Input
              id="rua"
              value={formData.rua}
              onChange={(e) => handleInputChange("rua", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="numeroResidencia">Número da Residência *</Label>
            <Input 
              id="numeroResidencia" 
              value={formData.numeroResidencia} 
              onChange={(e) => handleInputChange("numeroResidencia", e.target.value)} 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro *</Label>
            <Input 
              id="bairro" 
              value={formData.bairro} 
              onChange={(e) => handleInputChange("bairro", e.target.value)} 
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="font-medium text-gray-900">Informações Adicionais</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quantidadePessoas">Quantidade de Pessoas *</Label>
            <Input
              id="quantidadePessoas"
              type="number"
              min="1"
              max="50"
              value={formData.quantidadePessoas}
              onChange={(e) => handleInputChange("quantidadePessoas", parseInt(e.target.value) || 1)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={morador?.status || "Adimplente"} 
              onValueChange={() => {}}
              disabled
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Adimplente">Adimplente</SelectItem>
                <SelectItem value="Inadimplente">Inadimplente</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Status é controlado pelo sistema de pagamentos
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="descricao">Observações</Label>
          <Textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) => handleInputChange("descricao", e.target.value)}
            rows={3}
            placeholder="Informações adicionais sobre o morador..."
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
