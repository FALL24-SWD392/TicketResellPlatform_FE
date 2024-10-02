import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  _id: string
  user_name: string
  email: string
  status: UserVerifyStatus
  avatar: string
  reputation: number
  rate: number
  typoRegister: string
  createdAt: string
  createBy: string
  updateBy: string
  updatedAt: string
  role: UserRole
}

export type UserList = Pick<
  User,
  '_id' | 'user_name' | 'email' | 'role' | 'status'
>

export type ProfileUpdate = {
  user_name: string
  email: string
  phone_number: string
  date_of_birth: string
}
