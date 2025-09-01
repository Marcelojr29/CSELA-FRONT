import { UserRole } from "@/types/user"

export interface EditarUsuarioModalProps {
  children: React.ReactNode
  usuario: {
    id: string
    nome: string
    email: string
    role: UserRole
    status: string
  }
}