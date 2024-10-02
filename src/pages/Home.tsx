// import { Image } from '@nextui-org/react'
// import Banner from '../assets/images/banner.svg'
import { SearchBar } from 'src/Components'
import { HiCalendarDays, HiCheck, HiChevronDown, HiMapPin } from 'react-icons/hi2'

const Home = () => {
  return (
    <>
      {/* Banner */}
      <div className='h-full w-full'>
        <div className='banner'>
          <div className='container-xl flex justify-center items-center'>
            <div className='flex-row items-center sm:px-6'>
              <div className='text-white-light h1 text-center '>The safest way to buy and sell ticket</div>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className='container-xs mt-5 '>
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
        <div className="container-xl mt-10">
          <h2>Find your next event</h2>
          <ul className="mt-10 grid-cols-2 gap-5  md:grid  xl:grid-cols-4">
            <li className="w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive">
                <p>Today</p>
                <HiCalendarDays color='red' size="30px"/>
            </li>
            <li className="w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive">
                <p>Tomorow</p>
                <HiCalendarDays color='orange' size="30px"/>
            </li>
            <li className="w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive">
                <p>This Weekend</p>
                <HiCalendarDays color='green' size="30px"/>
            </li>
            <li className="w-full h-[64px] cursor-pointer flex justify-between items-center border-white-normalActive border bg-white-lightHover shadow-md border-opacity-70 rounded-xl p-4 hover:bg-black-lightActive">
                <p>Explore all</p>
                <HiCalendarDays color='red' size="30px"/>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home
