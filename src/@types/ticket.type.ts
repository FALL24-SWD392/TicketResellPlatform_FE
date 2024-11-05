import { User, UserList } from './users.type'

export interface Ticket {
  id: string
  sellerId: Pick<UserList, 'sub' | 'email' | 'avatar' | 'rating'>
  title?: string
  expDate?: string
  type?: Pick<UserList, 'sub'>
  unit_price?: number
  quantity?: number
  description?: string
  image?: string
  status?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
}

export type TicketList = Pick<Ticket, "id" | "sellerId" | "title"|"expDate"|"type"|"description"|"createdAt" | "image" | "quantity" | "status" | "unit_price"> 
export type CreateTicket = Pick<Ticket, "sellerId" | "title" | "expDate" | "type" | "unit_price" | "quantity" | "description" | "image" >

export interface TicketListConfig {
  size?: number | string
  page?: number | string
  totalSize?: number | string
  totalPage?: number | string
}
