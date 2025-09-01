"use client"

import { useState, useEffect, useCallback } from "react"
import { UserRole } from "@/types/user"

// Dados estáticos dos perfis
const perfisData = [
  {
    id: "1",
    role: UserRole.ADMIN,
    nome: "Administrador",
    status: "Ativo",
    descricao: "Acesso total à aplicação",
    permissoes: {
      cadastroUsuarios: true,
      gerenciarPerfis: true,
      cadastroMoradores: true,
      registrarPagamentos: true,
      gerenciarPontos: true,
      visualizarDashboards: true,
      exportarRelatorios: true,
      acessoFinancas: true,
      acessoAdministracao: true,
    },
  },
  {
    id: "2",
    role: UserRole.ACCOUNTANT,
    nome: "Contador",
    status: "Ativo",
    descricao:
      "Acesso limitado somente à finanças como modo de visualização, podendo somente fazer download dos relatórios e dos dashboards",
    permissoes: {
      cadastroUsuarios: false,
      gerenciarPerfis: false,
      cadastroMoradores: false,
      registrarPagamentos: false,
      gerenciarPontos: false,
      visualizarDashboards: true,
      exportarRelatorios: true,
      acessoFinancas: true,
      acessoAdministracao: false,
    },
  },
  {
    id: "3",
    role: UserRole.EMPLOYEE,
    nome: "Funcionário",
    status: "Ativo",
    descricao:
      "Acesso limitado somente à cadastro de novos moradores, baixa nos pagamentos dos moradores no módulo de finanças",
    permissoes: {
      cadastroUsuarios: false,
      gerenciarPerfis: false,
      cadastroMoradores: true,
      registrarPagamentos: true,
      gerenciarPontos: false,
      visualizarDashboards: false,
      exportarRelatorios: false,
      acessoFinancas: true,
      acessoAdministracao: false,
    },
  },
  {
    id: "4",
    role: UserRole.SUPPORT,
    nome: "Suporte",
    status: "Ativo",
    descricao: "Acesso total à aplicação",
    permissoes: {
      cadastroUsuarios: true,
      gerenciarPerfis: true,
      cadastroMoradores: true,
      registrarPagamentos: true,
      gerenciarPontos: true,
      visualizarDashboards: true,
      exportarRelatorios: true,
      acessoFinancas: true,
      acessoAdministracao: true,
    },
  },
]

export function usePerfis() {
  const [perfis, setPerfis] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Função para buscar os perfis
  const fetchPerfis = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simula um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPerfis(perfisData)
    } catch (err: any) {
      setError(err)
      console.error("Erro ao buscar perfis:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Função para criar um novo perfil
  const createPerfil = useCallback(
    async (perfilData: any) => {
      try {
        // Gera um ID único
        const newId = String(Date.now())
        const newPerfil = {
          id: newId,
          ...perfilData,
        }

        // Atualiza o estado local
        setPerfis((prev) => [...prev, newPerfil])
        return newPerfil
      } catch (err: any) {
        console.error("Erro ao criar perfil:", err)
        throw err
      }
    },
    [setPerfis],
  )

  // Função para atualizar um perfil
  const updatePerfil = useCallback(
    async (id: string, perfilData: any) => {
      try {
        const updatedPerfil = {
          ...perfilData,
          id,
        }

        // Atualiza o estado local
        setPerfis((prev) => prev.map((p) => (p.id === id ? { ...p, ...perfilData } : p)))
        return updatedPerfil
      } catch (err: any) {
        console.error("Erro ao atualizar perfil:", err)
        throw err
      }
    },
    [setPerfis],
  )

  // Função para excluir um perfil
  const deletePerfil = useCallback(
    async (id: string) => {
      try {
        // Atualiza o estado local
        setPerfis((prev) => prev.filter((p) => p.id !== id))
      } catch (err: any) {
        console.error("Erro ao excluir perfil:", err)
        throw err
      }
    },
    [setPerfis],
  )

  // Carrega os perfis ao montar o componente
  useEffect(() => {
    fetchPerfis()
  }, [fetchPerfis])

  return {
    perfis,
    isLoading,
    error,
    refetch: fetchPerfis,
    createPerfil,
    updatePerfil,
    deletePerfil,
  }
}
