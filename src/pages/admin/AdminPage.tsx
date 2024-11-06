import React, { useState } from 'react'
import { Card } from '@nextui-org/react'
import LayoutAdmin from 'src/layouts/admin/LayoutAdmin'
import Chart1 from 'src/Components/charts/Chart1'
import chart1Img from 'src/assets/images/chart1.png'
import Chart2 from 'src/Components/charts/Chart2'
import Chart3 from 'src/Components/charts/Chart3'

const AdminPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleAvatarClick = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <LayoutAdmin>
      <div className='grid grid-cols-4 gap-4 w-[1700px]'>
        <div className='bg-[#E4E4E7] h-[200px] flex items-center justify-between px-6'>
          <div>
            <p className='text-black text-[21px] mb-1'>Spent this month</p>
            <p className='text-4xl font-bold text-purple-700'>$682.5</p>
          </div>
          <div>
            <img src={chart1Img} width={70} height={70} alt='Chart representing spending' />
          </div>
        </div>
        <div className='bg-[#E4E4E7] h-[200px] flex items-center justify-between px-6'>
          <div>
            <p className='text-black text-[21px] mb-1'>Spent this month</p>
            <p className='text-4xl font-bold text-purple-700'>$682.5</p>
          </div>
          <div>
            <img src={chart1Img} width={70} height={70} alt='Chart representing spending' />
          </div>
        </div>
        <div className='bg-[#E4E4E7] h-[200px] flex items-center justify-between px-6'>
          <div>
            <p className='text-black text-[21px] mb-1'>Spent this month</p>
            <p className='text-4xl font-bold text-purple-700'>$682.5</p>
          </div>
          <div>
            <img src={chart1Img} width={70} height={70} alt='Chart representing spending' />
          </div>
        </div>
        <div className='bg-[#E4E4E7] h-[200px] flex items-center justify-between px-6'>
          <div>
            <p className='text-black text-[21px] mb-1'>Spent this month</p>
            <p className='text-4xl font-bold text-purple-700'>$682.5</p>
          </div>
          <div>
            <img src={chart1Img} width={70} height={70} alt='Chart representing spending' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mt-8'>
        <Card className='p-6 bg-[#E4E4E7] shadow-md text-center' style={{ width: '1200px' }}>
          <p className='text-lg font-semibold text-black'>Total Spent</p>
          <p className='text-2xl font-bold mt-2 text-black'>$682.5</p>
          <Chart1 />
        </Card>

        <Card className='p-4 bg-[#E4E4E7] shadow-lg flex flex-col items-center justify-center' style={{ width: '450px', marginLeft: '370px' }}>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer' onClick={handleAvatarClick}>
            <img
              src=' https://yt3.ggpht.com/-qfdylQER4GU/AAAAAAAAAAI/AAAAAAAAAAA/QQTnVEWuEU4/s900-c-k-no/photo.jpg'
              alt='User Avatar'
              className='w-full h-full object-cover'
            />
          </div>
          <p className='text-2xl font-semibold text-black mt-8'>Puppy</p>
          <p className='text-sm text-gray-500'>Việt Nam</p>

          <div className='grid grid-cols-3 gap-4 mt-4 text-center'>
            <div>
              <p className='text-2xl font-bold text-black'>Projects</p>
              <p className='text-sm text-gray-500'>1000</p>
            </div>
            <div>
              <p className='text-2xl font-bold text-black'>Followers</p>
              <p className='text-sm text-gray-500'>1000</p>
            </div>
            <div>
              <p className='text-2xl font-bold text-black'>Following</p>
              <p className='text-sm text-gray-500'>1000</p>
            </div>
          </div>
        </Card>
      </div>

      {modalVisible && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75' onClick={closeModal}>
          <div className='bg-white rounded-lg p-6' onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col items-center'>
              <div className='relative w-full h-[80vh] max-w-3xl border-4 border-blue-500'>
                <img
                  src='https://i.pinimg.com/736x/e5/80/4e/e5804eb0e0694db01692f3e19b4aa78b.jpg'
                  alt='User Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mt-8'>
        <Card className='p-6 bg-[#E4E4E7] shadow-md text-center' style={{ width: '1200px' }}>
        <p className='text-lg font-semibold mb-2'>Spent this month</p>
        <p className='text-4xl font-bold text-purple-700 mb-2'>$682.5</p>
          <Chart2 />
        </Card>

        <Card className='p-4 bg-[#E4E4E7] shadow-lg flex flex-col items-center text-center' style={{ width: '450px', marginLeft: '370px' }}>
        <p className='text-lg font-semibold mb-2'>Ticket Sales Over Years</p>
        <p className='text-4xl font-bold text-purple-700 mb-2'>Sales Growth</p>
          <Chart3 />
        </Card>
      </div>
    </LayoutAdmin>
  )
}


export default AdminPage