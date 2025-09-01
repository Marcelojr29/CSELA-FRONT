"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "1", receitas: 850, despesas: 400, lucro: 450 },
  { name: "2", receitas: 920, despesas: 380, lucro: 540 },
  { name: "3", receitas: 880, despesas: 410, lucro: 470 },
  { name: "4", receitas: 950, despesas: 450, lucro: 500 },
  { name: "5", receitas: 830, despesas: 420, lucro: 410 },
  { name: "6", receitas: 860, despesas: 390, lucro: 470 },
  { name: "7", receitas: 910, despesas: 430, lucro: 480 },
  { name: "8", receitas: 940, despesas: 410, lucro: 530 },
  { name: "9", receitas: 870, despesas: 400, lucro: 470 },
  { name: "10", receitas: 890, despesas: 420, lucro: 470 },
  { name: "11", receitas: 920, despesas: 440, lucro: 480 },
  { name: "12", receitas: 950, despesas: 430, lucro: 520 },
  { name: "13", receitas: 880, despesas: 410, lucro: 470 },
  { name: "14", receitas: 900, despesas: 400, lucro: 500 },
  { name: "15", receitas: 930, despesas: 420, lucro: 510 },
  { name: "16", receitas: 870, despesas: 390, lucro: 480 },
  { name: "17", receitas: 850, despesas: 380, lucro: 470 },
  { name: "18", receitas: 880, despesas: 400, lucro: 480 },
  { name: "19", receitas: 910, despesas: 430, lucro: 480 },
  { name: "20", receitas: 940, despesas: 450, lucro: 490 },
  { name: "21", receitas: 920, despesas: 420, lucro: 500 },
  { name: "22", receitas: 890, despesas: 410, lucro: 480 },
  { name: "23", receitas: 860, despesas: 390, lucro: 470 },
  { name: "24", receitas: 880, despesas: 400, lucro: 480 },
  { name: "25", receitas: 910, despesas: 420, lucro: 490 },
  { name: "26", receitas: 930, despesas: 440, lucro: 490 },
  { name: "27", receitas: 950, despesas: 430, lucro: 520 },
  { name: "28", receitas: 920, despesas: 410, lucro: 510 },
  { name: "29", receitas: 890, despesas: 400, lucro: 490 },
  { name: "30", receitas: 870, despesas: 390, lucro: 480 },
]

export function GanhosMensais() {
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
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e2e8f0" }}
            label={{ value: "Dia do Mês", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e2e8f0" }}
            label={{ value: "Valor (R$)", angle: -90, position: "insideLeft" }}
            tickFormatter={(value) => `R$ ${value}`}
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
            labelFormatter={(label) => `Dia ${label}`}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Bar name="Receitas" dataKey="receitas" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
          <Bar name="Despesas" dataKey="despesas" fill="#f43f5e" radius={[2, 2, 0, 0]} />
          <Bar name="Lucro" dataKey="lucro" fill="#10b981" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
