import { User, UserList,UserProfile } from './users.type'

export interface Ticket {
  id: string
  sellerId: string
  username?: string
  rating?: string
  avatar?: string
  title?: string
  expDate: string
  type: string
  unitPrice: number
  quantity: number
  description?: string
  image?: string
  status: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
}
export interface Create {
  sellerId: string
  title: string
  expDate: string
  type: string
  unitPrice: number
  quantity: number
  description: string
  image: string
}
export type TicketList = Pick<
  Ticket,
  'id' | 'sellerId' | 'title' | 'expDate' | 'type' | 'description' | 'createdAt' | 'image' | 'quantity' | 'status' | 'unitPrice'
>
export type CreateTicket = Pick<Create, 'sellerId' | 'description' | 'expDate' | 'image' | 'quantity' | 'title' | 'type' | 'unitPrice'>
export interface TicketListConfig {
  size?: number | string
  page?: number | string
  totalSize?: number | string
  totalPage?: number | string
}
