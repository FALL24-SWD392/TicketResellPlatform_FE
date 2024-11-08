import { useNavigate } from 'react-router-dom'
import { ChatRoom } from 'src/@types/chat.type'

export default ({ room }: { room: ChatRoom }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/chat/${room.id}`)
    window.location.reload()
  }
  return (
    <div className='w-full flex p-2 justify-center items-center cursor-pointer border-b-1 border-white-dark' onClick={handleClick}>
      <img src='https://placehold.co/400' alt='profile' className='rounded-full h-10 w-10' />
      <div className='ml-2'>
        <h1 className='text-lg'>{room.displayName}</h1>
        <p className='text-sm text-black-lightActive'>{room.messages.length}</p>
      </div>
    </div>
  )
}
