import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ListBaseResponse } from 'src/@types/response'
import { Ticket } from 'src/@types/ticket.type'
import ticketAPI from 'src/apis/ticket.api'
import TicketCard from './TicketCard'
import { Select } from '@nextui-org/react'

const TicketContainer: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [ticketData, setTicketData] = useState<ListBaseResponse<Ticket>>({
    status: 100,
    message: "",
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: []
  })
  const getAllTicketMutation = useMutation({
    mutationKey: ['getAllTicket'],
    mutationFn: ({ page, size }: { page: number; size: number }) => {
      return ticketAPI.getAllTicket({ page, size })
    },
    onSuccess: (data) => {
      setTicketData(data.data)
    },
    onError: (error) => {
        console.log(error)
    }
  })

  useEffect(() => {
    getAllTicketMutation.mutate({ page: 1, size:10 })
  }, [size, page])
  console.log(ticketData)
  return ( 
    <div className="container-xl my-10">
      <div className="w-full flex justify-between p-2">
        <h1 className="text-2xl font-bold">New uploaded ticket</h1>
        <div className='flex items-center flex-row'>
          <label className="mr-2">Size</label>
          <Select
            className="border-2 border-black-light rounded-md p-1 focus:border-black-lightActive"
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2'>
        {ticketData?.data.map((ticket: Ticket) => (
          <TicketCard key={ticket.id} ticket={ticket}/>
        ))}
      </div>
    </div>
  )
}

export default TicketContainer
