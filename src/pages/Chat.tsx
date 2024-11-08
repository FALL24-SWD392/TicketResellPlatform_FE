
import { useParams } from 'react-router-dom'
import { User } from 'src/@types/users.type'
import { ChatBox } from 'src/Components/chat'


const Chat = () => {
  const {id} = useParams();
  const user: User = JSON.parse(localStorage.getItem('profile') || '{}')
  

  return <ChatBox user={user} chatId={id}/>
}

export default Chat
