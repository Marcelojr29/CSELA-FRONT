"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerfisTable } from "@/components/dashboard/admin/perfis-table"
import { Shield, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CriarPerfilModal } from "@/components/dashboard/admin/criar-perfil-modal"
import { useToast } from "@/components/ui/use-toast"
import { usePerfisAPI } from "@/hooks/use-perfis-api"

export default function PerfisPage() {
  const { toast } = useToast()
  const { 
    perfis, 
    isLoading, 
    error, 
    fetchPerfis,
    refresh 
  } = usePerfisAPI()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Carregar perfis ao montar o componente
  useEffect(() => {
    fetchPerfis()
  }, [])

  const handleRefresh = async () => {
    await refresh()
    toast({
      title: "Dados atualizados",
      description: "A lista de perfis foi atualizada com sucesso.",
    })
  }

  if (error) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <Shield className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Erro ao carregar perfis</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Ocorreu um erro ao carregar os perfis. Por favor, tente novamente mais tarde.
          </p>
          <Button onClick={handleRefresh} className="mt-4" variant="outline">
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Perfis de Acesso</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Perfil
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Perfis</CardTitle>
          <CardDescription>
            Visualize e gerencie os perfis de acesso disponíveis no sistema. Cada perfil determina quais funcionalidades
            um usuário pode acessar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-[400px] w-full items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <PerfisTable perfis={perfis} />
          )}
        </CardContent>
      </Card>

      <CriarPerfilModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
