import type { ReactNode } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Removido o navbar e footer completamente do layout do dashboard
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="flex-1 p-6">{children}</main>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
