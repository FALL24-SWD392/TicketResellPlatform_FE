import ChatSideBar from './ChatSideBar'
import ChatWindow from './ChatWindow'

export default () => {
  return (
    <div className='flex container-2xl rounded-xl overflow-hidden my-5 shadow-2xl'>
      <ChatSideBar />
      <ChatWindow />
    </div>
  )
}
