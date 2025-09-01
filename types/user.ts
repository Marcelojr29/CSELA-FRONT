export enum UserRole {
  ADMIN = "admin",
  ACCOUNTANT = "accountant",
  EMPLOYEE = "employee",
  SUPPORT = "support",
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  address?: string
  phone?: string
  status: "active" | "inactive" | "pending"
  createdAt: Date
  lastLogin?: Date
}
