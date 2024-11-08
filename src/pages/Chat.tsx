import { collection, onSnapshot } from '@firebase/firestore'
import { useEffect } from 'react'
import { User } from 'src/@types/users.type'
import { ChatBox } from 'src/Components/chat'
import chatapp from 'src/utils/chatapp.config'
import { addDocument } from 'src/utils/chatapp.service'

const Chat = () => {
  const user: User = JSON.parse(localStorage.getItem('profile') || '{}')
  console.log(user)
  useEffect(() => {
    const db = chatapp.firestore
    const userQuery = collection(db, 'users')
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      let enableAdd = true
      for (const item of data) {
        if (item.email === user.email) {
          enableAdd = false
          break
        }
      }
      if (enableAdd) {
        addDocument('users', user)
      }
    })
    return () => unsubscribe()
  }, [user])

  return <ChatBox />
}

export default Chat
