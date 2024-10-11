import { User, UserList } from './users.type'

export interface Ticket {
  id: string
  sellerId: Pick<UserList, 'sub' | 'email' | 'avatar' | 'rating'>
  title?: string
  expDate?: string
  type?: Pick<UserList, 'sub'>
  unitPrice?: number
  quantity?: number
  description?: string
  image?: string
  status?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
}

export type TicketList = Pick<Ticket, "id" | "sellerId" | "title"|"expDate"|"type"|"description"|"createdAt" | "image" | "quantity" | "status" | "unitPrice"> 

export interface TicketListConfig {
  size?: number | string
  page?: number | string
  totalSize?: number | string
  totalPage?: number | string
}
