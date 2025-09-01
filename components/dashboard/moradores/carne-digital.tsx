"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useCallback } from "react"
import { CarneDigitalProps } from "@/interfaces/ICarneDigital"

// Dados simulados do morador
const moradorData = {
  id: "1",
  nome: "João Silva Santos",
  cpf: "123.456.789-00",
  endereco: "Rua das Flores, 123",
  comunidade: "Vila Esperança",
  valorMensal: 50.0,
}

// Dados simulados do carnê
const carneDataInicial = [
  { mes: "Janeiro", ano: 2024, valor: 50.0, status: "pago", dataPagamento: "10/01/2024", mesRef: "2024-01" },
  { mes: "Fevereiro", ano: 2024, valor: 50.0, status: "pago", dataPagamento: "15/02/2024", mesRef: "2024-02" },
  { mes: "Março", ano: 2024, valor: 50.0, status: "pago", dataPagamento: "12/03/2024", mesRef: "2024-03" },
  { mes: "Abril", ano: 2024, valor: 50.0, status: "pago", dataPagamento: "08/04/2024", mesRef: "2024-04" },
  { mes: "Maio", ano: 2024, valor: 50.0, status: "pago", dataPagamento: "10/05/2024", mesRef: "2024-05" },
  { mes: "Junho", ano: 2024, valor: 50.0, status: "pago", dataPagamento: "15/06/2024", mesRef: "2024-06" },
  { mes: "Julho", ano: 2024, valor: 50.0, status: "pendente", dataPagamento: "", mesRef: "2024-07" },
  { mes: "Agosto", ano: 2024, valor: 50.0, status: "pendente", dataPagamento: "", mesRef: "2024-08" },
  { mes: "Setembro", ano: 2024, valor: 50.0, status: "pendente", dataPagamento: "", mesRef: "2024-09" },
  { mes: "Outubro", ano: 2024, valor: 50.0, status: "pendente", dataPagamento: "", mesRef: "2024-10" },
  { mes: "Novembro", ano: 2024, valor: 50.0, status: "pendente", dataPagamento: "", mesRef: "2024-11" },
  { mes: "Dezembro", ano: 2024, valor: 50.0, status: "pendente", dataPagamento: "", mesRef: "2024-12" },
]

export function CarneDigital({ moradorId }: CarneDigitalProps) {
  const { toast } = useToast()
  const [carneData, setCarneData] = useState(carneDataInicial)

  const handlePrint = () => {
    toast({
      title: "Imprimindo carnê",
      description: "O carnê está sendo enviado para impressão.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "O carnê está sendo baixado como PDF.",
    })
  }

  const handleStatusChange = (index: number, checked: boolean) => {
    setCarneData((prev) => {
      const newData = [...prev]
      newData[index] = {
        ...newData[index],
        status: checked ? "pago" : "pendente",
        dataPagamento: checked ? new Date().toLocaleDateString("pt-BR") : "",
      }
      return newData
    })

    const mes = carneData[index].mes
    toast({
      title: checked ? "Pagamento marcado como pago" : "Pagamento desmarcado",
      description: `${mes} foi ${checked ? "marcado como pago" : "desmarcado"}.`,
    })
  }

  // Função para marcar um mês como pago (chamada pelo formulário PIX)
  const marcarMesComoPago = useCallback((mesRef: string) => {
    setCarneData((prev) => {
      const newData = [...prev]
      const index = newData.findIndex((item) => item.mesRef === mesRef)
      if (index !== -1) {
        newData[index] = {
          ...newData[index],
          status: "pago",
          dataPagamento: new Date().toLocaleDateString("pt-BR"),
        }
      }
      return newData
    })
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{moradorData.nome}</h3>
          <p className="text-sm text-muted-foreground">{moradorData.cpf}</p>
          <p className="text-sm text-muted-foreground">{moradorData.endereco}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {carneData.map((parcela, index) => (
          <Card
            key={index}
            className={`border-2 transition-all duration-200 ${
              parcela.status === "pago"
                ? "border-green-200 bg-green-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  {parcela.mes}/{parcela.ano}
                </div>
                <div className="text-lg font-bold">R$ {parcela.valor.toFixed(2)}</div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`parcela-${index}`}
                    checked={parcela.status === "pago"}
                    onCheckedChange={(checked) => handleStatusChange(index, checked as boolean)}
                  />
                  <label htmlFor={`parcela-${index}`} className="text-xs font-medium cursor-pointer">
                    {parcela.status === "pago" ? "Pago" : "Marcar como pago"}
                  </label>
                </div>

                {parcela.status === "pago" && parcela.dataPagamento && (
                  <div className="text-xs text-green-600 font-medium">Pago em {parcela.dataPagamento}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
        <p>
          <strong>Como usar:</strong> Clique no checkbox de cada mês para marcar como pago quando receber o pagamento em
          dinheiro. Para pagamentos PIX, use o formulário ao lado que marca automaticamente.
        </p>
      </div>
    </div>
  )
}
