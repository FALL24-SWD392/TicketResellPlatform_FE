import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React from 'react'
import userAPI from 'src/apis/user.api'

const MembershipPage = () => {
  const { data } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => userAPI.getMembership()
  })
  const membership = data?.data.data
  return (
    <div className='flex justify-center items-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-80 text-center'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Your Membership</h2>
        <h3 className='text-xl text-green-normal'>{membership?.subscriptionName}</h3>
        <div className='bg-teal-50 p-2 rounded-md text-teal-700 font-bold mb-4'>
          <p>
            <strong>Sale Reman:</strong> {membership?.saleRemain}
          </p>
          <p>
            <strong>Start Date:</strong> {dayjs(membership?.startDate).format('MM/DD/YYYY HH:mm')}
          </p>
          <p>
            <strong>End Date:</strong> {dayjs(membership?.endDate).format('MM/DD/YYYY HH:mm')}
          </p>
        </div>
        <button className='mt-4 px-4 py-2 bg-green-normalActive text-white font-medium rounded-md hover:bg-teal-700 transition duration-300'>
          Upgrade or Renew
        </button>
      </div>
    </div>
  )
}

export default MembershipPage
