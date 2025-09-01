"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { MesPagamento } from "./mes-pagamento"
import { CarneAnualProps } from "@/interfaces/ICarneAnual"

export function CarneAnual({ ano, moradorId }: CarneAnualProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Carnê {ano}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 p-0">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid gap-2">
            {meses.map((mes, index) => (
              <MesPagamento key={`${ano}-${index}`} mes={mes} ano={ano} mesNumero={index + 1} moradorId={moradorId} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
