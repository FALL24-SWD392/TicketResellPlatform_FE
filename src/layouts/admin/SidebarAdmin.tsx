import React from 'react'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom' // Sử dụng Link từ react-router-dom cho điều hướng

const SidebarAdmin: React.FC = () => {
  return (
    <div className='w-64 h-[1200px] bg-[#F4F4F5] shadow-lg p-5'>
      <div className='flex justify-center items-center mb-10'>
        <span className='text-2xl font-bold text-center' style={{ color: '#481878' }}>
          Ticket Resell
        </span>
      </div>

      <div>
        <Button className='w-full text-left text-lg text-gray-500 mb-4'>Dashboard</Button>
        <Link to='/manager-users'>
          <Button className='w-full text-left text-lg text-gray-500 mb-4'>Manager Users</Button>
        </Link>
        <Link to='/subscriptions'>
          <Button className='w-full text-left text-lg text-gray-500 mb-4'>Subscriptions</Button>
        </Link>
        <Link to='/manager-tickets'>
          <Button className='w-full text-left text-lg text-gray-500 mb-4'>Manager Tickets</Button>
        </Link>
        <Link to='/transactions'>
          <Button className='w-full text-left text-lg text-gray-500 mb-4'>Transactions</Button>
        </Link>
      </div>

      <div className='mt-[350px]'>
        <Button className='w-full mt-10 text-left text-red-500'>Log Out</Button>
      </div>
    </div>
  )
}

export default SidebarAdmin
