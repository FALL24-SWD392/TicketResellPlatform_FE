export default () => {
  return (
    <div className='p-2 justify-start items-start'>
      <div className='flex justify-between items-center'>
        <div className="flex justify-center items-center">
        <img src='https://placehold.co/400' alt='' className='w-6 h-6 rounded-full' />
        <p className='text-lg ml-2'>User Name</p>
        </div>
        
        <p className="text-sm text-white-normalActive">08/11/2024</p>
      </div>
      <p className='text-sm text-black-darker mt-2'>chat message</p>
    </div>
  )
}
