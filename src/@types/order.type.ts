export interface Order {
  id: string;
  chatBoxId: string;
  status: string;
  details: OrderDetail[];
}

export interface OrderDetail {
  id: string;
  orderId: string;
  code: string;
  ticketId: string;
  quantity: number;
}               

export enum OrderStatus{
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}