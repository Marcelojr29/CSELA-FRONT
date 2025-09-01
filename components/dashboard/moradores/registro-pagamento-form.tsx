"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { RegistroPagamentoFormProps } from "@/interfaces/IRegistroPagamentoFormProps"

// Dados simulados do carnê (em uma implementação real, viria do backend)
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

export function RegistroPagamentoForm({ moradorId, onPagamentoRegistrado }: RegistroPagamentoFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mesReferencia, setMesReferencia] = useState("")
  const [valor, setValor] = useState("50.00")
  const [comprovante, setComprovante] = useState<File | null>(null)
  const [observacao, setObservacao] = useState("")
  const [mesesDisponiveis, setMesesDisponiveis] = useState<Array<{ value: string; label: string }>>([])

  // Atualiza os meses disponíveis baseado no status do carnê
  useEffect(() => {
    const mesesPendentes = carneDataInicial
      .filter((item) => item.status === "pendente")
      .map((item) => ({
        value: item.mesRef,
        label: `${item.mes} ${item.ano}`,
      }))

    setMesesDisponiveis(mesesPendentes)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprovante(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validações
    if (!mesReferencia) {
      toast({
        title: "Erro ao registrar pagamento",
        description: "Selecione o mês de referência do pagamento.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!comprovante) {
      toast({
        title: "Erro ao registrar pagamento",
        description: "É obrigatório anexar o comprovante PIX.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulação de envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setComprovante(null)
      setObservacao("")

      const mesInfo = carneDataInicial.find((item) => item.mesRef === mesReferencia)
      const mesNome = mesInfo ? `${mesInfo.mes}/${mesInfo.ano}` : mesReferencia

      // Notifica o componente pai para atualizar o carnê
      if (onPagamentoRegistrado) {
        onPagamentoRegistrado(mesReferencia)
      }

      // Remove o mês da lista de disponíveis
      setMesesDisponiveis((prev) => prev.filter((mes) => mes.value !== mesReferencia))
      setMesReferencia("")

      toast({
        title: "Pagamento PIX registrado com sucesso!",
        description: `Pagamento de ${mesNome} foi registrado e o carnê foi atualizado automaticamente.`,
      })
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mes-referencia">Mês de Referência *</Label>
        <select
          id="mes-referencia"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={mesReferencia}
          onChange={(e) => setMesReferencia(e.target.value)}
          required
        >
          <option value="">Selecione o mês...</option>
          {mesesDisponiveis.map((mes) => (
            <option key={mes.value} value={mes.value}>
              {mes.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          {mesesDisponiveis.length === 0
            ? "Todos os meses já foram pagos!"
            : `Apenas meses pendentes estão disponíveis (${mesesDisponiveis.length} restantes)`}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="valor">Valor</Label>
        <Input id="valor" type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comprovante">Comprovante PIX *</Label>
        <Input id="comprovante" type="file" onChange={handleFileChange} accept="image/*,.pdf" required />
        <p className="text-xs text-muted-foreground">Anexe o comprovante de transferência PIX (imagem ou PDF)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacao">Observação (opcional)</Label>
        <Textarea
          id="observacao"
          placeholder="Informações adicionais sobre este pagamento PIX..."
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || mesesDisponiveis.length === 0}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registrando PIX...
          </>
        ) : mesesDisponiveis.length === 0 ? (
          "Todos os meses já foram pagos"
        ) : (
          "Registrar Pagamento PIX"
        )}
      </Button>
    </form>
  )
}
