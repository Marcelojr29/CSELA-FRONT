import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientRootLayout from "./ClientRootLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CSELA - ONG de Distribuição de Água",
  description: "Levando água limpa e vida para comunidades necessitadas",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
