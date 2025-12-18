"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download } from "lucide-react"
import { GalleryManager } from "@/components/dashboard/galeria/gallery-manager"
import { AddPhotoModal } from "@/components/dashboard/galeria/add-photo-modal"

export default function GaleriaPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handlePhotoAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <AddPhotoModal onPhotoAdded={handlePhotoAdded}>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Foto
            </Button>
          </AddPhotoModal>
        </div>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todas">Todas as Fotos</TabsTrigger>
          <TabsTrigger value="ativas">Ativas no Site</TabsTrigger>
          <TabsTrigger value="inativas">Inativas</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Galeria</CardTitle>
              <CardDescription>Gerencie as fotos que aparecem no carrossel da página inicial do site</CardDescription>
            </CardHeader>
            <CardContent>
              <GalleryManager key={`todas-${refreshKey}`} filter="todas" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ativas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fotos Ativas</CardTitle>
              <CardDescription>Fotos que estão sendo exibidas no carrossel do site</CardDescription>
            </CardHeader>
            <CardContent>
              <GalleryManager key={`ativas-${refreshKey}`} filter="ativas" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inativas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fotos Inativas</CardTitle>
              <CardDescription>Fotos que não estão sendo exibidas no site</CardDescription>
            </CardHeader>
            <CardContent>
              <GalleryManager key={`inativas-${refreshKey}`} filter="inativas" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
