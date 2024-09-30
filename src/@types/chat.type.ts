export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
}

export interface ChatBox {
  id: string;
  buyerId: string;
  sellerId: string;
  ticketId: string;
  messages: ChatMessage[];
  createdAt: Date;
}
