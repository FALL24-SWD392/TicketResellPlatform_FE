import { Timestamp } from "firebase/firestore"

export interface Message {
  docId?: string
  id: string
  chatroomId: string
  senderId: string
  senderName: string
  senderAvatar: string
  text: string
  createAt: Timestamp
}

export type ChatRoom = {
  docId?: string
  id: string
  buyerId: string
  sellerId: string
  ticketId: string
  messages: Message[]
  createAt: Timestamp
  updateAt: Date
  status: ChatBoxStatus
  members: string[]
  displayName: string
}

export enum ChatBoxStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DELIVERING = 'DELIVERING',
  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED'
}
