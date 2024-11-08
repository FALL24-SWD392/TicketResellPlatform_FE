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
  console.log(ticket.avatar)

  return (
    <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 my-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Column - Images */}
        <div className='w-full lg:w-3/5'>
          <div className='relative h-[400px] mb-4'>
            <img
              src={ticket.image}
              alt='Main Product'
              className='rounded-xl w-full h-full object-cover shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(17,_17,_26,_0.1)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px] transition-shadow duration-300'
            />
          </div>
        </div>

        {/* Right Column - Info */}
        <div className='w-full lg:w-2/5'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>{ticket.title}</h1>

          <div className='space-y-3 mb-6'>
            <p className='flex items-center text-gray-600'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                ></path>
              </svg>
              {date}
            </p>
            <p className='flex items-center text-gray-600'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
              {time}
            </p>
          </div>

          <div className='mb-6'>
            <p className='text-3xl font-bold text-green-darkHover'> {ticket.unitPrice?.toLocaleString('vi-VN')} VNĐ</p>
            <p className='text-sm text-gray-500 mt-1'>Last updated: {dayjs(ticket.updatedAt).format('DD MMM YYYY, h:mm A')}</p>
          </div>

          <div className='flex gap-4 mb-6'>
            <button
              className='flex-1 px-6 py-3 bg-green-600 text-white rounded-lg 
    shadow-lg hover:shadow-green-500/50 hover:translate-y-[-2px] 
    hover:bg-green-700 transition-all duration-300 font-semibold'
            >
              Liên hệ
            </button>
            <button
              className='flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg 
    shadow-lg hover:shadow-gray-400/50 hover:translate-y-[-2px] 
    hover:bg-gray-200 transition-all duration-300 font-semibold'
            >
              Mua ngay
            </button>
          </div>

          <div className='p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-3 mb-2 shadow-2xl'>
              <img src={ticket.sellerId.avatar} alt='Seller' className='w-8 h-8 rounded-full shadow-2xl' />
              <span className='font-semibold text-gray-800'>{ticket.sellerId.username}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex text-yellow-400'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className='w-5 h-5 text-yellow-400 ' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <span className='text-gray-600'>{ticket.sellerId.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Mô tả chi tiết</h2>
        <div className='prose max-w-none'>
          <p className='text-gray-600 leading-relaxed'>{ticket.description}</p>
        </div>
      </div>

      {/* Similar Product CTA */}
      <div className='mt-12 text-center'>
        <button className='inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors font-semibold'>
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
          </svg>
          Bạn có sản phẩm tương tự?
        </button>
      </div>
    </div>
  )
}

export default TicketDetail
