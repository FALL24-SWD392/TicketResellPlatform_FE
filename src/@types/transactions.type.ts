export interface Transaction {
  orderCode: string
  status: string
  createdAt: string
  updatedAt: string
  userName: string
  description: string
}

export type TransactionList = Pick<Transaction, "orderCode" | "status" | "createdAt" | "updatedAt" | "userName" | "description">

export interface TransactionListConfig {
  size?: number | string
  page?: number | string
  totalSize?: number | string
  totalPage?: number | string
  status?: string
  message?: string | null
}
