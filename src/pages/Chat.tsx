import { collection, onSnapshot } from '@firebase/firestore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { User } from 'src/@types/users.type'
import { ChatBox } from 'src/Components/chat'
import chatapp from 'src/utils/chatapp.config'
import { addDocument } from 'src/utils/chatapp.service'

const Chat = () => {
  const {id} = useParams();
  const user: User = JSON.parse(localStorage.getItem('profile') || '{}')
  useEffect(() => {
    const db = chatapp.firestore
    const userQuery = collection(db, 'users')
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      let enableAdd = true
      if (user) {
        for (const item of data) {
          if (item.email === user.email) {
            enableAdd = false
            break
          }
        }
      }
      enableAdd && user && addDocument('users', user)
    })
    return () => unsubscribe()
  }, [user])

  return <ChatBox user={user} chatId={id}/>
}

export default Chat
