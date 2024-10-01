// import { Image } from '@nextui-org/react'
// import Banner from '../assets/images/banner.svg'
import { SearchBar } from 'src/Components'

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
        <div className="my-10 container-xl">
          
        </div>
      </div>
    </>
  )
}

export default Home
