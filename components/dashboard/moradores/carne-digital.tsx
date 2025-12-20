"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Download, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useCallback, useEffect } from "react"
import { CarneDigitalProps } from "@/interfaces/ICarneDigital"
import { pagamentosApi } from "@/lib/api"

interface MesCarneDigital {
  mes: number
  nomeCompleto: string
  status: "Pago" | "Atrasado" | "Pendente"
  dataPagamento: string | null
  valor: number | null
}

interface CarneDigitalData {
  morador: {
    nome: string
    cpf: string
    rua: string
    numeroResidencia: string
  }
  ano: number
  meses: MesCarneDigital[]
}

export function CarneDigital({ moradorId }: CarneDigitalProps) {
  const { toast } = useToast()
  const [carneData, setCarneData] = useState<CarneDigitalData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])

  // Buscar dados do carnê digital
  useEffect(() => {
    const fetchCarneDigital = async () => {
      setIsLoading(true)
      try {
        const response = await pagamentosApi.getCarneDigital(moradorId, selectedYear)
        if (response.error) {
          throw new Error(response.error)
        }
        response.data.meses.forEach((mes: MesCarneDigital) => {
          mes.valor = mes.valor ? parseFloat(parseFloat(mes.valor.toString()).toFixed(2)) : null
        })
        setCarneData(response.data)
      } catch (error: any) {
        toast({
          title: "Erro ao carregar carnê digital",
          description: error.message || "Ocorreu um erro inesperado",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCarneDigital()
  }, [moradorId, selectedYear, toast])

  const toggleMonthSelection = (mes: number) => {
    setSelectedMonths((prev) =>
      prev.includes(mes) ? prev.filter((m) => m !== mes) : [...prev, mes]
    )
  }

  const selectAllMonths = () => {
    if (carneData) {
      setSelectedMonths(carneData.meses.map((m) => m.mes))
    }
  }

  const clearSelection = () => {
    setSelectedMonths([])
  }

  const handlePrint = () => {
    if (!carneData) return

    const mesesSelecionados = carneData.meses.filter((mes) => selectedMonths.includes(mes.mes))
    if (mesesSelecionados.length === 0) {
      toast({
        title: "Nenhum mês selecionado",
        description: "Selecione pelo menos um mês para imprimir.",
        variant: "destructive",
      })
      return
    }

    // Criar conteúdo HTML para impressão
    const printContent = `
      <html>
        <head>
          <title>Carnê Digital - ${carneData.morador.nome}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .morador-info { margin-bottom: 20px; }
            .mes-card { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; page-break-inside: avoid; }
            .mes-card.pago { background-color: #d4edda; }
            .mes-card.atrasado { background-color: #f8d7da; }
            .mes-card.pendente { background-color: #fff3cd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Carnê Digital ${carneData.ano}</h1>
          </div>
          <div class="morador-info">
            <p><strong>Nome:</strong> ${carneData.morador.nome}</p>
            <p><strong>CPF:</strong> ${carneData.morador.cpf}</p>
            <p><strong>Endereço:</strong> ${carneData.morador.rua}, ${carneData.morador.numeroResidencia}</p>
          </div>
          ${mesesSelecionados.map((mes) => `
            <div class="mes-card ${mes.status.toLowerCase()}">
              <h3>${mes.nomeCompleto}/${carneData.ano}</h3>
              <p><strong>Status:</strong> ${mes.status}</p>
              <p><strong>Valor:</strong> R$ ${mes.valor?.toFixed(2) || '0.00'}</p>
              ${mes.dataPagamento ? `<p><strong>Data Pagamento:</strong> ${new Date(mes.dataPagamento).toLocaleDateString('pt-BR')}</p>` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }

    toast({
      title: "Imprimindo carnê",
      description: `${mesesSelecionados.length} meses selecionados para impressão.`,
    })
  }

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "O carnê está sendo baixado como PDF.",
    })
  }

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Carregando carnê...</span>
        </div>
      ) : !carneData ? (
        <div className="text-center py-8 text-muted-foreground">Nenhum dado disponível</div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{carneData.morador.nome}</h3>
              <p className="text-sm text-muted-foreground">CPF: {carneData.morador.cpf}</p>
              <p className="text-sm text-muted-foreground">
                {carneData.morador.rua}, {carneData.morador.numeroResidencia}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAllMonths}>
                Selecionar Todos
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Limpar Seleção
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {carneData.meses.map((mes) => (
              <Card
                key={mes.mes}
                className={`cursor-pointer transition-all ${
                  selectedMonths.includes(mes.mes) ? "ring-2 ring-primary" : ""
                } ${
                  mes.status === "Pago"
                    ? "border-green-500 bg-green-50"
                    : mes.status === "Atrasado"
                    ? "border-red-500 bg-red-50"
                    : "border-yellow-500 bg-yellow-50"
                }`}
                onClick={() => toggleMonthSelection(mes.mes)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{mes.nomeCompleto}</p>
                      <p className="text-sm text-muted-foreground">{carneData.ano}</p>
                      <p className="text-lg font-bold mt-2">
                        {mes.valor ? `R$ ${mes.valor}` : "-"}
                      </p>
                      {mes.dataPagamento && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Pago em: {new Date(mes.dataPagamento).toLocaleDateString("pt-BR")}
                        </p>
                      )}
                    </div>
                    <Checkbox checked={selectedMonths.includes(mes.mes)} />
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        mes.status === "Pago"
                          ? "bg-green-100 text-green-800"
                          : mes.status === "Atrasado"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {mes.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            <Button onClick={handlePrint} disabled={selectedMonths.length === 0}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir Selecionados ({selectedMonths.length})
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
