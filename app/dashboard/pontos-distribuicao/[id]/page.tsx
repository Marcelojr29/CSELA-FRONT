import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, MapPin, Clock, Users, Droplets } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PontoDistribuicaoPageProps } from "@/interfaces/IPontoDistribuicao"

// Dados simulados de pontos de distribuição
const pontosDistribuicaoData = [
  {
    id: "1",
    rua: "Rua das Flores",
    poco: "Poço Comunitário 1",
    dataCriacao: "2020-05-15",
    horarioManha: "08:00 - 11:00",
    horarioTarde: "14:00 - 17:00",
    status: "ativo",
    comunidade: "Vila Esperança",
    coordenadas: { lat: -8.0476, lng: -34.877 },
    capacidade: "500L/h",
    familiasBeneficiadas: 45,
    observacoes: "Ponto principal da comunidade, com maior fluxo de pessoas",
    responsavel: "João Silva",
    telefoneResponsavel: "(81) 99999-9999",
    ultimaManutencao: "2024-01-15",
    proximaManutencao: "2024-04-15",
  },
  {
    id: "2",
    rua: "Avenida Principal",
    poco: "Poço Artesiano 2",
    dataCriacao: "2019-08-20",
    horarioManha: "07:30 - 11:30",
    horarioTarde: "13:30 - 16:30",
    status: "ativo",
    comunidade: "Jardim Primavera",
    coordenadas: { lat: -8.0486, lng: -34.878 },
    capacidade: "750L/h",
    familiasBeneficiadas: 62,
    observacoes: "Poço artesiano com boa vazão",
    responsavel: "Maria Santos",
    telefoneResponsavel: "(81) 88888-8888",
    ultimaManutencao: "2024-02-10",
    proximaManutencao: "2024-05-10",
  },
  {
    id: "3",
    rua: "Rua dos Pinheiros",
    poco: "Poço Comunitário 3",
    dataCriacao: "2021-02-10",
    horarioManha: "08:30 - 11:30",
    horarioTarde: "14:30 - 17:30",
    status: "inativo",
    comunidade: "Vila Nova",
    coordenadas: { lat: -8.0496, lng: -34.879 },
    capacidade: "400L/h",
    familiasBeneficiadas: 28,
    observacoes: "Necessita reparo na bomba",
    responsavel: "Pedro Oliveira",
    telefoneResponsavel: "(81) 77777-7777",
    ultimaManutencao: "2023-11-20",
    proximaManutencao: "2024-03-20",
  },
]

export default function PontoDistribuicaoPage({ params }: PontoDistribuicaoPageProps) {
  const ponto = pontosDistribuicaoData.find((p) => p.id === params.id)

  if (!ponto) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/pontos-distribuicao">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{ponto.rua}</h1>
            <p className="text-muted-foreground">{ponto.poco}</p>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link href={`/dashboard/pontos-distribuicao/${ponto.id}/editar`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Informações Básicas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant={ponto.status === "ativo" ? "outline" : "secondary"}>
                {ponto.status === "ativo" ? "Ativo" : "Inativo"}
              </Badge>
              <p className="text-xs text-muted-foreground">Comunidade: {ponto.comunidade}</p>
            </div>
          </CardContent>
        </Card>

        {/* Capacidade */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacidade</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ponto.capacidade}</div>
            <p className="text-xs text-muted-foreground">Vazão por hora</p>
          </CardContent>
        </Card>

        {/* Famílias Beneficiadas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Famílias</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ponto.familiasBeneficiadas}</div>
            <p className="text-xs text-muted-foreground">Famílias beneficiadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Horários de Funcionamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horários de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Manhã</h4>
              <p className="text-sm text-muted-foreground">{ponto.horarioManha}</p>
            </div>
            <div>
              <h4 className="font-medium">Tarde</h4>
              <p className="text-sm text-muted-foreground">{ponto.horarioTarde}</p>
            </div>
          </CardContent>
        </Card>

        {/* Responsável */}
        <Card>
          <CardHeader>
            <CardTitle>Responsável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h4 className="font-medium">{ponto.responsavel}</h4>
              <p className="text-sm text-muted-foreground">{ponto.telefoneResponsavel}</p>
            </div>
          </CardContent>
        </Card>

        {/* Manutenção */}
        <Card>
          <CardHeader>
            <CardTitle>Manutenção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h4 className="text-sm font-medium">Última Manutenção</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(ponto.ultimaManutencao).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Próxima Manutenção</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(ponto.proximaManutencao).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{ponto.observacoes}</p>
          </CardContent>
        </Card>
      </div>

      {/* Informações Técnicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Técnicas</CardTitle>
          <CardDescription>Dados técnicos e localização do ponto de distribuição</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium">Data de Criação</h4>
              <p className="text-sm text-muted-foreground">{new Date(ponto.dataCriacao).toLocaleDateString("pt-BR")}</p>
            </div>
            <div>
              <h4 className="font-medium">Coordenadas</h4>
              <p className="text-sm text-muted-foreground">
                {ponto.coordenadas.lat}, {ponto.coordenadas.lng}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
