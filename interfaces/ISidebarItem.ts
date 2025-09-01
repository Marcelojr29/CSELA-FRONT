export interface SidebarItem {
  title: string
  href?: string
  icon: React.ElementType
  permission?: string
  hideForEmployee?: boolean
  submenu?: {
    title: string
    href: string
    permission?: string
  }[]
}