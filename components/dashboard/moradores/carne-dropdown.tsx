"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Calendar } from "lucide-react"
import { CarneAnual } from "./carne-anual"
import { CarneDropdownProps } from "@/interfaces/ICarneDropdown"

export function CarneDropdown({ moradorId, moradorNome }: CarneDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Anos disponíveis para os carnês (2025, 2026, 2027)
  const anos = [2025, 2026, 2027]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Carnês
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Carnês de Pagamento</CardTitle>
            <CardDescription>{moradorNome}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {anos.map((ano) => (
              <CarneAnual key={ano} ano={ano} moradorId={moradorId} />
            ))}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
