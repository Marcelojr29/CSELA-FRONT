"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMoradoresAPI, type MoradorInput } from "@/hooks/use-moradores-api"

export function CadastroMoradorForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { criarMorador, buscarPorCpf, isLoading, error } = useMoradoresAPI()

  // Estados do formulário
  const [formData, setFormData] = useState<MoradorInput>({
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
    tipoResidencia: "Casa",
    quantidadePessoas: 1,
    status: "Adimplente"
  })

  // Estados para validação
  const [cpfError, setCpfError] = useState<string>("")

  const handleInputChange = (field: keyof MoradorInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpar erro do CPF quando o usuário digitar
    if (field === 'cpf') {
      setCpfError("")
    }
  }

  // Função para aplicar máscara no CPF
  const formatCpf = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  // Função para aplicar máscara no RG
  const formatRg = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1')
  }

  // Função para aplicar máscara no CEP
  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  // Função para aplicar máscara no telefone
  const formatTelefone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  // Verificar se CPF já existe
  const verificarCpfExistente = async (cpf: string) => {
    if (cpf.replace(/\D/g, '').length === 11) {
      const moradorExistente = await buscarPorCpf(cpf)
      if (moradorExistente) {
        const errorMessage = `CPF já cadastrado para: ${moradorExistente.nome}`
        setCpfError(errorMessage)
        toast({
          title: "CPF já cadastrado",
          description: errorMessage,
          variant: "destructive",
        })
        return true
      }
    }
    return false
  }

  // Validar CPF em tempo real
  const validarCpf = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, '')
    
    if (cpfLimpo.length > 0 && cpfLimpo.length < 11) {
      setCpfError("CPF deve ter 11 dígitos")
    } else if (cpfLimpo.length === 11) {
      setCpfError("")
      // Verificar se já existe (com debounce)
      setTimeout(() => {
        verificarCpfExistente(cpf)
      }, 1000)
    } else {
      setCpfError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('🔥 FUNÇÃO HANDLESUBMIT FOI CHAMADA!')
    e.preventDefault()
    setIsSubmitting(true)
    
    console.log('🎯 Iniciando submit do formulário')
    console.log('📝 Dados do formulário:', formData)

    try {
      // Validações
      if (!formData.nome.trim()) {
        console.log('❌ Validação falhou: Nome vazio')
        toast({
          title: "Erro de validação",
          description: "Nome é obrigatório.",
          variant: "destructive",
        })
        return
      }

      if (!formData.cpf.trim() || formData.cpf.replace(/\D/g, '').length !== 11) {
        console.log('❌ Validação falhou: CPF inválido')
        toast({
          title: "Erro de validação",
          description: "CPF deve ter 11 dígitos.",
          variant: "destructive",
        })
        return
      }



      if (!formData.dataDeNascimento) {
        console.log('❌ Validação falhou: Data de nascimento vazia')
        toast({
          title: "Erro de validação",
          description: "Data de nascimento é obrigatória.",
          variant: "destructive",
        })
        return
      }

      // Verificar se a data não é futura
      if (new Date(formData.dataDeNascimento) > new Date()) {
        console.log('❌ Validação falhou: Data de nascimento futura')
        toast({
          title: "Erro de validação",
          description: "Data de nascimento não pode ser futura.",
          variant: "destructive",
        })
        return
      }

      if (!formData.rua.trim()) {
        console.log('❌ Validação falhou: Rua vazia')
        toast({
          title: "Erro de validação",
          description: "Rua é obrigatória.",
          variant: "destructive",
        })
        return
      }

      console.log('✅ Todas as validações passaram')

      // Verificar CPF duplicado
      console.log('🔍 Verificando CPF duplicado...')
      const cpfExiste = await verificarCpfExistente(formData.cpf)
      if (cpfExiste) {
        console.log('❌ CPF já existe')
        return
      }

      console.log('✅ CPF disponível')

      // Preparar dados para envio (remover formatação)
      const dadosParaEnvio: MoradorInput = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        rg: formData.rg.replace(/\D/g, ''),
        cep: formData.cep.replace(/\D/g, ''),
        nome: formData.nome.trim(),
        rua: formData.rua.trim(),
        numeroResidencia: formData.numeroResidencia.trim(),
        bairro: formData.bairro.trim(),
      }

      console.log('📤 Dados preparados para envio:', dadosParaEnvio)
      console.log('🚀 Chamando criarMorador...')

      const novoMorador = await criarMorador(dadosParaEnvio)
      
      console.log('📨 Resposta do criarMorador:', novoMorador)
      
      if (novoMorador) {
        console.log('✅ Morador criado com sucesso')
        toast({
          title: "Morador cadastrado com sucesso!",
          description: `${novoMorador.nome} foi adicionado ao sistema.`,
        })
        router.push("/dashboard/moradores")
      } else {
        console.log('❌ criarMorador retornou null')
        throw new Error("Falha ao criar morador")
      }
    } catch (err: any) {
      console.error('💥 Erro ao cadastrar morador:', err)
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o morador. Verifique os dados e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input 
            id="nome" 
            placeholder="Digite o nome completo" 
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input 
            id="cpf" 
            placeholder="000.000.000-00" 
            value={formData.cpf}
            onChange={(e) => {
              const cpfFormatado = formatCpf(e.target.value)
              handleInputChange('cpf', cpfFormatado)
              validarCpf(cpfFormatado)
            }}
            maxLength={14}
            required 
            className={cpfError ? "border-red-500 focus:border-red-500" : ""}
          />
          {cpfError && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="text-red-500">⚠️</span>
              {cpfError}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input 
            id="rg" 
            placeholder="00.000.000-0" 
            value={formData.rg}
            onChange={(e) => handleInputChange('rg', formatRg(e.target.value))}
            maxLength={12}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataDeNascimento">Data de Nascimento *</Label>
          <Input 
            id="dataDeNascimento" 
            type="date"
            value={formData.dataDeNascimento}
            onChange={(e) => handleInputChange('dataDeNascimento', e.target.value)}
            required 
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone *</Label>
          <Input 
            id="telefone" 
            placeholder="(00) 00000-0000" 
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', formatTelefone(e.target.value))}
            maxLength={15}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipoResidencia">Tipo de Residência *</Label>
          <Select onValueChange={(value) => handleInputChange('tipoResidencia', value)} value={formData.tipoResidencia}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
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
              placeholder="00000-000" 
              value={formData.cep}
              onChange={(e) => handleInputChange('cep', formatCep(e.target.value))}
              maxLength={9}
              required 
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="rua">Rua *</Label>
            <Input 
              id="rua" 
              placeholder="Nome da rua" 
              value={formData.rua}
              onChange={(e) => handleInputChange('rua', e.target.value)}
              required 
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="numeroResidencia">Número da Residência *</Label>
            <Input 
              id="numeroResidencia" 
              placeholder="123A" 
              value={formData.numeroResidencia}
              onChange={(e) => handleInputChange('numeroResidencia', e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro *</Label>
            <Input 
              id="bairro" 
              placeholder="Nome do bairro" 
              value={formData.bairro}
              onChange={(e) => handleInputChange('bairro', e.target.value)}
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
              onChange={(e) => handleInputChange('quantidadePessoas', parseInt(e.target.value) || 1)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Adimplente">Adimplente</SelectItem>
                <SelectItem value="Inadimplente">Inadimplente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="descricao">Observações</Label>
          <Textarea 
            id="descricao" 
            placeholder="Informações adicionais..." 
            rows={3}
            value={formData.descricao}
            onChange={(e) => handleInputChange('descricao', e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 text-sm text-destructive">
          ⚠️ {error.message}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting || isLoading}>
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
