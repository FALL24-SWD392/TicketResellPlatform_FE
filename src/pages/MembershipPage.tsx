import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React from 'react'
import userAPI from 'src/apis/user.api'
import { Link } from 'react-router-dom';

const MembershipPage = () => {
  const { data } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => userAPI.getMembership()
  })
  const membership = data?.data.data
  return (
    <div className='min-h-[300px] flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Your Membership</h2>
          <h3 className='text-2xl font-semibold text-green-600'>{membership?.subscriptionName}</h3>
        </div>

        {/* Membership Details Card */}
        <div className='bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-xl border border-teal-100 mb-6'>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 font-medium'>Sale Remain</span>
              <span className='text-teal-700 font-bold'>{membership?.saleRemain}</span>
            </div>
            
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 font-medium'>Start Date</span>
              <span className='text-teal-700 font-bold'>{dayjs(membership?.startDate).format('MM/DD/YYYY HH:mm')}</span>
            </div>
            
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 font-medium'>End Date</span>
              <span className='text-teal-700 font-bold'>{dayjs(membership?.endDate).format('MM/DD/YYYY HH:mm')}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link to='/subscriptions'>
  <button className='w-full py-3 px-6 bg-green-normalActive from-green-500 to-teal-500 text-white font-semibold rounded-xl 
          hover:from-green-600 hover:to-teal-600 transform hover:scale-[1.02] transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg'>
    Upgrade or Renew
  </button>
</Link>
      </div>
    </div>
  )
}

export default MembershipPage
