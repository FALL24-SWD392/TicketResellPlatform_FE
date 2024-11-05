
import { SearchBar } from 'src/Components'
import { HiCalendarDays, HiCheck, HiChevronDown, HiMapPin } from 'react-icons/hi2'
import { UserList } from 'src/@types/users.type'
import TicketContainer from 'src/Components/ticket/TicketContainer'
export type QueryConfig = {
  [key in keyof UserList]: string
} & {
  page: number
  limit: number
}

const Home = () => {
  // const [query, setQuery] = useQueryParams({})
  // const queryConfig: QueryConfig = {
  //   sub: query.sub || '',
  //   page: query.page || 1,
  //   limit: query.limit || 10
  // }
  // const { data } = useQuery({
  //   queryKey: ['tickets', queryConfig],
  //   queryFn: () => ticketAPI.getAllTicket(queryConfig)
  //   // placeholderData: keepPreviousData
  // })
  return (
    <>
      {/* Banner */}
      <div className=' h-full w-full'>
        
        <div className='container-xs my-5'>
          <div className='mx-auto'>
            <div className='flex justify-center gap-5 mb-2'>
              <HiCheck className='text-green-normal text-[20px]' />
              <span>The safest way to buy and sell tickets with over 10 million fan</span>
            </div>
            <div className='flex  justify-center gap-5 mb-2'>
              <HiCheck className='text-green-normal text-[20px]' />
              <span>Prices are capped at 20% above face value</span>
            </div>
            <div className='flex gap-5 mb-2 justify-center'>
              <HiCheck className='text-green-normal  text-[20px]' />
              <span>Primary tickets from over 6000 partnered events</span>
            </div>
          </div>
        </div>
        <div className='h-[0.5px] w-full self-stretch bg-black_light opacity-20' />
        <div className='container-xl'>
          <div className='w-full flex justify-start items-center gap-5 px-5 h-[50px] border-white-normalActive border bg-white-lightHover border-opacity-70 shadow-sm rounded-lg'>
            <p>You're seeing recommendations for</p>
            <HiMapPin />
            <p>Nearby</p>
            <HiChevronDown />
          </div>
        </div>
        <div className='container-xl my-10'>
          <h2>Find ticket for your next event</h2>
          <ul className='mt-10 grid-cols-2 gap-5  md:grid  xl:grid-cols-4'>
            <li className='w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive'>
              <p>Today</p>
              <HiCalendarDays color='red' size='30px' />
            </li>
            <li className='w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive'>
              <p>Tomorow</p>
              <HiCalendarDays color='orange' size='30px' />
            </li>
            <li className='w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive'>
              <p>This Weekend</p>
              <HiCalendarDays color='green' size='30px' />
            </li>
            <li className='w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive'>
              <p>Explore all</p>
              <HiCalendarDays color='red' size='30px' />
            </li>
          </ul>
        </div>
        <TicketContainer/>
      </div>
    </>
  )
}

export default Home
