"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, CreditCard, FileText, Loader2 } from "lucide-react"
import Link from "next/link"
import { useMoradoresAPI, type Morador } from "@/hooks/use-moradores-api"
import { useToast } from "@/components/ui/use-toast"

export default function MoradorDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [morador, setMorador] = useState<Morador | null>(null)
  const { isLoading, error, buscarMoradorPorId } = useMoradoresAPI()

  useEffect(() => {
    const id = params.id as string

    // Se o ID for "cadastro", redireciona para a página de cadastro
    if (id === "cadastro") {
      router.replace("/dashboard/moradores/cadastro")
      return
    }

    const carregarMorador = async () => {
      const moradorData = await buscarMoradorPorId(id)
      if (moradorData) {
        setMorador(moradorData)
      } else if (error) {
        toast({
          title: "Erro ao carregar morador",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    carregarMorador()
  }, [params.id, router, buscarMoradorPorId, error, toast])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/moradores">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <h1 className="text-3xl font-bold">Carregando...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!morador && !isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/moradores">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Morador não encontrado</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              {error ? error.message : "O morador solicitado não foi encontrado."}
            </p>
            <div className="flex justify-center mt-4">
              <Button asChild>
                <Link href="/dashboard/moradores">Voltar para lista</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/moradores">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{morador.nome}</h1>
            <p className="text-muted-foreground">ID: {morador.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant={morador.status === "Adimplente" ? "default" : "destructive"}>
            {morador.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
              <p>{morador.nome}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">RG</p>
              <p>{morador.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CPF</p>
              <p>{morador.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
              <p>{new Date(morador.dataDeNascimento).toLocaleDateString("pt-BR")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Idade</p>
              <p>{new Date().getFullYear() - new Date(morador.dataDeNascimento).getFullYear()} anos</p>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rua</p>
              <p>{morador.rua}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Número</p>
              <p>{morador.numeroResidencia}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bairro</p>
              <p>{morador.bairro}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CEP</p>
              <p>{morador.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p>{morador.telefone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Informações da Residência */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Residência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo de Residência</p>
              <p>{morador.tipoResidencia}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quantidade de Pessoas</p>
              <p>{morador.quantidadePessoas} pessoas</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tempo de Residência</p>
              <p>{morador.tempoResidencia} meses</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cadastrado em</p>
              <p>{new Date(morador.criadoEm).toLocaleDateString("pt-BR")}</p>
            </div>
            {morador.dataUltimoPagamento && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Último Pagamento</p>
                <p>{new Date(morador.dataUltimoPagamento).toLocaleDateString("pt-BR")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Observações */}
      {morador.descricao && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{morador.descricao}</p>
          </CardContent>
        </Card>
      )}

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
          <CardDescription>Ações disponíveis para este morador</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href={`/dashboard/moradores/${morador.id}/editar`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Dados
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/moradores/${morador.id}/pagamentos`}>
                <CreditCard className="mr-2 h-4 w-4" />
                Ver Pagamentos
              </Link>
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Gerar Carnê
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
