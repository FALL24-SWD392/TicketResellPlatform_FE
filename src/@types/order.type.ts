import { Ticket, Tickets } from './ticket.type'

export interface Order {
  id: string
  chatBoxId: string
  status: string
  ticket: Pick<Tickets, 'id' | 'image' | 'title' | 'unitPrice' | 'description' | 'quantity'>
}

export interface OrderDetail {
  id: string
  orderId: string
  ticketId: string
  quantity: number
}

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
