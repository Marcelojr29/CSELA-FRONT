"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { usePathname } from "next/navigation"
import { AuthProvider } from "@/components/auth/auth-context"

const inter = Inter({ subsets: ["latin"] })

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="flex min-h-screen flex-col">
          <ClientNavbar />
          <main className="flex-1">{children}</main>
          <ClientFooter />
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

// Cliente component para verificar o pathname
function ClientNavbar() {
  const pathname = usePathname()

  // Não renderiza o navbar nas páginas do dashboard
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return <Navbar />
}

// Cliente component para verificar o pathname
function ClientFooter() {
  const pathname = usePathname()

  // Não renderiza o footer nas páginas do dashboard ou login
  if (pathname?.startsWith("/dashboard") || pathname === "/login") {
    return null
  }

  return <Footer />
}
