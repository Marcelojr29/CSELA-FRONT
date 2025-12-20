import { UserRole } from "@/types/user"

// Estrutura individual de cada módulo de permissão
export interface PermissionModule {
  name: string
  permissions: string[]
}

// Estrutura completa de permissões como retornada pela API
export interface Permissoes {
  user_management: PermissionModule
  operation: PermissionModule
  reports_analytics: PermissionModule
  advanced: PermissionModule
}

// Interface do perfil completo
export interface Perfil {
  id: string
  nome: string
  status: boolean
  permissoes: Permissoes
  createdAt?: string
  updatedAt?: string
}

// Interface do usuário com perfil
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  perfil?: Perfil
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
}