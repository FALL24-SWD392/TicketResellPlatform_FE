import { useNavigate } from 'react-router-dom'
import { ChatRoom } from 'src/@types/chat.type'
import { User } from 'src/@types/users.type'

interface Props {
  room: ChatRoom
  isActive?: boolean
  user: User
}

export default ({ room, isActive, user }: Props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/chat/${room.id}`)
  }
  const lastMessage = room.messages[room.messages.length - 1]
  const sentByMe = lastMessage && lastMessage.senderId === user.id
  return (
    <div
      className={`w-full flex p-3 justify-start items-center cursor-pointer hover:bg-white-normal rounded-xl ${isActive && 'bg-white-normal'}`}
      onClick={handleClick}
    >
      <img src='https://placehold.co/400' alt='profile' className='rounded-full h-11 w-11 border-1 border-white-dark' />
      <div className='ml-3 overflow-hidden w-64 flex flex-col justify-between items-start'>
        <h1 className='text-lg font-normal'>{room.displayName}</h1>
        <p className='text-sm text-white-darkActive font-normal'>
          {sentByMe && 'You: '}
          {lastMessage?.text.length > 25 ? lastMessage?.text.substring(0, 25) + '...' : lastMessage?.text}
        </p>
      </div>
    </div>
  )
}
