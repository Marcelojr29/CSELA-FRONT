"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Building2,
  ChevronDown,
  Droplet,
  Home,
  LogOut,
  MapPin,
  Settings,
  Users,
  Wallet,
  ImageIcon,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-context"
import { cn } from "@/lib/utils"
import { UserRole } from "@/types/user"
import { SidebarItem } from "@/interfaces/ISidebarItem"

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
    hideForEmployee: true, // Ocultar para funcionários
  },
  {
    title: "Admin",
    icon: Settings,
    permission: "cadastroUsuarios",
    submenu: [
      { title: "Usuários", href: "/dashboard/admin/usuarios", permission: "cadastroUsuarios" },
      { title: "Perfis", href: "/dashboard/admin/perfis", permission: "gerenciarPerfis" },
    ],
  },
  {
    title: "Moradores",
    href: "/dashboard/moradores",
    icon: Users,
    permission: "cadastroMoradores",
  },
  {
    title: "Pontos de Distribuição",
    href: "/dashboard/pontos-distribuicao",
    icon: MapPin,
    permission: "gerenciarPontos",
  },
  {
    title: "Galeria",
    href: "/dashboard/galeria",
    icon: ImageIcon,
    permission: "cadastroMoradores", // Usando a mesma permissão de moradores para admin e funcionário
  },
  {
    title: "Dashboards",
    icon: BarChart3,
    permission: "visualizarDashboards",
    submenu: [
      { title: "Anual", href: "/dashboard/dashboards/anual", permission: "visualizarDashboards" },
      { title: "Mensal", href: "/dashboard/dashboards/mensal", permission: "visualizarDashboards" },
    ],
  },
  {
    title: "Finanças",
    href: "/dashboard/financas",
    icon: Wallet,
    permission: "acessoFinancas",
  },
  {
    title: "Administração",
    href: "/dashboard/administracao",
    icon: Building2,
    permission: "acessoAdministracao",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()
  const { user, logout, hasPermission } = useAuth()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // Verificar se estamos em uma subpágina e abrir o menu correspondente automaticamente
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}

    if (pathname?.startsWith("/dashboard/admin")) {
      newOpenMenus.Admin = true
    }

    if (pathname?.startsWith("/dashboard/dashboards")) {
      newOpenMenus.Dashboards = true
    }

    setOpenMenus(newOpenMenus)
  }, [pathname])

  // Filtra os itens do sidebar com base nas permissões do usuário
  const filteredSidebarItems = sidebarItems.filter((item) => {
    // Ocultar Home para funcionários
    if (item.hideForEmployee && user?.role === UserRole.EMPLOYEE) {
      return false
    }

    // Se não tem permissão específica, sempre mostra
    if (!item.permission) return true

    // Verifica se o usuário tem permissão para ver este item
    return hasPermission(item.permission)
  })

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Droplet className="h-6 w-6 text-primary" />
          <span className="font-bold">CSELA Admin</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {filteredSidebarItems.map((item) => {
            if (item.submenu) {
              // Filtra os subitens com base nas permissões
              const filteredSubmenu = item.submenu.filter(
                (subitem) => !subitem.permission || hasPermission(subitem.permission),
              )

              // Se não há subitens após a filtragem, não mostra o menu
              if (filteredSubmenu.length === 0) return null

              const isOpen = openMenus[item.title] || false

              return (
                <div key={item.title} className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-normal hover:bg-muted"
                    onClick={() => toggleMenu(item.title)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </div>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}
                    />
                  </Button>

                  <div
                    className={cn(
                      "ml-4 space-y-1 overflow-hidden transition-all duration-200 ease-in-out",
                      isOpen ? "max-h-96 pt-1" : "max-h-0",
                    )}
                  >
                    {filteredSubmenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                          isActive(subitem.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.title}
                href={item.href || "#"}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 transition-colors",
                  isActive(item.href || "") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name || "Usuário"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "usuario@csela.org"}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
