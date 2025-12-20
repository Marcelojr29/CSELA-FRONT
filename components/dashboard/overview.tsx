"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { homeApi } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface ArrecadacaoMes {
  mes: number
  ano: number
  nomeMes: string
  mesAno: string
  totalArrecadado: number
  quantidadePagamentos: number
}

export function Overview() {
  const [data, setData] = useState<ArrecadacaoMes[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await homeApi.getArrecadacaoMensal()
        
        if (response.data && response.data.arrecadacaoPorMes) {
          setData(response.data.arrecadacaoPorMes)
        }
      } catch (error) {
        console.error('Erro ao buscar arrecadação mensal:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis 
          dataKey="nomeMes" 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value.toLocaleString('pt-BR')}`}
        />
        <Tooltip
          formatter={(value: number) => [
            `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            "Total Arrecadado"
          ]}
          labelFormatter={(label) => `Mês: ${label}`}
        />
        <Bar dataKey="totalArrecadado" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
