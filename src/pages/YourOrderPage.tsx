import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Order, OrderDetail } from 'src/@types/order.type'
import userAPI from 'src/apis/user.api'
import { getProfileFormLS } from 'src/utils/auth'

const YourOrderPage = () => {
  const sampleOrders = [
    { id: 1, name: 'Concert Ticket', status: 'COMPLETED' },
    { id: 2, name: 'Museum Entry', status: 'PENDING' },
    { id: 3, name: 'Theater Ticket', status: 'COMPLETED' },
    { id: 4, name: 'Event Pass', status: 'CANCELLED' }
  ]
  const [orders, setOrders] = useState<Order[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const getMyOrderMutation = useMutation({
    mutationFn: (userId: string) => userAPI.getMyOrder(userId),
    onSuccess: (data) => {
      setOrders(data?.data.data || [])
    },
    onError: () => {
      console.log('Error')
    }
  })

  React.useEffect(() => {
    getMyOrderMutation.mutate(`${getProfileFormLS()?.id}`)
  }, [])

  return (
    <div className='container mx-auto max-w-7xl p-8 bg-gray-50'>
      <h1 className='text-3xl font-bold text-gray-800 text-center mb-8 hover:text-indigo-600 transition-colors'>Your Order Tickets</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {(orders.length > 0) ? orders
          .filter((order) => order.status === 'COMPLETED')
          .map((order) => (
            <div 
              key={order.id} 
              className='bg-white rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out
                         hover:shadow-xl hover:scale-105 hover:border-indigo-300 border-2 border-transparent'
            >
              <div className='relative group'>
                <img 
                  src={order.ticket.image} 
                  alt={order.ticket.title}
                  className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
              </div>
              <div className="p-6 pb-8 border-t border-gray-100">
                <h4 className="text-xl font-semibold mb-3 text-gray-800 hover:text-indigo-600 transition-colors">
                  {order.ticket.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  Price: <span className="font-medium text-indigo-600">{order.ticket.unitPrice.toLocaleString()} VNĐ</span>
                </p>
                <div className="flex flex-col space-y-3">
                  <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium
                                 hover:bg-green-200 transition-colors duration-300 w-fit">
                    {order.status}
                  </span>
                  <div className="flex space-x-3">
                    <a
                      href={`/report/${order.id}`}
                      className="flex-1 group relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border-2 border-red-500 
                               rounded-full text-sm font-semibold text-red-500 transition-all duration-300 ease-in-out
                               hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200
                               active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                      Report
                    </a>
                    <a
                      href={`/feedback/${order.id}`}
                      className="flex-1 group relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border-2 border-blue-500 
                               rounded-full text-sm font-semibold text-blue-500 transition-all duration-300 ease-in-out
                               hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-200
                               active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                      Feedback
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )): <p className='text-center h-screen text-[100px]'>No order ticket</p>}
      </div>
    </div>
  )
}

export default YourOrderPage
