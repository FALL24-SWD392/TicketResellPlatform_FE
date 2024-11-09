import { WhereFilterOp } from '@firebase/firestore'
import { useMemo } from 'react'
import { User } from 'src/@types/users.type'
import useFirestore from 'src/hooks/useFirestore'

interface Props {
  chatId: string
  user: User
}

export default ({ chatId, user }: Props) => {
  console.log(chatId, user)
  const chatroomCondition = useMemo(() => {
    return { field: 'id', operator: '==' as WhereFilterOp, value: chatId || '' }
  }, [user])
  const chatrooms = useFirestore('chatrooms', chatroomCondition)
  const currentChatroom = chatrooms[0]
  console.log(currentChatroom)
  return <div className='w-2/3 bg-white-light h-[48rem] p-3'></div>
}
