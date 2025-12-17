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
import { pagamentosApi } from "@/lib/api"

interface MesDisponivel {
  value: string
  label: string
  valorSugerido: number
}

export function RegistroPagamentoForm({ moradorId, onPagamentoRegistrado }: RegistroPagamentoFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mesReferencia, setMesReferencia] = useState("")
  const [valor, setValor] = useState("150.00")
  const [comprovante, setComprovante] = useState<File | null>(null)
  const [observacao, setObservacao] = useState("")
  const [mesesDisponiveis, setMesesDisponiveis] = useState<MesDisponivel[]>([])
  const [metodo, setMetodo] = useState<"Pix" | "Dinheiro">("Pix")

  // Busca os meses disponíveis do carnê digital
  useEffect(() => {
    const fetchMesesDisponiveis = async () => {
      try {
        setIsLoading(true)
        const anoAtual = new Date().getFullYear()
        const response = await pagamentosApi.getCarneDigital(moradorId, anoAtual)
        
        if (response.data && response.data.meses && Array.isArray(response.data.meses)) {
          const mesesPendentes = response.data.meses
            .filter((item: any) => item.status === "Pendente" || item.status === "Atrasado")
            .map((item: any) => ({
              value: `${String(item.mes).padStart(2, '0')}/${item.ano || response.data.ano}`,
              label: `${item.nomeCompleto} ${item.ano || response.data.ano}`,
              valorSugerido: item.valor || 150.00
            }))
          
          setMesesDisponiveis(mesesPendentes)
          
          if (mesesPendentes.length > 0) {
            setValor(mesesPendentes[0].valorSugerido.toFixed(2))
          }
        }
      } catch (error: any) {
        console.error('Erro ao buscar meses disponíveis:', error)
        toast({
          title: "Erro ao carregar meses",
          description: error.message || "Não foi possível carregar os meses disponíveis.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (moradorId) {
      fetchMesesDisponiveis()
    }
  }, [moradorId, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprovante(e.target.files[0])
    }
  }

  // Converte arquivo para base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
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

      if (!comprovante && metodo === "Pix") {
        toast({
          title: "Erro ao registrar pagamento",
          description: "É obrigatório anexar o comprovante PIX.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Converte comprovante para base64 se houver
      let comprovanteBase64 = null
      if (comprovante) {
        comprovanteBase64 = await fileToBase64(comprovante)
      }

      // Prepara dados do pagamento
      const today = new Date().toISOString().split('T')[0]
      const pagamentoData = {
        mesAno: mesReferencia,
        valor: parseFloat(valor),
        dataPagamento: today,
        metodo,
        comprovante: comprovanteBase64,
        observacao: observacao || undefined,
      }

      // Envia para API
      await pagamentosApi.registrarPagamento(moradorId, pagamentoData)

      // Limpa formulário
      setComprovante(null)
      setObservacao("")
      setMesReferencia("")

      // Atualiza a lista de meses disponíveis
      setMesesDisponiveis((prev) => prev.filter((mes) => mes.value !== mesReferencia))

      // Notifica o componente pai
      if (onPagamentoRegistrado) {
        onPagamentoRegistrado(mesReferencia)
      }

      toast({
        title: "Pagamento registrado com sucesso!",
        description: `Pagamento de ${mesReferencia.split('/')[0]}/${mesReferencia.split('/')[1]} foi registrado no sistema.`,
      })

      // Recarrega a página após 1.5 segundos para atualizar todos os dados
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error: any) {
      console.error('Erro ao registrar pagamento:', error)
      toast({
        title: "Erro ao registrar pagamento",
        description: error.message || "Não foi possível registrar o pagamento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="mes-referencia">Mês de Referência *</Label>
            <select
              id="mes-referencia"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={mesReferencia}
              onChange={(e) => {
                setMesReferencia(e.target.value)
                const mesSelecionado = mesesDisponiveis.find(m => m.value === e.target.value)
                if (mesSelecionado) {
                  setValor(mesSelecionado.valorSugerido.toFixed(2))
                }
              }}
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
            <Label htmlFor="metodo">Método de Pagamento *</Label>
            <select
              id="metodo"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={metodo}
              onChange={(e) => setMetodo(e.target.value as "Pix" | "Dinheiro")}
              required
            >
              <option value="Pix">PIX</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor *</Label>
            <Input id="valor" type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comprovante">
              Comprovante {metodo === "Pix" ? "*" : "(opcional)"}
            </Label>
            <Input 
              id="comprovante" 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*,.pdf" 
              required={metodo === "Pix"}
            />
            <p className="text-xs text-muted-foreground">
              {metodo === "Pix" 
                ? "Anexe o comprovante de transferência PIX (imagem ou PDF)"
                : "Opcionalmente anexe um comprovante (imagem ou PDF)"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacao">Observação (opcional)</Label>
            <Textarea
              id="observacao"
              placeholder="Informações adicionais sobre este pagamento..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || mesesDisponiveis.length === 0}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando pagamento...
              </>
            ) : mesesDisponiveis.length === 0 ? (
              "Todos os meses já foram pagos"
            ) : (
              "Registrar Pagamento"
            )}
          </Button>
        </>
      )}
    </form>
  )
}
