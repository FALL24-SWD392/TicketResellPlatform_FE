import { Message } from 'src/@types/chat.type'
import { format } from 'date-fns'
import { User } from 'src/@types/users.type'

interface Props {
  message: Message
  user: User
}

export default ({ message, user }: Props) => {
  const isSentByMe = message.senderId === user.id
  const time = message.createAt.seconds as number
  const createdAt = format(new Date(time * 1000), 'dd/MM/yyyy HH:mm')
  return (
    message && (
      <div className='p-2 justify-start items-start'>
        <div className={`flex ${isSentByMe && 'flex-row-reverse'} justify-between items-center`}>
          <div className={`flex ${isSentByMe && 'flex-row-reverse'} justify-center items-center`}>
            <img src={message.senderAvatar || 'https://placehold.co/400'} alt='' className='w-6 h-6 rounded-full' />
            <p className='text-sm mx-2'>{message.senderName}</p>
          </div>
          <p className='text-sm text-white-normalActive'>{createdAt}</p>
        </div>
        <p className={`text-xl p-2 bg-white-normalHover rounded-[0.5rem] text-black-darker mt-2 w-full text-wrap overflow-x-hidden ${isSentByMe && 'text-right'}`}>
          {message.text}
        </p>
      </div>
    )
  )
}
