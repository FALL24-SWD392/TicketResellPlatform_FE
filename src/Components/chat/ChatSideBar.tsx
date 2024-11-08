import useFirestore from 'src/hooks/userFirestore'
import { ChatRoom } from '.'

export default () => {
  const rooms = useFirestore('rooms')
  console.log(rooms)
  return (
    <div className='w-1/3 p-2 overflow-y-scroll scrollbar-hide h-screen border-r-1'>
      {rooms.map((room) => {
        return <ChatRoom key={room.id} room={room} />
      })}
    </div>
  )
}
