export interface Message {
    id: string
    senderId: string
    text: string
    createdAt: Date
}

export interface ChatRoom {
    id: string
    buyerId: string
    sellerId: string;
    ticketId: string
    messages: Message[]
    createAt: Date
    updateAt: Date
    status: ChatBoxStatus
}

export enum ChatBoxStatus{
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    CANCELLED = 'CANCELLED'
}