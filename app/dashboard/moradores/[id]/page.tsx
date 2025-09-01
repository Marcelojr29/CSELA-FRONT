"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, CreditCard, FileText } from "lucide-react"
import Link from "next/link"
import { Morador } from "@/interfaces/IMorador"

export default function MoradorDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const [morador, setMorador] = useState<Morador | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string

    // Se o ID for "cadastro", redireciona para a página de cadastro
    if (id === "cadastro") {
      router.replace("/dashboard/moradores/cadastro")
      return
    }

    // Simula busca do morador
    setTimeout(() => {
      // Dados mockados para demonstração
      const moradorMock: Morador = {
        id: id,
        nome: "João Silva Santos",
        rg: "1234567-8",
        cpf: "123.456.789-00",
        dataNascimento: "1985-03-15",
        estadoCivil: "Casado",
        endereco: {
          rua: "Rua das Flores",
          numero: "123",
          comunidade: "PURAQUEQUARA (Com. Bela Vista)",
          cep: "69000-000",
        },
        contato: {
          telefone: "(92) 99999-9999",
          email: "joao.silva@email.com",
        },
        residencia: {
          tipo: "Alvenaria",
          qtdPessoas: 4,
          tempoResidencia: "2020-01-15",
        },
        observacao: "Morador pontual nos pagamentos",
        status: "ativo",
        dataCadastro: "2024-01-15",
      }

      setMorador(moradorMock)
      setLoading(false)
    }, 1000)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/moradores">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Carregando...</h1>
        </div>
      </div>
    )
  }

  if (!morador) {
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
            <p className="text-center text-muted-foreground">O morador solicitado não foi encontrado.</p>
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
          <Badge variant={morador.status === "ativo" ? "default" : "secondary"}>
            {morador.status === "ativo" ? "Ativo" : "Inativo"}
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
              <p>{morador.rg}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CPF</p>
              <p>{morador.cpf}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
              <p>{new Date(morador.dataNascimento).toLocaleDateString("pt-BR")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado Civil</p>
              <p>{morador.estadoCivil}</p>
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
              <p>{morador.endereco.rua}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Número</p>
              <p>{morador.endereco.numero}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Comunidade</p>
              <p>{morador.endereco.comunidade}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CEP</p>
              <p>{morador.endereco.cep}</p>
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
              <p>{morador.contato.telefone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">E-mail</p>
              <p>{morador.contato.email || "Não informado"}</p>
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
              <p>{morador.residencia.tipo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quantidade de Pessoas</p>
              <p>{morador.residencia.qtdPessoas} pessoas</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reside desde</p>
              <p>{new Date(morador.residencia.tempoResidencia).toLocaleDateString("pt-BR")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Observações */}
      {morador.observacao && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{morador.observacao}</p>
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
              <Link href={`/dashboard/moradores/${morador.id}/edit`}>
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
