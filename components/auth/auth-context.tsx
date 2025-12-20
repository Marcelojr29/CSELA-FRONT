"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { UserRole } from "@/types/user"
import { useRouter, usePathname } from "next/navigation"
import { usePerfis } from "@/hooks/use-perfis"
import {  AuthContextType, User } from "@/interfaces/IAuthContext"
import { authApi } from "@/lib/api"
import { PermissionUtils } from "@/lib/permissions"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { perfis } = usePerfis()

  // Verificar se há um token válido ao carregar a página
  useEffect(() => {
    checkAuthToken()
  }, [])

  // Verificar permissões para a rota atual quando pathname muda
  useEffect(() => {
    if (pathname?.startsWith("/dashboard") && !pathname.includes("/login")) {
      checkRoutePermission(pathname)
    }
  }, [pathname, user])

  const checkAuthToken = async () => {
    try {
      const token = localStorage.getItem("access_token")
      const storedUser = localStorage.getItem("user")
      
      if (token && storedUser) {
        // Primeiro definir o usuário do localStorage
        setUser(JSON.parse(storedUser))
        
        // Depois verificar se o token ainda é válido (opcional)
        try {
          const response = await authApi.verifyToken()
          
          if (response.error) {
            console.warn('⚠️ Token inválido ou API indisponível, mantendo sessão local')
            // Não limpar dados se API estiver indisponível
            // Só limpar se for erro 401 (unauthorized)
            if (response.statusCode === 401) {
              localStorage.removeItem("access_token")
              localStorage.removeItem("user")
              setUser(null)
            }
          }
        } catch (verifyError) {
          console.warn('⚠️ Não foi possível verificar token, mantendo sessão local:', verifyError)
          // Manter sessão local se não conseguir verificar token
        }
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error)
      // Não limpar dados automaticamente
    } finally {
      setIsLoading(false)
    }
  }

  const checkRoutePermission = (path: string) => {
    // Não verificar permissões se ainda estiver carregando
    if (isLoading) {
      return
    }
    
    // Se não há usuário, redireciona para login
    if (!user) {
      router.push("/login")
      return
    }

    // Verifica permissões com base no perfil do usuário retornado da API
    if (!user.perfil || !user.perfil.permissoes) {
      console.error("Permissões do usuário não encontradas")
      router.push("/dashboard")
      return
    }

    // Verifica permissões com base no caminho usando a função hasPermission
    if (path.startsWith("/dashboard/admin")) {
      // Verificar se tem acesso ao gerenciamento de usuários ou perfis
      if (!hasPermission('cadastroUsuarios') && !hasPermission('gerenciarPerfis')) {
        router.push("/dashboard")
        return
      }
    }

    if (path.startsWith("/dashboard/moradores") && !hasPermission('cadastroMoradores')) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/pontos-distribuicao") && !hasPermission('gerenciarPontos')) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/dashboards") && !hasPermission('visualizarDashboards')) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/financas") && !hasPermission('acessoFinancas')) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/administracao") && !hasPermission('acessoAdministracao')) {
      router.push("/dashboard")
      return
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.login(email, password)

      if (response.error) {
        throw new Error(response.error)
      }

      const { access_token, user: userData } = response.data

      // Transformar dados da API para o formato esperado pelo frontend
      const loggedUser = {
        id: userData.id,
        name: userData.nome,
        email: userData.email,
        role: mapPerfilToRole(userData.perfil.nome),
        perfil: userData.perfil
      }

      setUser(loggedUser)
      localStorage.setItem("access_token", access_token)
      localStorage.setItem("user", JSON.stringify(loggedUser))

      // Atualizar último acesso
      if (userData.ultimoAcesso) {
        console.log('Último acesso:', new Date(userData.ultimoAcesso).toLocaleString())
      }

      // Redirecionar baseado nas permissões
      const isAdmin = PermissionUtils.isAdmin(userData.perfil.permissoes)
      const canOperate = PermissionUtils.canOperate(userData.perfil.permissoes)
      
      if (!isAdmin && canOperate) {
        router.push("/dashboard/moradores")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error // Re-throw para que o componente de login possa tratar
    } finally {
      setIsLoading(false)
    }
  }

  const mapPerfilToRole = (perfilNome: string): UserRole => {
    switch (perfilNome.toLowerCase()) {
      case 'administrador':
        return UserRole.ADMIN
      case 'contador':
        return UserRole.ACCOUNTANT
      case 'funcionário':
      case 'funcionario':
        return UserRole.EMPLOYEE
      case 'suporte':
        return UserRole.SUPPORT
      default:
        return UserRole.EMPLOYEE
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const hasPermission = (permission: string) => {
    if (!user?.perfil?.permissoes) return false
    return PermissionUtils.hasPermission(user.perfil.permissoes, permission)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
