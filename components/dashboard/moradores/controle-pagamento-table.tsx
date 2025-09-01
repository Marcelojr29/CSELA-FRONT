"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, DollarSign } from "lucide-react"
import { CarneDropdown } from "./carne-dropdown"
import Link from "next/link"

// Dados simulados de moradores para controle de pagamento
const moradoresData = [
  {
    id: "1",
    nome: "João Silva",
    cpf: "123.456.789-00",
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
  },
  {
    id: "3",
    nome: "Pedro Santos",
    cpf: "456.789.123-00",
  },
  {
    id: "4",
    nome: "Ana Souza",
    cpf: "789.123.456-00",
  },
  {
    id: "5",
    nome: "Carlos Ferreira",
    cpf: "321.654.987-00",
  },
]

export function ControlePagamentoTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtra os moradores com base no termo de busca
  const filteredMoradores = moradoresData.filter(
    (morador) => morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) || morador.cpf.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar moradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-[300px]"
          />
        </div>
        <Button asChild>
          <Link href="/dashboard/moradores/1/pagamentos">
            <DollarSign className="mr-2 h-4 w-4" />
            Registrar Pagamento
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead className="text-right">Carnês de Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMoradores.map((morador) => (
              <TableRow key={morador.id}>
                <TableCell className="font-medium">{morador.nome}</TableCell>
                <TableCell>{morador.cpf}</TableCell>
                <TableCell className="text-right">
                  <CarneDropdown moradorId={morador.id} moradorNome={morador.nome} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
