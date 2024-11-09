import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TicketList } from 'src/@types/ticket.type'
import userAPI from 'src/apis/user.api'
import { getProfileFormLS } from 'src/utils/auth'

const sampleTickets = [
  {
    id: 1,
    imageUrl: 'https://example.com/image1.jpg',
    title: 'Concert Ticket',
    unitPrice: 50,
    status: 'Active',
    expiryDate: '2024-12-31',
    quantity: 2
  },
  {
    id: 2,
    imageUrl: 'https://example.com/image2.jpg',
    title: 'Museum Entry',
    unitPrice: 20,
    status: 'Expired',
    expiryDate: '2024-10-01',
    quantity: 1
  },
  {
    id: 2,
    imageUrl: 'https://example.com/image2.jpg',
    title: 'Museum Entry',
    unitPrice: 20,
    status: 'Expired',
    expiryDate: '2024-10-01',
    quantity: 1
  },
  {
    id: 2,
    imageUrl: 'https://example.com/image2.jpg',
    title: 'Museum Entry',
    unitPrice: 20,
    status: 'Expired',
    expiryDate: '2024-10-01',
    quantity: 1
  }
  // Add more tickets as needed
]
const YourTicketPage = () => {
  const [tickets, setTickets] = useState<TicketList[]>([])
  const getMyTickets = useMutation({
    mutationFn: (userId: string) => userAPI.getMyTickets(userId, 1, 10),
    onSuccess: (data) => {
      setTickets(data.data.data)
    },
    onError: () => {
      console.log('Error')
    }
  })
  React.useEffect(() => {
    getMyTickets.mutate(`${getProfileFormLS()?.id}`)
  }, [])
  return (
    <div className='container-2xl min-h-screen bg-gray-100 py-8 px-4'>
      <h1 className='text-3xl font-bold text-gray-800 text-center mb-8'>My Tickets</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tickets.map((ticket) => (
          <Link
            to={`/manage-my-ticket/${ticket.id}`}
            key={ticket.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105'
          >
            <div key={ticket.id} className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105'>
              <img src={ticket.image} alt={ticket.title} className='w-full h-40 object-cover' />
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>{ticket.title}</h2>
                <p className='text-gray-600 mb-1'>
                  <strong>Price:</strong> ${ticket.unitPrice}
                </p>
                <p className='text-gray-600 mb-1'>
                  <strong>Status:</strong> {ticket.status}
                </p>
                <p className='text-gray-600 mb-1'>
                  <strong>Expiration Date:</strong> {dayjs(ticket.expDate).format('MM/DD/YYYY')}
                </p>
                <p className='text-gray-600 mb-1'>
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default YourTicketPage
