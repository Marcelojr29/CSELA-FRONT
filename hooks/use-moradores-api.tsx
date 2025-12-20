"use client"

import { useState, useCallback } from "react"
import { moradoresApi } from "@/lib/api"

export interface Morador {
  id: string
  nome: string
  descricao?: string
  rg: string
  cpf: string
  dataDeNascimento: string
  rua: string
  numeroResidencia: string
  bairro: string
  cep: string
  telefone: string
  tipoResidencia: "Casa" | "Apartamento" | "Kitnet" | "Sobrado" | "Comercial" | "Outro"
  quantidadePessoas: number
  tempoResidencia: number
  status: "Adimplente" | "Inadimplente"
  dataUltimoPagamento?: string | null
  criadoEm: string
  atualizadoEm: string
}

export interface MoradorInput {
  nome: string
  descricao?: string
  rg: string
  cpf: string
  dataDeNascimento: string
  rua: string
  numeroResidencia: string
  bairro: string
  cep: string
  telefone: string
  tipoResidencia: "Casa" | "Apartamento" | "Kitnet" | "Sobrado" | "Comercial" | "Outro"
  quantidadePessoas: number
  status?: "Adimplente" | "Inadimplente"
  dataUltimoPagamento?: string
}

export interface MoradoresListResponse {
  data: Morador[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface MoradoresFilters {
  page?: number
  limit?: number
  search?: string
  status?: "Adimplente" | "Inadimplente"
  tipoResidencia?: string
  bairro?: string
}

/**
 * Hook para gerenciar moradores do sistema
 */
export function useMoradoresAPI() {
  const [moradores, setMoradores] = useState<Morador[]>([])
  const [moradoresResponse, setMoradoresResponse] = useState<MoradoresListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Criar novo morador
   */
  const criarMorador = useCallback(async (moradorData: MoradorInput): Promise<Morador | null> => {
    try {
      console.log('➕ Criando morador:', moradorData)
      setIsLoading(true)
      setError(null)
      
      const response = await moradoresApi.createMorador(moradorData)
      if (response.error) {
        throw new Error(response.error)
      }

      const novoMorador = response.data
      setMoradores(prev => [...prev, novoMorador])
      
      return novoMorador
    } catch (err: any) {
      console.error("Erro ao criar morador:", err)
      setError(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Buscar lista de moradores com filtros
   */
  const buscarMoradores = useCallback(async (filtros: MoradoresFilters = {}): Promise<MoradoresListResponse | null> => {
    try {
      console.log('📋 Buscando moradores com filtros:', filtros)
      setIsLoading(true)
      setError(null)
      
      // Construir query string
      const queryParams = new URLSearchParams()
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString())
        }
      })
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ''
      const response = await moradoresApi.getMoradores(queryString)
      
      if (response.error) {
        throw new Error(response.error)
      }
      
      const moradoresData = response.data
      setMoradoresResponse(moradoresData)
      setMoradores(moradoresData.data || [])
      
      return moradoresData
    } catch (err: any) {
      console.error("Erro ao buscar moradores:", err)
      setError(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Buscar morador por CPF
   */
  const buscarPorCpf = useCallback(async (cpf: string): Promise<Morador | null> => {
    try {
      console.log('🔍 Buscando morador por CPF:', cpf)
      const response = await moradoresApi.getMoradorByCpf(cpf)
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    } catch (err: any) {
      console.error("Erro ao buscar morador por CPF:", err)
      return null
    }
  }, [])

  /**
   * Buscar morador por ID
   */
  const buscarMoradorPorId = useCallback(async (id: string): Promise<Morador | null> => {
    try {
      console.log('🔍 Buscando morador por ID:', id)
      setIsLoading(true)
      setError(null)
      
      const response = await moradoresApi.getMoradorById(id)
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    } catch (err: any) {
      console.error("Erro ao buscar morador por ID:", err)
      setError(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Editar morador
   */
  const editarMorador = useCallback(async (id: string, moradorData: Partial<MoradorInput>): Promise<Morador | null> => {
    try {
      console.log('✏️ Editando morador:', id, moradorData)
      setIsLoading(true)
      setError(null)
      
      const response = await moradoresApi.updateMorador(id, moradorData)
      if (response.error) {
        throw new Error(response.error)
      }
      
      const moradorEditado = response.data
      // Atualizar a lista local de moradores
      setMoradores(prev => prev.map(m => m.id === id ? moradorEditado : m))
      
      return moradorEditado
    } catch (err: any) {
      console.error("Erro ao editar morador:", err)
      setError(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Excluir morador
   */
  const excluirMorador = useCallback(async (id: string): Promise<boolean> => {
    try {
      console.log('🗑️ Excluindo morador:', id)
      setIsLoading(true)
      setError(null)
      
      const response = await moradoresApi.deleteMorador(id)
      if (response.error) {
        throw new Error(response.error)
      }
      
      // Remover da lista local de moradores
      setMoradores(prev => prev.filter(m => m.id !== id))
      
      return true
    } catch (err: any) {
      console.error("Erro ao excluir morador:", err)
      setError(err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    moradores,
    moradoresResponse,
    isLoading,
    error,
    criarMorador,
    buscarMoradores,
    buscarPorCpf,
    buscarMoradorPorId,
    editarMorador,
    excluirMorador,
    clearError: () => setError(null)
  }
}