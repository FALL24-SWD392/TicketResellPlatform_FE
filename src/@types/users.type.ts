import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  id?: string
  sub?: string
  scope?: string
  email?: string
  avatar?: string
  rating?: number
  username?: string
  reputation?: number
  role?: string
  status: 'VERIFIED' | 'REMOVED' | 'UNVERIFIED'
}

export type UserList = Pick<User, 'id' | 'sub' | 'email' | 'avatar' | 'rating' | 'username' | 'role' | 'rating' | 'status'>
export type UserProfile = Pick<User, 'id' | 'email' | 'username' | 'avatar' | 'status' | 'role' | 'rating' | 'reputation'>

export type ProfileUpdate = {
  username: string
  avatar: string
}

export type MyMembership = {
  id?: string
  subscriptionName: string
  saleRemain: number
  startDate: Date
  endDate: Date
}
export type SubList = {
  id: string // Unique identifier
  name: string // Name of the subscription
  saleLimit: number // Limit of sales for the subscription
  description: string // Description of the subscription
  pointRequired: number
  price: number
  canPurchase: boolean
}

export type MyTransactions = {
  orderCode: string
  status: string
  createdAt: string
  updatedAt: string
  userName: string
  description: string
}
