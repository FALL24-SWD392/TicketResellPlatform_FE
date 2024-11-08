import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Spinner, Pagination } from '@nextui-org/react'
import ticketAPI from 'src/apis/ticket.api'
import TicketCard from 'src/Components/ticket/TicketCard'
import { Ticket } from 'src/@types/ticket.type'

function ViewAllTicketPage() {
  const [page, setPage] = useState(1)
  const [size] = useState(12)

  // Fetch tickets data using React Query
  const { data: ticketsData, isLoading } = useQuery({
    queryKey: ['tickets', page, size],
    queryFn: () => ticketAPI.getAllTicket({ page, size })
  })

  const tickets = ticketsData?.data.data || []

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <div className='container-2xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>All Available Tickets</h1>
      
      {/* Grid container for tickets */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
        {tickets.map((ticket: Ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {/* Show message if no tickets */}
      {tickets.length === 0 && (
        <div className='text-center text-gray-500 mt-8'>
          No tickets available
        </div>
      )}

      {/* Pagination */}
      <div className='flex justify-center mt-8'>
        <Pagination 
          showControls 
          total={10} 
          initialPage={1} 
          page={page}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  )
}

export default ViewAllTicketPage