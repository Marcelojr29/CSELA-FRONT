export interface Payment {
  id: string
  userId: string
  amount: number
  date: Date
  status: "paid" | "pending" | "overdue" | "cancelled"
  method: "credit_card" | "bank_transfer" | "pix" | "cash"
  description?: string
  createdAt: Date
  updatedAt: Date
}
