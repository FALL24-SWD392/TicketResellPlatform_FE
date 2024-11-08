import { User } from 'src/@types/users.type'
import ChatSideBar from './ChatSideBar'
import ChatWindow from './ChatWindow'

interface ChatBoxProps{
  user: User
  chatId?: string
}

export default ({user, chatId} : ChatBoxProps) => {
  return (
    <div className='flex container-2xl rounded-xl overflow-hidden my-5 shadow-2xl'>
      <ChatSideBar user={user}/>
      <ChatWindow chatId={chatId} user={user}/>
    </div>
  )
}
