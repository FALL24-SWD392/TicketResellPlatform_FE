import useFirestore from 'src/hooks/useFirestore'
import { MessageBox } from '.'
import { Message } from 'src/@types/chat.type'
import { useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/@types/users.type'
import { addDocument } from 'src/utils/chatapp.service'
import { Timestamp, WhereFilterOp } from '@firebase/firestore'
interface ChatWindowProps {
  chatId?: string
  user: User
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
    const messagesElement = document.getElementById('messages');
    if (messagesElement) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMessage: Message = {
      id: uuidv4(),
      chatroomId: chatId || '',
      senderId: user.id || '',
      senderName: user.sub || '',
      senderAvatar: user.avatar || '',
      text: message,
      createAt: new Timestamp(new Date().getTime() / 1000, 0)
    }
    console.log(newMessage)
    addDocument('messages', newMessage)
    setMessage('')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  return (
    <div className='w-2/3 bg-white-light h-screen p-2'>
      {chatId ? (
        <div className='border-b-1 border-white-dark flex  flex-row justify-between items-center'>
          <div className='flex flex-row justify-center items-center'>
            <img src='https://placehold.co/400' alt='' className='w-10 h-10 rounded-full' />
            <div className='flex flex-col ml-2'>
              <h1 className='text-lg'>{chatroom && chatroom.displayName}</h1>
              <p className='text-sm text-black-lightActive'>Active</p>
            </div>
          </div>
          {chatroom && chatroom.sellerId === user.id && (
            <button className='bg-gradient_header text-white rounded-[2rem] border-1 p-2 px-8 border-white-normalActive hover:bg-graident_header_hover'>
              Create order
            </button>
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
              return <MessageBox key={message.id} message={message} />
            })
          ) : (
            <p className='text-center'>Select a chat to start messaging</p>
          )}
        </div>
        {chatId && (
          <form onSubmit={formSubmit} className='mt-5'>
            <div className='flex'>
              <input
                className='w-3/4 mt-3 border-1 p-1 rounded-l-lg border-white-normalActive border-r-0'
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
