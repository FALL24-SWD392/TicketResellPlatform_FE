import useFirestore from 'src/hooks/useFirestore'
import { ChatRoom } from '.'
import { User } from 'src/@types/users.type'
import { useMemo } from 'react'

interface ChatRoomProps {
  user: User
}

export default ({ user }: ChatRoomProps) => {
  const roomCondition = useMemo(() => {
    return {
      field: 'members',
      operator: 'array-contains' as 'array-contains',
      value: user.id || ''
    }
  },[user])
  const rooms = useFirestore('chatrooms', roomCondition)
  return (
    <div className='w-1/3 p-2 overflow-y-scroll scrollbar-hide h-screen border-r-1'>
      {rooms.length === 0? (
        <div className='border-b-1 border-white-dark flex  flex-row justify-between items-center'>
          <p className='text-center w-full text-xl'>You have no chat box</p>
        </div>
      ) : (
        rooms.map((room) => {
          return <ChatRoom key={room.id} room={room} />
        })
      )}
    </div>
  )
}
