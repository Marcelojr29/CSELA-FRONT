"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

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
  },
  {
    id: "4",
    rua: "Alameda Santos",
    poco: "Poço Artesiano 4",
    dataCriacao: "2018-11-05",
    horarioManha: "07:00 - 11:00",
    horarioTarde: "13:00 - 16:00",
    status: "ativo",
    comunidade: "Jardim Primavera",
  },
  {
    id: "5",
    rua: "Rua Augusta",
    poco: "Poço Comunitário 5",
    dataCriacao: "2022-01-15",
    horarioManha: "09:00 - 12:00",
    horarioTarde: "15:00 - 18:00",
    status: "ativo",
    comunidade: "Vila Esperança",
  },
]

export function PontosDistribuicaoTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtra os pontos de distribuição com base no termo de busca
  const filteredPontos = pontosDistribuicaoData.filter(
    (ponto) =>
      ponto.rua.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ponto.poco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ponto.comunidade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar pontos de distribuição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 w-[300px]"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rua</TableHead>
              <TableHead>Poço</TableHead>
              <TableHead>Comunidade</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Horário Manhã</TableHead>
              <TableHead>Horário Tarde</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPontos.map((ponto) => (
              <TableRow key={ponto.id}>
                <TableCell className="font-medium">{ponto.rua}</TableCell>
                <TableCell>{ponto.poco}</TableCell>
                <TableCell>{ponto.comunidade}</TableCell>
                <TableCell>{new Date(ponto.dataCriacao).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>{ponto.horarioManha}</TableCell>
                <TableCell>{ponto.horarioTarde}</TableCell>
                <TableCell>
                  <Badge variant={ponto.status === "ativo" ? "outline" : "secondary"}>
                    {ponto.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/pontos-distribuicao/${ponto.id}`}>Ver detalhes</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/pontos-distribuicao/${ponto.id}/editar`}>Editar ponto</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {ponto.status === "ativo" ? "Desativar ponto" : "Ativar ponto"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
