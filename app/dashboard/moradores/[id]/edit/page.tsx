"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dados mockados dos moradores (mesmo do componente de tabela)
const moradoresData = [
  {
    id: 1,
    nome: "Maria Silva Santos",
    rg: "1234567-8",
    cpf: "123.456.789-01",
    nascimento: "1985-03-15",
    rua: "Rua das Flores",
    numero: "123",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-000",
    telefone: "(92) 99999-1234",
    email: "maria.silva@email.com",
    estadoCivil: "casado",
    tipoResidencia: "Alvenaria",
    qtdPessoas: 4,
    tempoResidencia: "2020-01-15",
    observacao: "Família muito participativa nas atividades comunitárias. Sempre colabora com as campanhas de limpeza.",
    status: "Adimplente",
    ultimoPagamento: "2024-12-15",
    valorMensal: 45.0,
  },
  {
    id: 2,
    nome: "João Carlos Oliveira",
    rg: "2345678-9",
    cpf: "234.567.890-12",
    nascimento: "1978-07-22",
    rua: "Rua do Comércio",
    numero: "456",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-001",
    telefone: "(92) 98888-5678",
    email: "",
    estadoCivil: "solteiro",
    tipoResidencia: "Madeira",
    qtdPessoas: 2,
    tempoResidencia: "2018-06-10",
    observacao: "",
    status: "Inadimplente",
    ultimoPagamento: "2024-10-15",
    valorMensal: 45.0,
  },
  {
    id: 3,
    nome: "Ana Paula Costa",
    rg: "3456789-0",
    cpf: "345.678.901-23",
    nascimento: "1990-11-08",
    rua: "Rua da Esperança",
    numero: "789",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-002",
    telefone: "(92) 97777-9012",
    email: "ana.costa@email.com",
    estadoCivil: "solteiro",
    tipoResidencia: "Mista",
    qtdPessoas: 3,
    tempoResidencia: "2019-03-20",
    observacao: "Mãe solteira com duas crianças pequenas. Participa ativamente das reuniões comunitárias.",
    status: "Adimplente",
    ultimoPagamento: "2024-12-10",
    valorMensal: 45.0,
  },
]

export default function EditMoradorPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [morador, setMorador] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: "",
    rg: "",
    cpf: "",
    nascimento: "",
    estadoCivil: "",
    rua: "",
    numero: "",
    cep: "",
    telefone: "",
    email: "",
    tipoResidencia: "",
    qtdPessoas: "",
    tempoResidencia: "",
    observacao: "",
  })

  useEffect(() => {
    const moradorId = Number.parseInt(params.id as string)
    const moradorEncontrado = moradoresData.find((m) => m.id === moradorId)

    if (moradorEncontrado) {
      setMorador(moradorEncontrado)
      setFormData({
        nome: moradorEncontrado.nome,
        rg: moradorEncontrado.rg,
        cpf: moradorEncontrado.cpf,
        nascimento: moradorEncontrado.nascimento,
        estadoCivil: moradorEncontrado.estadoCivil,
        rua: moradorEncontrado.rua,
        numero: moradorEncontrado.numero,
        cep: moradorEncontrado.cep,
        telefone: moradorEncontrado.telefone,
        email: moradorEncontrado.email || "",
        tipoResidencia: moradorEncontrado.tipoResidencia,
        qtdPessoas: moradorEncontrado.qtdPessoas.toString(),
        tempoResidencia: moradorEncontrado.tempoResidencia,
        observacao: moradorEncontrado.observacao || "",
      })
    }
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Morador atualizado com sucesso",
        description: "As informações do morador foram atualizadas.",
      })
      router.push(`/dashboard/moradores/${params.id}`)
    }, 2000)
  }

  if (!morador) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Morador não encontrado</h2>
            <p className="text-gray-600 mt-2">O morador solicitado não foi encontrado.</p>
            <Button onClick={() => router.push("/dashboard/moradores")} className="mt-4">
              Voltar para Moradores
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/moradores/${params.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Morador</h1>
          <p className="text-muted-foreground">Atualize as informações de {morador.nome}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Morador</CardTitle>
          <CardDescription>Atualize os dados cadastrais do morador</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-lg font-medium">Dados Pessoais</h3>
              <p className="text-sm text-muted-foreground">Informações básicas do morador.</p>
              <Separator className="my-4" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Nome completo do morador"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={formData.rg}
                    onChange={(e) => handleInputChange("rg", e.target.value)}
                    placeholder="RG do morador"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                  <Input
                    id="data-nascimento"
                    type="date"
                    value={formData.nascimento}
                    onChange={(e) => handleInputChange("nascimento", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado-civil">Estado Civil</Label>
                  <Select
                    value={formData.estadoCivil}
                    onValueChange={(value) => handleInputChange("estadoCivil", value)}
                  >
                    <SelectTrigger id="estado-civil">
                      <SelectValue placeholder="Selecione o estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="uniao-estavel">União Estável</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Endereço</h3>
              <p className="text-sm text-muted-foreground">Informações de localização do morador.</p>
              <Separator className="my-4" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    value={formData.rua}
                    onChange={(e) => handleInputChange("rua", e.target.value)}
                    placeholder="Nome da rua"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => handleInputChange("numero", e.target.value)}
                    placeholder="Número da residência"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comunidade">Bairro</Label>
                  <Input id="comunidade" value="PURAQUEQUARA (Com. Bela Vista)" disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Contato</h3>
              <p className="text-sm text-muted-foreground">Informações de contato do morador.</p>
              <Separator className="my-4" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Informações da Residência</h3>
              <p className="text-sm text-muted-foreground">Detalhes sobre a residência do morador.</p>
              <Separator className="my-4" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipo-residencia">Tipo de Residência</Label>
                  <Select
                    value={formData.tipoResidencia}
                    onValueChange={(value) => handleInputChange("tipoResidencia", value)}
                  >
                    <SelectTrigger id="tipo-residencia">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Madeira">Madeira</SelectItem>
                      <SelectItem value="Alvenaria">Alvenaria</SelectItem>
                      <SelectItem value="Mista">Mista</SelectItem>
                      <SelectItem value="Estância">Estância</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qtd-pessoas">Quantas Pessoas Moram na Casa?</Label>
                  <Input
                    id="qtd-pessoas"
                    type="number"
                    min="1"
                    value={formData.qtdPessoas}
                    onChange={(e) => handleInputChange("qtdPessoas", e.target.value)}
                    placeholder="Número de pessoas"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempo-residencia">Reside há Quanto Tempo?</Label>
                  <Input
                    id="tempo-residencia"
                    type="date"
                    value={formData.tempoResidencia}
                    onChange={(e) => handleInputChange("tempoResidencia", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao">Observação</Label>
              <Textarea
                id="observacao"
                value={formData.observacao}
                onChange={(e) => handleInputChange("observacao", e.target.value)}
                placeholder="Adicione observações relevantes sobre o morador..."
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.push(`/dashboard/moradores/${params.id}`)}>
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
