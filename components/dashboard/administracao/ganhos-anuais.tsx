"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", receitas: 22500, despesas: 12000, lucro: 10500 },
  { name: "Fev", receitas: 23000, despesas: 11500, lucro: 11500 },
  { name: "Mar", receitas: 24500, despesas: 12500, lucro: 12000 },
  { name: "Abr", receitas: 24000, despesas: 12200, lucro: 11800 },
  { name: "Mai", receitas: 25000, despesas: 12800, lucro: 12200 },
  { name: "Jun", receitas: 24565, despesas: 12350, lucro: 12215 },
  { name: "Jul", receitas: 25500, despesas: 13000, lucro: 12500 },
  { name: "Ago", receitas: 26000, despesas: 13200, lucro: 12800 },
  { name: "Set", receitas: 25800, despesas: 13100, lucro: 12700 },
  { name: "Out", receitas: 26500, despesas: 13500, lucro: 13000 },
  { name: "Nov", receitas: 26000, despesas: 13300, lucro: 12700 },
  { name: "Dez", receitas: 26500, despesas: 13500, lucro: 13000 },
]

export function GanhosAnuais() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e2e8f0" }} />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const labels = {
                receitas: "Receitas",
                despesas: "Despesas",
                lucro: "Lucro",
              }
              return [
                `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                labels[name as keyof typeof labels] || name,
              ]
            }}
            labelFormatter={(label) => `Mês: ${label}`}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Bar name="Receitas" dataKey="receitas" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <Bar name="Despesas" dataKey="despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          <Bar name="Lucro" dataKey="lucro" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
