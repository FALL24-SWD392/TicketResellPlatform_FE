import React, { useState, useEffect } from 'react'
import { Modal, Button, Pagination } from '@nextui-org/react'
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import SidebarStaff from 'src/layouts/staff/SidebarStaff'
import ticketAPI from 'src/apis/ticket.api'

const TicketApproval: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await ticketAPI.getAllTicketAdmin()
        setTickets(response.data.data)
      } catch (err) {
        setError('Failed to fetch tickets')
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  const openTicketDetails = (ticket: any) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  const handleDelete = async (ticketId: string) => {
    try {
      await ticketAPI.deleteTicketById(ticketId)
      setTickets(tickets.filter(ticket => ticket.id !== ticketId))
    } catch (err) {
      setError('Failed to delete ticket')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success"
      case "PENDING":
        return "warning"
      case "REJECTED":
        return "danger"
      default:
        return "default"
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SidebarStaff />
      <div className='flex-1 p-6 ml-64'>
        <div className='flex flex-col w-full bg-gray-50 p-6'>
          <h1 className='text-2xl font-semibold mb-4'>Pending Ticket Approvals</h1>

          <div className='flex space-x-6'>
            <div className='w-1/4 bg-white p-4 rounded-lg shadow-md'>
              <h2 className='text-lg font-semibold mb-4'>Filter</h2>
              <label htmlFor='search-input' className='block text-gray-700 mb-2'>Search</label>
              <input id='search-input' type='text' placeholder='Search' className='w-full p-2 border border-gray-300 rounded-md mb-4' />
              <label htmlFor='category-select' className='block text-gray-700 mb-2'>Category</label>
              <select id='category-select' className='w-full p-2 border border-gray-300 rounded-md'>
                <option value=''>Select Category</option>
                <option value='awaiting-approval'>Awaiting Approval</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
              </select>
              <div className='flex justify-center mt-4'>
                <button className='w-[200px] bg-purple-600 text-white py-2 rounded-md border border-purple-700 hover:bg-[#e1e2eb]'>Apply</button>
              </div>
            </div>

            <div className='w-3/4 bg-white p-6 rounded-lg shadow-md'>
              {loading ? (
                <p>Loading tickets...</p>
              ) : error ? (
                <p className='text-red-500'>{error}</p>
              ) : (
                <Table aria-label='Ticket Approval Table'>
                  <TableHeader>
                    <TableColumn className='text-center text-lg'>Title</TableColumn>
                    <TableColumn className='text-center text-lg'>Type</TableColumn>
                    <TableColumn className='text-center text-lg'>Price</TableColumn>
                    <TableColumn className='text-center text-lg'>Quantity</TableColumn>
                    <TableColumn className='text-center text-lg'>Status</TableColumn>
                    <TableColumn className='text-center text-lg'>Exp Date</TableColumn>
                    <TableColumn className='text-center text-lg'>Actions</TableColumn>
                  </TableHeader>

                  <TableBody>
                    {tickets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7}>No rows to display.</TableCell>
                      </TableRow>
                    ) : (
                      tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell>{ticket.title}</TableCell>
                          <TableCell>{ticket.type}</TableCell>
                          <TableCell>{ticket.unitPrice}</TableCell>
                          <TableCell>{ticket.quantity}</TableCell>
                          <TableCell>
                            <span
                              className={`${
                                getStatusColor(ticket.status) === "success"
                                  ? "text-[#2ff528]"
                                  : getStatusColor(ticket.status) === "warning"
                                  ? "text-[#faf738]"
                                  : getStatusColor(ticket.status) === "danger"
                                  ? "text-[#ff1c1c]"
                                  : "text-gray-500"
                              } px-2 py-1`}
                            >
                              {ticket.status}
                            </span>
                          </TableCell>
                          <TableCell>{ticket.expDate}</TableCell>
                          <TableCell>
                            <div className='flex justify-end mt-4 space-x-2'>
                              <Button 
                                className='text-blue-500 hover:text-blue-700 p-1' 
                                onClick={() => openTicketDetails(ticket)} 
                                style={{ width: '30px', height: '30px' }}
                              >
                                <FaEdit style={{ fontSize: '16px' }} />
                              </Button>
                              <Button 
                                className='text-red-500 hover:text-red-700 p-1' 
                                onClick={() => handleDelete(ticket.id)} 
                                style={{ width: '30px', height: '30px' }}
                              >
                                <FaTrashAlt style={{ fontSize: '16px' }} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
              <div className='flex justify-end mt-4 space-x-2'>
                <Pagination showControls total={10} initialPage={1} />
              </div>
            </div>
          </div>

          {selectedTicket && (
            <Modal isOpen={isModalOpen} onClose={closeModal} closeButton className='p-6'>
              <h2 className='text-xl font-bold mb-4'>Ticket Details</h2>
              <p><strong>Title:</strong> {selectedTicket.title}</p>
              <p><strong>Description:</strong> {selectedTicket.description}</p>
              <p><strong>Due Date:</strong> {selectedTicket.dueDate}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>
              <p><strong>Exp Date:</strong> {selectedTicket.expDate}</p>
              <div className='mt-6 flex justify-end space-x-4'>
                <Button style={{ color: '#ff1c1c' }} onClick={closeModal}>
                  <FaTimes className='mr-2' /> Reject
                </Button>
                <Button style={{ color: '#2ff528' }} onClick={closeModal}>
                  <FaCheck className='mr-2' /> Approve
                </Button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketApproval