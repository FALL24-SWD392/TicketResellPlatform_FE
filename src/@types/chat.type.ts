import { Timestamp } from "firebase/firestore"

export interface Message {
  id: string
  chatroomId: string
  senderId: string
  senderName: string
  senderAvatar: string
  text: string
  createAt: Timestamp
}

export type ChatRoom = {
  id: string
  buyerId: string
  sellerId: string
  ticketId: string
  messages: Message[]
  createAt: Date
  updateAt: Date
  status: ChatBoxStatus
  members: string[]
  displayName: string
}

export enum ChatBoxStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED'
}
