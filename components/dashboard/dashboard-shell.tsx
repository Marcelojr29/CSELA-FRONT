import type React from "react"
import { DashboardShellProps } from "../../interfaces/IDashboardShellProps"

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="container grid items-start gap-8 pb-8 pt-6 md:py-8">
      <div className="flex flex-col space-y-6">{children}</div>
    </div>
  )
}
