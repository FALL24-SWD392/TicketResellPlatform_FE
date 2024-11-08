import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  id?: string
  sub?: string
  scope?: string
  email?: string
  avatar?: string
  rating?: number
  username?: string
  role?: string
  status: 'VERIFIED' | 'REMOVED' | 'UNVERIFIED'
}

export type UserList = Pick<User,'id'| 'sub' | 'email' | 'avatar' | 'rating' | 'username' | 'role' | 'status'>

export type ProfileUpdate = {
  user_name: string
  email: string
  phone_number: string
  date_of_birth: string
}

export type SubList = {
  id: String
  name: string
  saleLimit: String
  description: string
  pointRequired: String
  price: String
}
