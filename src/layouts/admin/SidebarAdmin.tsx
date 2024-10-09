import React from 'react'
import { Button } from '@nextui-org/react'

const SidebarAdmin: React.FC = () => {
  return (
    <div className='w-64 h-[1200px] bg-[#F4F4F5] shadow-lg p-5'>
      <div className='flex justify-center items-center mb-10'>
        <span className='text-2xl font-bold text-center' style={{ color: '#481878' }}>
          Ticket Resell
        </span>
      </div>

      <div className='space-y-[30px]'>
        <Button className='w-full text-left text-lg text-gray-500'>Dashboard</Button>
        <Button className='w-full text-left text-lg text-gray-500'>Activity</Button>
        <Button className='w-full text-left text-lg text-gray-500'>Library</Button>
        <Button className='w-full text-left text-lg text-gray-400'>Sign In</Button>
        <Button className='w-full text-left text-lg text-gray-400'>Sign Up</Button>
        <Button className='w-full text-left text-lg text-gray-500'>Schedules</Button>
        <Button className='w-full text-left text-lg text-gray-500'>Payouts</Button>
        <Button className='w-full text-left text-lg text-gray-500'>Settings</Button>
      </div>
      <div className='mt-[350px]'>
        <Button className='w-full mt-10 text-left text-red-500'>Log Out</Button>
      </div>
    </div>
  )
}

export default SidebarAdmin
