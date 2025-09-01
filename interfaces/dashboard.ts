import type { Payment } from "@/types/payment"
import type { User } from "@/types/user"

export interface DashboardStats {
  totalUsers: number
  newUsers: number
  totalPayments: number
  pendingPayments: number
  overduePayments: number
  paymentRate: number
}

export interface DashboardData {
  stats: DashboardStats
  recentUsers: User[]
  recentPayments: Payment[]
  monthlyPayments: {
    month: string
    total: number
  }[]
}
