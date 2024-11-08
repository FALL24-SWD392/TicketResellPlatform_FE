import { Image } from '@nextui-org/react'
import dayjs from 'dayjs'
import { ReactNode, useMemo, useState } from 'react'
import { Ticket } from 'src/@types/ticket.type'
import { ChatBoxStatus, ChatRoom } from 'src/@types/chat.type'
import { User } from 'src/@types/users.type'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import useFirestore from 'src/hooks/useFirestore'
import { addDocument } from 'src/utils/chatapp.service'
import { WhereFilterOp } from '@firebase/firestore'

interface Props {
  ticket: Ticket
  rederProps?: ReactNode
}

const TicketDetail = ({ ticket }: Props) => {
  const navigate = useNavigate()

  const [currentChatroom, setCurrentChatroom] = useState<ChatRoom>({
    ticketId: '',
    buyerId: '',
    sellerId: '',
    id: '',
    messages: [],
    createAt: new Date(),
    updateAt: new Date(),
    status: ChatBoxStatus.PENDING,
    members: [],
    displayName: ''
  })
  const user: User = JSON.parse(localStorage.getItem('profile') || '{}')
  const chatroomCondition = useMemo(() => {
    return {
      field: 'members',
      operator: 'array-contains' as WhereFilterOp,
      value: user.id || ''
    }
  }, [ticket])
  const chatrooms = useFirestore('chatrooms', chatroomCondition)

  const contactSeller = () => {
    if (!user) {
      navigate('/login')
    } else {
      console.log(ticket)
      const newChatroom = {
        ticketId: ticket.id,
        buyerId: user.id || '',
        sellerId: ticket.sellerId || '',
        id: uuidv4(),
        members: [user.id || '', ticket.sellerId || ''],
        status: ChatBoxStatus.PENDING,
        messages: [],
        createAt: new Date(),
        updateAt: new Date(),
        displayName: ticket.title || ''
      }
      setCurrentChatroom(newChatroom)
      const existingChatroom = chatrooms.find(
        (chatroom: ChatRoom) =>
          chatroom.ticketId === newChatroom.ticketId && chatroom.buyerId === newChatroom.buyerId && chatroom.sellerId === newChatroom.sellerId
      )
      if (existingChatroom) {
        navigate(`/chat/${existingChatroom.id}`)
      } else {
        addDocument('chatrooms', newChatroom)
        navigate(`/chat/${newChatroom.id}`)
      }
    }
  }

  const date = dayjs(ticket.expDate).format('DD MMM YYYY')
  const time = dayjs(ticket.updatedAt).format('h:mm A')
  const dateSplit = date.split('/')
  const [dayStr, monthStr, yearStr] = dateSplit.map((item) => item.trim())
  const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}`)
  return (
    <div className='max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-6'>
      {/* Product Images */}
      <div className='flex flex-col sm:flex-row gap-6'>
        <div className='w-full sm:w-1/2'>
          <img src={ticket.image} alt='Main Product' className='rounded-lg w-full h-72 object-cover' />
          <div className='flex mt-4 gap-2'>
            <img src={ticket.image} alt='Thumbnail' className='w-20 h-20 rounded-lg object-cover' />
            <img src={ticket.image} alt='Thumbnail' className='w-20 h-20 rounded-lg object-cover' />
            <img src={ticket.image} alt='Thumbnail' className='w-20 h-20 rounded-lg object-cover' />
          </div>
        </div>

        {/* Product Info */}
        <div className='w-full sm:w-1/2'>
          <h1 className='text-2xl font-bold'>{ticket.title}</h1>
          <p></p>
          <p className='text-gray-500 mt-1'>{date}</p>
          <p className='text-gray-500 mt-1'>{time}</p>
          <p className='text-red-600 text-xl font-semibold mt-2'>{ticket.unitPrice}</p>
          <p className='text-sm text-gray-500 mt-1'>{ticket.updatedAt}</p>
          <button className='mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700' onClick={contactSeller}>
            Lien he
          </button>
          <button className='mt-4 ml-2 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400'>Mua ngay</button>
          <div className='mt-4 flex items-center gap-1'>
            <span className='font-semibold'>Banafoods</span>
            <span className='text-yellow-500'>&#9733; 5</span>
            <span className='text-gray-500'>(1 đánh giá)</span>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Mô tả chi tiết</h2>
        <p className='mt-2 text-gray-700'>{ticket.description}</p>
      </div>

      {/* Product Details */}
      {/*  */}

      {/* Similar Product Button */}
      <div className='mt-6'>
        <button className='px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700'>Bạn có sản phẩm tương tự?</button>
      </div>
    </div>
  )
}

export default TicketDetail
