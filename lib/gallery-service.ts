// Serviço para gerenciar as fotos da galeria
export interface GalleryPhoto {
  id: number
  imageUrl: string
  title: string
  description: string
  status: "ativa" | "inativa"
  addedBy: string
  addedAt: string
  views?: number
}

// Simulando um "banco de dados" em memória
let galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    title: "Inauguração do novo sistema de captação",
    description: "Cerimônia de inauguração do sistema de captação de água na comunidade Vila Esperança",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2024-01-15",
    views: 1250,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
    title: "Voluntários em ação",
    description: "Equipe de voluntários trabalhando na construção de cisternas no semiárido",
    status: "ativa",
    addedBy: "Funcionário",
    addedAt: "2024-01-10",
    views: 980,
  },
  {
    id: 3,
    imageUrl: "/images/csela1.png",
    title: "Mostra Cultural",
    description: "Mostra Cultural",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2024-01-10",
    views: 980,
  },
]

export const galleryService = {
  // Buscar todas as fotos (com filtro opcional)
  getPhotos: (options?: { status?: "ativa" | "inativa" }): GalleryPhoto[] => {
    let filteredPhotos = [...galleryPhotos]
    
    if (options?.status) {
      filteredPhotos = filteredPhotos.filter(photo => photo.status === options.status)
    }
    
    return filteredPhotos.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
  },

  // Buscar foto por ID
  getPhotoById: (id: number): GalleryPhoto | undefined => {
    return galleryPhotos.find(photo => photo.id === id)
  },

  // Adicionar nova foto
  addPhoto: (photoData: Omit<GalleryPhoto, "id" | "addedAt" | "views">): GalleryPhoto => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: Math.max(...galleryPhotos.map(p => p.id), 0) + 1,
      addedAt: new Date().toISOString().split('T')[0],
      views: 0
    }
    
    galleryPhotos.push(newPhoto)
    return newPhoto
  },

  // Atualizar foto
  updatePhoto: (id: number, updates: Partial<GalleryPhoto>): GalleryPhoto | null => {
    const index = galleryPhotos.findIndex(photo => photo.id === id)
    if (index === -1) return null
    
    galleryPhotos[index] = { ...galleryPhotos[index], ...updates }
    return galleryPhotos[index]
  },

  // Deletar foto
  deletePhoto: (id: number): boolean => {
    const initialLength = galleryPhotos.length
    galleryPhotos = galleryPhotos.filter(photo => photo.id !== id)
    return galleryPhotos.length < initialLength
  },

  // Alternar status da foto
  togglePhotoStatus: (id: number): GalleryPhoto | null => {
    const photo = galleryPhotos.find(p => p.id === id)
    if (!photo) return null
    
    photo.status = photo.status === "ativa" ? "inativa" : "ativa"
    return photo
  },

  // Incrementar visualizações
  incrementViews: (id: number): void => {
    const photo = galleryPhotos.find(p => p.id === id)
    if (photo && photo.views !== undefined) {
      photo.views++
    }
  }
}
