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
    <div className='container-xl justify-start w-[500px] bg-gray-100 py-4 px-4'>
      <h1 className='text-3xl font-bold text-gray-800 text-center mb-8'>Your Order Tickets</h1>
      <div className='flex-row justify-start'>
        {(orders.length > 0) ? orders
          .filter((order) => order.status === 'COMPLETED')
          .map((order) => (
            <>
              <div className='flex justify-center border p-3 '>
                <div className='w-1/3'>
                  <img src={order.ticket.image} alt='' />
                </div>
                <div className="w-2/3 p-5">
                  <div className="flex-col justify-center">
                    <h4>Ticket Name: {order.ticket.title}</h4>
                    <p>Price: {order.ticket.unitPrice} VNĐ</p>
                    <p>Status : {order.status}</p>
                  </div>
                </div>
              </div>
            </>
          )): <p className='text-center h-screen text-[100px]'>No order ticket</p>}
      </div>
    </div>
  )
}

export default YourOrderPage
