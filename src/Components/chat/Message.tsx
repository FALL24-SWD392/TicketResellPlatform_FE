import { Message } from 'src/@types/chat.type'
import { format } from 'date-fns'

interface Props {
  message: Message
}

export default ({ message }: Props) => {
  console.log(message)
  const time = message.createAt.seconds as number;
  const createdAt = format(new Date(time * 1000), 'dd/MM/yyyy HH:mm')
  return (
    <div className='p-2 justify-start items-start'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <img src={message.senderAvatar || 'https://placehold.co/400'} alt='' className='w-6 h-6 rounded-full' />
          <p className='text-lg ml-2'>{message.senderName}</p>
        </div>

        <p className='text-sm text-white-normalActive'>{createdAt}</p>
      </div>
      <p className='text-sm text-black-darker mt-2'>{message.text}</p>
    </div>
  )
}
