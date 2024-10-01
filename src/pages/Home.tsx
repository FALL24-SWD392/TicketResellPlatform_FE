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
            <div className='flex-row'>
              <span className='text-white-light h1'>The safest way to buy and sell ticket</span>
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
