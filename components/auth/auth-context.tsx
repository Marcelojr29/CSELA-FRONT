"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { UserRole } from "@/types/user"
import { useRouter, usePathname } from "next/navigation"
import { usePerfis } from "@/hooks/use-perfis"
import {  AuthContextType, User } from "@/interfaces/IAuthContext"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { perfis } = usePerfis()

  // Simula a verificação de autenticação ao carregar a página
  useEffect(() => {
    // Verificar se há um usuário no localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)

    // Verificar permissões para a rota atual
    if (pathname?.startsWith("/dashboard") && !pathname.includes("/login")) {
      checkRoutePermission(pathname)
    }
  }, [pathname])

  const checkRoutePermission = (path: string) => {
    // Se não há usuário, redireciona para login
    if (!user) {
      router.push("/login")
      return
    }

    // Encontra o perfil do usuário
    const userPerfil = perfis.find((p) => p.role === user.role)
    if (!userPerfil) {
      console.error("Perfil do usuário não encontrado")
      router.push("/dashboard")
      return
    }

    // Verifica permissões com base no caminho
    if (
      path.startsWith("/dashboard/admin") &&
      !userPerfil.permissoes.cadastroUsuarios &&
      !userPerfil.permissoes.gerenciarPerfis
    ) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/moradores") && !userPerfil.permissoes.cadastroMoradores) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/pontos-distribuicao") && !userPerfil.permissoes.gerenciarPontos) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/dashboards") && !userPerfil.permissoes.visualizarDashboards) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/financas") && !userPerfil.permissoes.acessoFinancas) {
      router.push("/dashboard")
      return
    }

    if (path.startsWith("/dashboard/administracao") && !userPerfil.permissoes.acessoAdministracao) {
      router.push("/dashboard")
      return
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulação de login - em produção, isso seria uma chamada API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Determinar o perfil com base no email
      let role = UserRole.EMPLOYEE
      if (email === "admin@csela.org") {
        role = UserRole.ADMIN
      } else if (email === "contador@csela.org") {
        role = UserRole.ACCOUNTANT
      } else if (email === "suporte@csela.org") {
        role = UserRole.SUPPORT
      }

      const loggedUser = {
        id: "1",
        name: email.split("@")[0],
        email,
        role,
      }

      setUser(loggedUser)
      localStorage.setItem("user", JSON.stringify(loggedUser))

      // Redirecionar funcionário diretamente para moradores
      if (role === UserRole.EMPLOYEE) {
        router.push("/dashboard/moradores")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const hasPermission = (permission: string) => {
    if (!user) return false

    // Encontra o perfil do usuário
    const userPerfil = perfis.find((p) => p.role === user.role)
    if (!userPerfil) return false

    // Verifica se o usuário tem a permissão específica
    return userPerfil.permissoes[permission as keyof typeof userPerfil.permissoes] || false
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
