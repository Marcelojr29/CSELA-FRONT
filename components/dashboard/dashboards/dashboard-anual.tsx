"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", pagamentos: 22500, pendentes: 3500 },
  { name: "Fev", pagamentos: 23000, pendentes: 3000 },
  { name: "Mar", pagamentos: 24500, pendentes: 2500 },
  { name: "Abr", pagamentos: 24000, pendentes: 3000 },
  { name: "Mai", pagamentos: 25000, pendentes: 2000 },
  { name: "Jun", pagamentos: 24565, pendentes: 2435 },
  { name: "Jul", pagamentos: 25500, pendentes: 1500 },
  { name: "Ago", pagamentos: 26000, pendentes: 1000 },
  { name: "Set", pagamentos: 25800, pendentes: 1200 },
  { name: "Out", pagamentos: 26500, pendentes: 500 },
  { name: "Nov", pagamentos: 26000, pendentes: 1000 },
  { name: "Dez", pagamentos: 26500, pendentes: 500 },
]

export function DashboardAnual() {
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e2e8f0" }} />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              name === "pagamentos" ? "Pagamentos Recebidos" : "Pagamentos Pendentes",
            ]}
            labelFormatter={(label) => `Mês: ${label}`}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Bar name="Pagamentos Recebidos" dataKey="pagamentos" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <Bar name="Pagamentos Pendentes" dataKey="pendentes" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
