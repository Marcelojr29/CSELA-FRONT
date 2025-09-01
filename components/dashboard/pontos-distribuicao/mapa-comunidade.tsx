"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"

// Dados dos pontos de distribuição com coordenadas no mapa
const pontosDistribuicao = [
  {
    id: "1",
    nome: "Poço Comunitário 1",
    rua: "Rua das Flores",
    status: "ativo",
    familias: 45,
    horario: "08:00-17:00",
    posicao: { x: 15, y: 25 }, // Posição em % no mapa
  },
  {
    id: "2",
    nome: "Poço Artesiano 2",
    rua: "Avenida Principal",
    status: "ativo",
    familias: 62,
    horario: "07:30-16:30",
    posicao: { x: 45, y: 35 },
  },
  {
    id: "3",
    nome: "Poço Comunitário 3",
    rua: "Rua dos Pinheiros",
    status: "inativo",
    familias: 28,
    horario: "08:30-17:30",
    posicao: { x: 65, y: 55 },
  },
  {
    id: "4",
    nome: "Poço Artesiano 4",
    rua: "Alameda Santos",
    status: "ativo",
    familias: 38,
    horario: "07:00-16:00",
    posicao: { x: 25, y: 65 },
  },
  {
    id: "5",
    nome: "Poço Comunitário 5",
    rua: "Rua Augusta",
    status: "ativo",
    familias: 52,
    horario: "09:00-18:00",
    posicao: { x: 75, y: 45 },
  },
]

export function MapaComunidade() {
  const [pontoSelecionado, setPontoSelecionado] = useState<string | null>(null)

  const ponto = pontoSelecionado ? pontosDistribuicao.find((p) => p.id === pontoSelecionado) : null

  return (
    <div className="space-y-6">
      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm">Poço Ativo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm">Poço Inativo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm">Em Manutenção</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mapa */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mapa da Comunidade Bela Vista</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/images/mapa-comunidade.jpeg"
                  alt="Mapa da Comunidade Bela Vista"
                  fill
                  className="object-contain"
                />

                {/* Pontos de distribuição sobrepostos */}
                {pontosDistribuicao.map((ponto) => (
                  <button
                    key={ponto.id}
                    className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all hover:scale-125 ${
                      ponto.status === "ativo"
                        ? "bg-green-500"
                        : ponto.status === "inativo"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    } ${pontoSelecionado === ponto.id ? "scale-150 ring-2 ring-blue-500" : ""}`}
                    style={{
                      left: `${ponto.posicao.x}%`,
                      top: `${ponto.posicao.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setPontoSelecionado(ponto.id)}
                    title={ponto.nome}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações do ponto selecionado */}
        <div>
          {ponto ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {ponto.nome}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">{ponto.rua}</p>
                  <Badge variant={ponto.status === "ativo" ? "outline" : "secondary"}>
                    {ponto.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ponto.familias} famílias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ponto.horario}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a href={`/dashboard/pontos-distribuicao/${ponto.id}`}>Ver Detalhes</a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/dashboard/pontos-distribuicao/${ponto.id}/editar`}>Editar</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Selecione um Ponto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clique em um ponto no mapa para ver suas informações detalhadas.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Lista de todos os pontos */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Todos os Pontos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pontosDistribuicao.map((p) => (
                  <button
                    key={p.id}
                    className={`w-full text-left p-2 rounded-md hover:bg-muted transition-colors ${
                      pontoSelecionado === p.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setPontoSelecionado(p.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.status === "ativo" ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm font-medium">{p.nome}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-4">{p.rua}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
