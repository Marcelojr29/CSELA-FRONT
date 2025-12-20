import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Plus } from "lucide-react"
import { MoradoresTable } from "@/components/dashboard/moradores/moradores-table"
import Link from "next/link"

export default function MoradoresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Moradores</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href="/dashboard/moradores/cadastro">
              <Plus className="mr-2 h-4 w-4" />
              Novo Morador
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="adimplentes">Adimplentes</TabsTrigger>
          <TabsTrigger value="inadimplentes">Inadimplentes</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Moradores</CardTitle>
              <CardDescription>Gerencie os moradores cadastrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <MoradoresTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adimplentes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moradores Adimplentes</CardTitle>
              <CardDescription>Moradores com pagamentos em dia</CardDescription>
            </CardHeader>
            <CardContent>
              <MoradoresTable filter="adimplentes" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inadimplentes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moradores Inadimplentes</CardTitle>
              <CardDescription>Moradores com pagamentos em atraso</CardDescription>
            </CardHeader>
            <CardContent>
              <MoradoresTable filter="inadimplentes" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
