"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { homeApi } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface Pagamento {
  id: string
  valor: number
  mes: number
  ano: number
  mesAno: string
  status: string
  metodoPagamento: string
  dataPagamento: string
  criadoEm: string
  morador: {
    id: string
    nome: string
    endereco: string
    telefone: string
  }
}

export function RecentPayments() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        setIsLoading(true)
        const response = await homeApi.getUltimosPagamentos()
        
        if (response.data && Array.isArray(response.data)) {
          setPagamentos(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar últimos pagamentos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPagamentos()
  }, [])

  const getInitials = (nome: string) => {
    const names = nome.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return nome.substring(0, 2).toUpperCase()
  }

  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'pago') return 'outline'
    if (statusLower === 'pendente') return 'secondary'
    return 'destructive'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (pagamentos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum pagamento recente encontrado
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {pagamentos.map((pagamento) => (
        <div key={pagamento.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{getInitials(pagamento.morador.nome)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{pagamento.morador.nome}</p>
            <p className="text-sm text-muted-foreground">
              {pagamento.morador.endereco}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <div className="text-right">
              <p className="font-semibold">
                R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {pagamento.mesAno}
              </p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                <Badge variant={getStatusVariant(pagamento.status)} className="text-xs">
                  {pagamento.status}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {pagamento.metodoPagamento}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
