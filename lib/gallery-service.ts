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
    imageUrl: "/images/AcaoSocial.jpeg",
    title: "Ação Social da Comunidade Bela Vista",
    description: "Ação Social da Comunidade Bela Vista",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2025-11-11",
  },
  {
    id: 2,
    imageUrl: "/images/Padre.jpeg",
    title: "Presidente Edivaldo Barreto",
    description: "Presidente Edivaldo Barreto em Ação Social da Comunidade Bela Vista",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2025-11-11",
  },
  {
    id: 3,
    imageUrl: "/images/Acao.jpeg",
    title: "Ação Social",
    description: "Entrega de alimentos durante a Ação Social da Comunidade Bela Vista",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2025-11-11",
  },
  {
    id: 4,
    imageUrl: "/images/Escavao1.jpeg",
    title: "Escavação",
    description: "Escavação",
    status: "ativa",
    addedBy: "Admin",
    addedAt: "2025-11-11"
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
