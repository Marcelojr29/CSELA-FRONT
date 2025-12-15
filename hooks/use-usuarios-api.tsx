"use client"

import { useState } from "react"
import { usersApi } from "@/lib/api"

// Interface do usuário baseada na documentação da API
export interface Usuario {
  id: string
  nome: string
  email: string
  status: boolean
  ultimoAcesso?: string | null
  perfilId: string
  perfil: {
    id: string
    nome: string
    status: boolean
    permissoes?: any
  }
  createdAt: string
  updatedAt: string
}

// Dados mock para fallback quando a API não estiver disponível
const mockUsuarios: Usuario[] = [
  {
    id: "1",
    nome: "Administrador Sistema",
    email: "admin@csela.org", 
    status: true,
    ultimoAcesso: "2024-12-14T10:00:00.000Z",
    perfilId: "1",
    perfil: {
      id: "1",
      nome: "Administrador",
      status: true
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-12-14T10:00:00.000Z"
  },
  {
    id: "2",
    nome: "Contador Sistema",
    email: "contador@csela.org",
    status: true,
    ultimoAcesso: "2024-12-14T09:30:00.000Z", 
    perfilId: "2",
    perfil: {
      id: "2",
      nome: "Contador",
      status: true
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-12-14T09:30:00.000Z"
  }
]

/**
 * Hook para gerenciar usuários do sistema
 */
export function useUsuariosAPI() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Buscar todos os usuários
   */
  const fetchUsuarios = async (filters?: {
    page?: number
    limit?: number
    nome?: string
    email?: string
    status?: boolean
    perfilId?: string
    sort?: string
    order?: 'ASC' | 'DESC'
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('🔍 Buscando usuários...', filters)
      
      const queryParams = new URLSearchParams()
      
      if (filters?.page) queryParams.append('page', filters.page.toString())
      if (filters?.limit) queryParams.append('limit', filters.limit.toString())
      if (filters?.nome) queryParams.append('nome', filters.nome)
      if (filters?.email) queryParams.append('email', filters.email)
      if (filters?.status !== undefined) queryParams.append('status', filters.status.toString())
      if (filters?.perfilId) queryParams.append('perfilId', filters.perfilId)
      if (filters?.sort) queryParams.append('sort', filters.sort)
      if (filters?.order) queryParams.append('order', filters.order)

      const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : ''
      console.log('📡 Chamando endpoint:', endpoint)
      
      const response = await usersApi.getUsers(endpoint)
      console.log('📥 Resposta da API:', response)

      if (response.error) {
        throw new Error(response.error)
      }

      // A API pode retornar diferentes formatos
      let usuariosData = []
      if (response.data?.data) {
        // Formato com paginação: { data: [...], total, page, limit, totalPages }
        usuariosData = response.data.data
      } else if (Array.isArray(response.data)) {
        // Formato direto: [...]
        usuariosData = response.data
      } else {
        console.warn('⚠️ Formato de resposta inesperado:', response.data)
        usuariosData = []
      }

      console.log('✅ Usuários carregados:', usuariosData)
      setUsuarios(usuariosData)
      return response.data
    } catch (err: any) {
      console.error('❌ Erro ao buscar usuários:', err)
      
      // Verificar se é erro de conexão (API não disponível)
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError') || err.message?.includes('Erro de conexão')) {
        console.warn('🔄 API não disponível, usando dados mock')
        setUsuarios(mockUsuarios)
        setError(null) // Não mostrar erro se conseguiu carregar dados mock
        return { data: mockUsuarios, total: mockUsuarios.length, page: 1, limit: 10, totalPages: 1 }
      }
      
      setError(err)
      setUsuarios([]) // Limpar lista em caso de erro
      return null
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Buscar usuário por ID
   */
  const fetchUsuarioById = async (id: string): Promise<Usuario | null> => {
    try {
      console.log('🔍 Buscando usuário por ID:', id)
      const response = await usersApi.getUserById(id)
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    } catch (err: any) {
      console.error("Erro ao buscar usuário:", err)
      setError(err)
      return null
    }
  }

  /**
   * Criar novo usuário
   */
  const criarUsuario = async (usuarioData: {
    nome: string
    email: string
    senha: string
    perfilId: string
    status?: boolean
  }): Promise<Usuario | null> => {
    try {
      console.log('➕ Criando usuário:', usuarioData)
      
      const novoUsuarioData = {
        nome: usuarioData.nome,
        email: usuarioData.email,
        senha: usuarioData.senha,
        perfilId: usuarioData.perfilId,
        status: usuarioData.status ?? true
      }

      const response = await usersApi.createUser(novoUsuarioData)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const novoUsuario = response.data
      setUsuarios(prev => [...prev, novoUsuario])
      
      return novoUsuario
    } catch (err: any) {
      console.error("Erro ao criar usuário:", err)
      setError(err)
      return null
    }
  }

  /**
   * Atualizar usuário
   */
  const atualizarUsuario = async (id: string, usuarioData: Partial<{
    nome: string
    email: string
    perfilId: string
    status: boolean
  }>): Promise<Usuario | null> => {
    try {
      console.log('📝 Atualizando usuário:', id, usuarioData)
      const response = await usersApi.updateUser(id, usuarioData)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const usuarioAtualizado = response.data
      setUsuarios(prev => prev.map(u => u.id === id ? usuarioAtualizado : u))
      
      return usuarioAtualizado
    } catch (err: any) {
      console.error("Erro ao atualizar usuário:", err)
      setError(err)
      return null
    }
  }

  /**
   * Alternar status do usuário (ativar/desativar)
   */
  const alternarStatus = async (id: string): Promise<Usuario | null> => {
    try {
      console.log('🔄 Alternando status do usuário:', id)
      const response = await usersApi.toggleUserStatus(id)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const usuarioAtualizado = response.data
      setUsuarios(prev => prev.map(u => u.id === id ? usuarioAtualizado : u))
      
      return usuarioAtualizado
    } catch (err: any) {
      console.error("Erro ao alternar status do usuário:", err)
      setError(err)
      return null
    }
  }

  /**
   * Alterar senha do usuário
   */
  const alterarSenha = async (id: string, senhaAtual: string, novaSenha: string): Promise<boolean> => {
    try {
      console.log('🔑 Alterando senha do usuário:', id)
      const response = await usersApi.changePassword(id, senhaAtual, novaSenha)
      if (response.error) {
        throw new Error(response.error)
      }
      return true
    } catch (err: any) {
      console.error("Erro ao alterar senha:", err)
      setError(err)
      return false
    }
  }

  /**
   * Excluir usuário
   */
  const excluirUsuario = async (id: string): Promise<boolean> => {
    try {
      console.log('🗑️ Excluindo usuário:', id)
      const response = await usersApi.deleteUser(id)
      if (response.error) {
        throw new Error(response.error)
      }

      // Remover da lista local
      setUsuarios(prev => prev.filter(u => u.id !== id))
      
      return true
    } catch (err: any) {
      console.error("Erro ao excluir usuário:", err)
      setError(err)
      return false
    }
  }

  /**
   * Validar usuário (login interno)
   */
  const validarUsuario = async (email: string, senha: string): Promise<Usuario | null> => {
    try {
      console.log('🔐 Validando usuário:', email)
      // Note: usaremos um endpoint específico se existir, senão usaremos o login
      const response = await usersApi.validateUser ? usersApi.validateUser(email, senha) : null
      
      if (!response || response.error) {
        return null
      }

      return response.data
    } catch (err: any) {
      console.error("Erro ao validar usuário:", err)
      return null
    }
  }

  return {
    usuarios,
    isLoading,
    error,
    fetchUsuarios,
    fetchUsuarioById,
    criarUsuario,
    atualizarUsuario,
    alternarStatus,
    alterarSenha,
    excluirUsuario,
    validarUsuario,
    // Utilitários
    clearError: () => setError(null),
    refresh: () => fetchUsuarios()
  }
}