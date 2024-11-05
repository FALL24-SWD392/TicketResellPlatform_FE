import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  sub?: string,
  scope?: string,
  email?: string,
  avatar?: string,
  rating?: number,
  username?: string,
  role?: string,
  status: "VERIFIED" | "REMOVED";
}

export type UserList = Pick<
  User,
  'sub' | 'email' | 'avatar' | 'rating' |'username' | "role" | "rating" | "status"
>


export type ProfileUpdate = {
  user_name: string
  email: string
  phone_number: string
  date_of_birth: string
}
