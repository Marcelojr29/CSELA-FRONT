"use client"

import { useState } from "react"
import { profilesApi } from "@/lib/api"
import { Permissoes, Perfil } from "@/interfaces/IAuthContext"
import { PermissionUtils } from "@/lib/permissions"

// Dados mock para fallback quando a API não estiver disponível
const mockPerfis: Perfil[] = [
  {
    id: "1",
    nome: "Administrador",
    status: true,
    permissoes: PermissionUtils.createAdminPermissions(),
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "2", 
    nome: "Operador",
    status: true,
    permissoes: {
      user_management: { name: "user_management", permissions: [] },
      operation: { name: "operation", permissions: ["cadastro_moradores", "registrar_pagamentos"] },
      reports_analytics: { name: "reports_analytics", permissions: ["visualizar_dashboards"] },
      advanced: { name: "advanced", permissions: [] }
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
]

/**
 * Hook para gerenciar perfis de usuário
 */
export function usePerfisAPI() {
  const [perfis, setPerfis] = useState<Perfil[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Buscar todos os perfis
   */
  const fetchPerfis = async (filters?: {
    page?: number
    limit?: number
    nome?: string
    status?: boolean
    sort?: string
    order?: 'ASC' | 'DESC'
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('🔍 Buscando perfis...', filters)
      
      const queryParams = new URLSearchParams()
      
      if (filters?.page) queryParams.append('page', filters.page.toString())
      if (filters?.limit) queryParams.append('limit', filters.limit.toString())
      if (filters?.nome) queryParams.append('nome', filters.nome)
      if (filters?.status !== undefined) queryParams.append('status', filters.status.toString())
      if (filters?.sort) queryParams.append('sort', filters.sort)
      if (filters?.order) queryParams.append('order', filters.order)

      const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : ''
      console.log('📡 Chamando endpoint:', endpoint)
      
      const response = await profilesApi.getProfiles(endpoint)
      console.log('📥 Resposta da API:', response)

      if (response.error) {
        throw new Error(response.error)
      }

      // A API pode retornar diferentes formatos
      let perfisData = []
      if (response.data?.data) {
        // Formato com paginação: { data: [...], total, page, limit, totalPages }
        perfisData = response.data.data
      } else if (Array.isArray(response.data)) {
        // Formato direto: [...]
        perfisData = response.data
      } else {
        console.warn('⚠️ Formato de resposta inesperado:', response.data)
        perfisData = []
      }

      console.log('✅ Perfis carregados:', perfisData)
      setPerfis(perfisData)
      return response.data
    } catch (err: any) {
      console.error('❌ Erro ao buscar perfis:', err)
      
      // Verificar se é erro de conexão (API não disponível)
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError') || err.message?.includes('Erro de conexão')) {
        console.warn('🔄 API não disponível, usando dados mock')
        setPerfis(mockPerfis)
        setError(null) // Não mostrar erro se conseguiu carregar dados mock
        return { data: mockPerfis, total: mockPerfis.length, page: 1, limit: 10, totalPages: 1 }
      }
      
      setError(err)
      setPerfis([]) // Limpar lista em caso de erro
      return null
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Buscar perfil por ID
   */
  const fetchPerfilById = async (id: string): Promise<Perfil | null> => {
    try {
      const response = await profilesApi.getProfileById(id)
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    } catch (err: any) {
      console.error("Erro ao buscar perfil:", err)
      setError(err)
      return null
    }
  }

  /**
   * Criar novo perfil
   */
  const criarPerfil = async (perfilData: {
    nome: string
    status?: boolean
    permissoes?: Permissoes
  }): Promise<Perfil | null> => {
    try {
      const novoPerfilData = {
        nome: perfilData.nome,
        status: perfilData.status ?? true,
        permissoes: perfilData.permissoes || PermissionUtils.createEmptyPermissions()
      }

      const response = await profilesApi.createProfile(novoPerfilData)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const novoPerfil = response.data
      setPerfis(prev => [...prev, novoPerfil])
      
      return novoPerfil
    } catch (err: any) {
      console.error("Erro ao criar perfil:", err)
      setError(err)
      return null
    }
  }

  /**
   * Atualizar perfil
   */
  const atualizarPerfil = async (id: string, perfilData: Partial<{
    nome: string
    status: boolean
    permissoes: Permissoes
  }>): Promise<Perfil | null> => {
    try {
      const response = await profilesApi.updateProfile(id, perfilData)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const perfilAtualizado = response.data
      setPerfis(prev => prev.map(p => p.id === id ? perfilAtualizado : p))
      
      return perfilAtualizado
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err)
      setError(err)
      return null
    }
  }

  /**
   * Atualizar apenas as permissões de um perfil
   */
  const atualizarPermissoes = async (id: string, permissoes: Permissoes): Promise<Perfil | null> => {
    try {
      const response = await profilesApi.updatePermissions(id, permissoes)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const perfilAtualizado = response.data
      setPerfis(prev => prev.map(p => p.id === id ? perfilAtualizado : p))
      
      return perfilAtualizado
    } catch (err: any) {
      console.error("Erro ao atualizar permissões:", err)
      setError(err)
      return null
    }
  }

  /**
   * Alternar status do perfil (ativar/desativar)
   */
  const alternarStatus = async (id: string): Promise<Perfil | null> => {
    try {
      const response = await profilesApi.toggleProfileStatus(id)
      if (response.error) {
        throw new Error(response.error)
      }

      // Atualizar lista local
      const perfilAtualizado = response.data
      setPerfis(prev => prev.map(p => p.id === id ? perfilAtualizado : p))
      
      return perfilAtualizado
    } catch (err: any) {
      console.error("Erro ao alternar status do perfil:", err)
      setError(err)
      return null
    }
  }

  /**
   * Excluir perfil
   */
  const excluirPerfil = async (id: string): Promise<boolean> => {
    try {
      const response = await profilesApi.deleteProfile(id)
      if (response.error) {
        throw new Error(response.error)
      }

      // Remover da lista local
      setPerfis(prev => prev.filter(p => p.id !== id))
      
      return true
    } catch (err: any) {
      console.error("Erro ao excluir perfil:", err)
      setError(err)
      return false
    }
  }

  /**
   * Buscar permissões disponíveis
   */
  const fetchPermissoesDisponiveis = async () => {
    try {
      const response = await profilesApi.getPermissions()
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    } catch (err: any) {
      console.error("Erro ao buscar permissões:", err)
      setError(err)
      return null
    }
  }

  return {
    perfis,
    isLoading,
    error,
    fetchPerfis,
    fetchPerfilById,
    criarPerfil,
    atualizarPerfil,
    atualizarPermissoes,
    alternarStatus,
    excluirPerfil,
    fetchPermissoesDisponiveis,
    // Utilitários
    clearError: () => setError(null),
    refresh: () => fetchPerfis()
  }
}