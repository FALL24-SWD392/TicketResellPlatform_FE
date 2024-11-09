import useFirestore from 'src/hooks/useFirestore'
import { MessageBox } from '.'
import { ChatBoxStatus, Message } from 'src/@types/chat.type'
import { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/@types/users.type'
import { addDocument, updateDocument } from 'src/utils/chatapp.service'
import { Timestamp, WhereFilterOp } from '@firebase/firestore'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { input } from '@nextui-org/theme'
import { useMutation } from '@tanstack/react-query'
import OrderAPI from 'src/apis/order.api'
interface ChatWindowProps {
  chatId?: string
  user: User
}

export interface CreateOrderBody {
  chatBoxId: string
  senderId: string
  recipientId: string
  ticketId: string
  quantity: number
}

export default ({ chatId, user }: ChatWindowProps) => {
  const messageCondition = useMemo(() => {
    return {
      field: 'chatroomId',
      operator: '==' as '==',
      value: chatId || ''
    }
  }, [user, chatId])
  const messages = useFirestore('messages', messageCondition)
  const chatroomCondition = useMemo(() => {
    return { field: 'id', operator: '==' as WhereFilterOp, value: chatId || '' }
  }, [user])
  const chatrooms = useFirestore('chatrooms', chatroomCondition)
  const chatroom = chatrooms[0]
  const [message, setMessage] = useState<string>('')

  const scrollToBottom = () => {
    const messagesElement = document.getElementById('messages')
    if (messagesElement) {
      messagesElement.scrollTop = messagesElement.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatroom.status == 'PENDING') {
      toast.error('You have to wait for seller to accept chat')
      return
    }
    if (chatroom.status == 'SUCCESS') {
      toast.error('This chat has been closed')
      return
    }
    if (chatroom.status == 'CANCELLED') {
      toast.error('This chat has been cancelled')
      return
    }
    if (!message) {
      toast.error('Message cannot be empty')
      return
    }
    const newMessage: Message = {
      id: uuidv4(),
      chatroomId: chatId || '',
      senderId: user.id || '',
      senderName: user.sub || '',
      senderAvatar: user.avatar || '',
      text: message,
      createAt: new Timestamp(new Date().getTime() / 1000, 0)
    }
    addDocument('messages', newMessage)
    chatroom.messages = [...chatroom.messages, newMessage]
    updateDocument('chatrooms', chatroom.docId, chatroom)
    setMessage('')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  const time = chatroom?.createAt.seconds as number
  const createdAt = time && format(new Date(time * 1000), 'dd/MM/yyyy HH:mm')

  const handleAcceptChat = () => {
    if (chatroom) {
      chatroom.status = ChatBoxStatus.PROCESSING
      updateDocument('chatrooms', chatroom.docId, chatroom)
    }
  }
  const handleCompleteChat = () => {
    if (chatroom) {
      chatroom.status = ChatBoxStatus.SUCCESS
      updateDocument('chatrooms', chatroom.docId, chatroom)
    }
  }
  const handleCancelChat = () => {
    if (chatroom) {
      chatroom.status = ChatBoxStatus.CANCELLED
      updateDocument('chatrooms', chatroom.docId, chatroom)
    }
  }
  const addOrderMutation = useMutation({
    mutationFn: async (body: CreateOrderBody) => {
      return await OrderAPI.createOrder(body)
    }
  })
  const [quantity, setQuantity] = useState<number>(0)
  const handleSold = () => {
    if (!chatroom && !quantity) {
      toast.error('Invalid input')
      return
    }

    const body: CreateOrderBody = {
      chatBoxId: chatId || '',
      senderId: chatroom.buyerId,
      recipientId: chatroom.sellerId,
      ticketId: chatroom.ticketId,
      quantity: quantity
    }
    addOrderMutation.mutate(body, {
      onSuccess: async (data) => {
        const res = data.data
        if (res.data.status == 'COMPLETED') {
          toast.success('Order successfully creted')
          chatroom.status = ChatBoxStatus.DELIVERING
          await updateDocument('chatrooms', chatroom.docId, chatroom)
        }
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (quantity < 0) {
      toast.error('Quantity must be valid positive number')
      setQuantity(0)
      return
    }
    setQuantity(value)
  }

  return (
    <div className='w-2/3 bg-white-light h-[48rem] p-3'>
      {chatId ? (
        <div className='border-b-1 border-white-dark flex  flex-row justify-between items-centerp pb-3'>
          <div className='flex flex-row justify-center items-center'>
            <img src='https://placehold.co/400' alt='' className='w-10 h-10 rounded-full' />
            <div className='flex flex-col ml-2'>
              <h1 className='text-lg'>{chatroom?.displayName}</h1>
              <p className='text-sm text-black-lightActive'>{createdAt}</p>
            </div>
          </div>
          {chatroom && chatroom.sellerId === user.id && (
            <div className='flex flex-row justify-center items-center'>
              {chatroom.status != 'DELIVERING' && chatroom.status != 'SUCCESS' &&(<button
                  className='bg-gradient_header text-white rounded-[2rem] border-1 p-2 px-8 border-white-normalActive hover:bg-graident_header_hover'
                  onClick={handleCancelChat}
                >
                  Cancel
                </button>)}
              {chatroom.status == 'PENDING' && (
                <button
                  className='bg-gradient_header text-white rounded-[2rem] border-1 p-2 px-8 border-white-normalActive hover:bg-graident_header_hover'
                  onClick={handleAcceptChat}
                >
                  Accept chat
                </button>
              )}
              {chatroom.status == 'PROCESSING' && (
                <div>
                  <input
                    type='number'
                    className='border-1 w-28 rounded-l-lg border-white-normalActive border-r-0 focus:outline-none p-2'
                    onChange={handleQuantityChange}
                    value={quantity}
                  />
                  <button
                    className='bg-gradient_header text-white rounded-r-lg border-1 p-2 px-8 border-white-normalActive hover:bg-graident_header_hover'
                    onClick={handleSold}
                  >
                    Sold
                  </button>
                </div>
              )}
              {chatroom.status == 'DELIVERING' && (
                <button
                  className='bg-gradient_header text-white rounded-[2rem] border-1 p-2 px-8 border-white-normalActive hover:bg-graident_header_hover'
                  onClick={handleCompleteChat}
                >
                  Complete Order
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='border-b-1 border-white-dark flex  flex-row justify-between items-center'>
          <p className='text-center w-full text-xl'>Select a chat to start messaging</p>
        </div>
      )}

      <div className='flex flex-col chat-content justify-end'>
        <div id='messages' className='chat-message overflow-y-scroll scrollbar-hide'>
          {chatId ? (
            messages.map((message: Message) => {
              return <MessageBox key={message.id} message={message} user={user} />
            })
          ) : (
            <p className='text-center'>Select a chat to start messaging</p>
          )}
        </div>
        {chatId && (
          <form onSubmit={formSubmit} className='mt-5'>
            <div className='flex'>
              <input
                className='w-3/4 mt-3 border-1 p-1 rounded-l-lg border-white-normalActive border-r-0 focus:outline-none'
                placeholder='Chat with opponent...'
                onChange={handleChange}
                value={message}
              />
              <button className='w-1/4 mt-3 bg-gradient_header text-white rounded-r-lg border-1 border-white-normalActive hover:bg-graident_header_hover'>
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
