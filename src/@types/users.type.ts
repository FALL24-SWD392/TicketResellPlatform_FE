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
export type UserProfile = Pick<User, 'email' | 'username' | 'avatar' | 'status' | 'role' | 'rating' | 'reputation'>

export type ProfileUpdate = {
  username: string
  avatar: string
}

export type SubList = {
  id: String
  name: string
  saleLimit: String
  description: string
  pointRequired: String
  price: String
}
