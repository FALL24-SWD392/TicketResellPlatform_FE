import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Order, OrderDetail } from 'src/@types/order.type'
import userAPI from 'src/apis/user.api'
import { AppContext } from 'src/context/app.context'
import { getProfileFormLS } from 'src/utils/auth'

const YourOrderPage = () => {
  const sampleOrders = [
    { id: 1, name: 'Concert Ticket', status: 'COMPLETED' },
    { id: 2, name: 'Museum Entry', status: 'PENDING' },
    { id: 3, name: 'Theater Ticket', status: 'COMPLETED' },
    { id: 4, name: 'Event Pass', status: 'CANCELLED' }
  ]
  const [orders, setOrders] = useState<Order[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetail>({} as OrderDetail)
  const getMyOrderMutation = useMutation({
    mutationFn: (userId: string) => userAPI.getMyOrder(userId),
    onSuccess: (data) => {
      setOrders(data.data.data)
    },
    onError: () => {
      console.log('Error')
    }
  })
  const getOrderDetailMutation = useMutation({
    mutationFn: (orderId: string) => userAPI.getOrderDetail(orderId),
    onSuccess: (data) => {
      setOrderDetails(data.data.data)
    },
    onError: () => {
      console.log('Error')
    }
  })

  React.useEffect(() => {
    getMyOrderMutation.mutate(`${getProfileFormLS()?.id}`)
  }, [])
  console.log(orderDetails)
  return (
    <div className='container-xl flex-col justify-start w-[500px] bg-gray-100 py-4 px-4'>
      <h1 className='text-3xl font-bold text-gray-800 text-center mb-8'>Your Order Tickets</h1>
      <div className=''>
        {orders
          .filter((order) => order.status === 'COMPLETED')
          .map((order) => (
            <div key={order.id} className='bg-white p-4 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>{order.chatBoxId}</h2>
              <p className='text-green-600 font-bold'>Status: {order.status}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default YourOrderPage
