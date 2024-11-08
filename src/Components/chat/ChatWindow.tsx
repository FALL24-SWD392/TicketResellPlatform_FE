import { Message } from '.'

export default () => {
  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className='w-2/3 bg-white-light h-screen p-2'>
      <div className='border-b-1 border-white-dark flex  flex-row justify-between items-center'>
        <div className='flex flex-row justify-center items-center'>
          <img src='https://placehold.co/400' alt='' className='w-10 h-10 rounded-full' />
          <div className='flex flex-col ml-2'>
            <h1 className='text-lg'>User Name</h1>
            <p className='text-sm text-black-lightActive'>Active</p>
          </div>
        </div>
        <button className='bg-gradient_header text-white rounded-[2rem] border-1 p-2 px-8 border-white-normalActive hover:bg-graident_header_hover'>Create order</button>
      </div>
      <div className='flex flex-col chat-content justify-end'>
        <div className='chat-message overflow-y-scroll scrollbar-hide'>
          {[1, 2, 3, 4, 5].map((item) => (
            <Message key={item} />
          ))}
        </div>
        <form onSubmit={formSubmit} className='mt-5'>
          <div className='flex'>
            <input className='w-3/4 mt-3 border-1 p-1 rounded-l-lg border-white-normalActive border-r-0' placeholder='Chat with opponent...' />
            <button className='w-1/4 mt-3 bg-gradient_header text-white rounded-r-lg border-1 border-white-normalActive hover:bg-graident_header_hover'>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}
