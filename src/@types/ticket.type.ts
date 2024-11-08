import { User, UserList } from './users.type'

export interface Ticket {
  id: string
  sellerId: string
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

export type TicketList = Pick<Ticket, "id" | "sellerId" | "title"|"expDate"|"type"|"description"|"createdAt" | "image" | "quantity" | "status" | "unitPrice"> 
export type CreateTicket = Pick<Ticket, "sellerId" | "title" | "expDate" | "type" | "unitPrice" | "quantity" | "description" | "image" >

export interface TicketListConfig {
  size?: number | string
  page?: number | string
  totalSize?: number | string
  totalPage?: number | string
}
