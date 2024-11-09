import useFirestore from 'src/hooks/useFirestore'
import { ChatRoom } from '.'
import { User } from 'src/@types/users.type'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface ChatRoomProps {
  user: User
  chatId?: string
}

export default ({ user, chatId }: ChatRoomProps) => {
  const navigate = useNavigate()
  const roomCondition = useMemo(() => {
    return {
      field: 'members',
      operator: 'array-contains' as 'array-contains',
      value: user.id || ''
    }
  }, [user])
  const rooms = useFirestore('chatrooms', roomCondition)
  if(rooms.length === 0) navigate('/chat')
  return (
    <div className='w-1/3 p-6 overflow-y-scroll scrollbar-hide h-[48rem] border-r-1'>
      <p className='text-3xl text-left pl-10 font-bold mb-2'>Chat Rooms</p>
      {rooms.length === 0 ? (
        <div className='border-b-1 border-white-dark flex  flex-row justify-between items-center'>
          <p className='text-center w-full text-xl'>You have no chat box</p>
        </div>
      ) : (
        rooms.map((room) => {
          return room.id == chatId ? <ChatRoom key={room.id} room={room} isActive={true} user={user}/> : <ChatRoom key={room.id} room={room} user={user}/>
        })
      )}
    </div>
  )
}
