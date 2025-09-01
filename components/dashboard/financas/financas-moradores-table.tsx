"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, Eye, MessageSquare, CreditCard, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useAuth } from "@/components/auth/auth-context"
import { UserRole } from "@/types/user"
import Link from "next/link"

// Dados simulados de moradores para finanças
const moradoresData = [
  {
    id: "1",
    nome: "João Silva",
    rg: "1234567",
    cpf: "123.456.789-00",
    nascimento: "1985-03-15",
    rua: "Rua das Flores",
    numero: "123",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-000",
    telefone: "(92) 98765-4321",
    tipoResidencia: "Alvenaria",
    qtdPessoas: 4,
    tempoResidencia: "2020-01-15",
    status: "adimplente",
    ultimoPagamento: "2023-06-15",
    valorMensal: 50.0,
    valorDevido: 0,
    mesesAtraso: 0,
    observacao: "Morador muito colaborativo com a comunidade. Sempre participa das reuniões.",
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    rg: "2345678",
    cpf: "987.654.321-00",
    nascimento: "1978-08-22",
    rua: "Av. Principal",
    numero: "456",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-001",
    telefone: "(92) 91234-5678",
    tipoResidencia: "Madeira",
    qtdPessoas: 3,
    tempoResidencia: "2018-06-10",
    status: "inadimplente",
    ultimoPagamento: "2023-03-10",
    valorMensal: 50.0,
    valorDevido: 150.0,
    mesesAtraso: 3,
    observacao: "",
  },
  {
    id: "3",
    nome: "Pedro Santos",
    rg: "3456789",
    cpf: "456.789.123-00",
    nascimento: "1990-12-05",
    rua: "Rua dos Pinheiros",
    numero: "789",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-002",
    telefone: "(92) 99876-5432",
    tipoResidencia: "Mista",
    qtdPessoas: 5,
    tempoResidencia: "2019-03-20",
    status: "inadimplente",
    ultimoPagamento: "2023-02-05",
    valorMensal: 50.0,
    valorDevido: 200.0,
    mesesAtraso: 4,
    observacao: "Possui deficiência física. Necessita de atenção especial para acessibilidade.",
  },
  {
    id: "4",
    nome: "Ana Souza",
    rg: "4567890",
    cpf: "789.123.456-00",
    nascimento: "1982-07-18",
    rua: "Alameda Santos",
    numero: "1011",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-003",
    telefone: "(92) 95678-1234",
    tipoResidencia: "Alvenaria",
    qtdPessoas: 6,
    tempoResidencia: "2017-11-08",
    status: "adimplente",
    ultimoPagamento: "2023-06-20",
    valorMensal: 50.0,
    valorDevido: 0,
    mesesAtraso: 0,
    observacao: "Família numerosa com crianças pequenas. Prioridade para programas sociais.",
  },
  {
    id: "5",
    nome: "Carlos Ferreira",
    rg: "5678901",
    cpf: "321.654.987-00",
    nascimento: "1975-04-30",
    rua: "Rua Augusta",
    numero: "1213",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69088-004",
    telefone: "(92) 94321-8765",
    tipoResidencia: "Estância",
    qtdPessoas: 2,
    tempoResidencia: "2021-09-12",
    status: "inadimplente",
    ultimoPagamento: "2023-01-15",
    valorMensal: 50.0,
    valorDevido: 250.0,
    mesesAtraso: 5,
    observacao: "",
  },
]

// Componente para exibir detalhes do morador
function DetalhesModal({ morador }: { morador: (typeof moradoresData)[0] }) {
  const calcularIdade = (nascimento: string) => {
    const hoje = new Date()
    const dataNasc = new Date(nascimento)
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--
    }
    return idade
  }

  const calcularTempoResidencia = (inicio: string) => {
    const hoje = new Date()
    const dataInicio = new Date(inicio)
    const anos = hoje.getFullYear() - dataInicio.getFullYear()
    const meses = hoje.getMonth() - dataInicio.getMonth()

    if (anos > 0) {
      return `${anos} ano${anos > 1 ? "s" : ""} e ${meses} mês${meses !== 1 ? "es" : ""}`
    }
    return `${meses} mês${meses !== 1 ? "es" : ""}`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Eye className="mr-2 h-4 w-4" />
          Ver detalhes
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Morador</DialogTitle>
          <DialogDescription>Informações completas do morador</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p className="text-sm">{morador.nome}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">RG</label>
              <p className="text-sm">{morador.rg}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">CPF</label>
              <p className="text-sm">{morador.cpf}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Nascimento</label>
              <p className="text-sm">
                {new Date(morador.nascimento).toLocaleDateString("pt-BR")} ({calcularIdade(morador.nascimento)} anos)
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
              <p className="text-sm">{morador.telefone}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Tipo de Residência</label>
              <p className="text-sm">{morador.tipoResidencia}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Endereço</label>
              <p className="text-sm">
                {morador.rua}, {morador.numero}
                <br />
                {morador.bairro}
                <br />
                CEP: {morador.cep}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Quantidade de Pessoas</label>
              <p className="text-sm">{morador.qtdPessoas} pessoas</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Tempo de Residência</label>
              <p className="text-sm">{calcularTempoResidencia(morador.tempoResidencia)}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge variant={morador.status === "adimplente" ? "outline" : "destructive"}>
                  {morador.status === "adimplente" ? "Adimplente" : "Inadimplente"}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Último Pagamento</label>
              <p className="text-sm">{new Date(morador.ultimoPagamento).toLocaleDateString("pt-BR")}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Valor Mensal</label>
              <p className="text-sm">R$ {morador.valorMensal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {morador.observacao && (
          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground">Observações</label>
            <p className="text-sm mt-1 p-3 bg-muted rounded-md">{morador.observacao}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function FinancasMoradoresTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()
  const isFuncionario = user?.role === UserRole.EMPLOYEE

  // Filtra os moradores com base no termo de busca
  const filteredMoradores = moradoresData.filter(
    (morador) =>
      morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      morador.cpf.includes(searchTerm) ||
      morador.rua.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar moradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-[300px]"
          />
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Pagamento</TableHead>
                <TableHead>Valor Mensal</TableHead>
                {!isFuncionario && <TableHead>Valor Devido</TableHead>}
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMoradores.map((morador) => (
                <TableRow key={morador.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {morador.nome}
                      {morador.observacao && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Observações - {morador.nome}</DialogTitle>
                              <DialogDescription>{morador.observacao}</DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{morador.cpf}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {morador.rua}, {morador.numero}
                      </div>
                      <div className="text-muted-foreground text-xs">{morador.bairro}</div>
                    </div>
                  </TableCell>
                  <TableCell>{morador.telefone}</TableCell>
                  <TableCell>
                    <Badge variant={morador.status === "adimplente" ? "outline" : "destructive"}>
                      {morador.status === "adimplente"
                        ? "Adimplente"
                        : `Inadimplente${morador.mesesAtraso > 0 ? ` (${morador.mesesAtraso} meses)` : ""}`}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(morador.ultimoPagamento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>R$ {morador.valorMensal.toFixed(2)}</TableCell>
                  {!isFuncionario && (
                    <TableCell>
                      <span className={morador.valorDevido > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                        R$ {morador.valorDevido.toFixed(2)}
                      </span>
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DetalhesModal morador={morador} />

                        {!isFuncionario && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/moradores/${morador.id}/pagamentos`}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Histórico de pagamentos
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Imprimir carnê
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
