import React, { useState } from 'react'
import { Modal, Button, Pagination } from '@nextui-org/react'
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import SidebarStaff from 'src/layouts/staff/SidebarStaff'

const TicketApproval: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const tickets = [
    {
      id: 'ABC123',
      title: 'Biscuit fruitcake halvah biscuit wafer cheesecake caramels',
      description: 'Sweet liquorice pie gummies sweet',
      dueDate: '21 MAY 2024',
      approvalStatus: 'Approved',
      approvalDate: '09 FEB 2024'
    },
    {
      id: 'ABC124',
      title: 'Candy gingerbread croissant danish carrot cake',
      description: 'Candy croissant danish',
      dueDate: '23 MAY 2024',
      approvalStatus: 'Awaiting Approval',
      approvalDate: 'Pending'
    },
    {
      id: 'ABC125',
      title: 'Nothing',
      description: 'Candy',
      dueDate: '23 MAY 2024',
      approvalStatus: 'Awaiting Approval',
      approvalDate: 'Reject'
    },
    {
      id: 'ABC126',
      title: 'Candy gingerbread croissant danish carrot cake',
      description: 'Candy croissant danish',
      dueDate: '23 MAY 2024',
      approvalStatus: 'Awaiting Approval',
      approvalDate: 'Pending'
    },
    {
      id: 'ABC127',
      title: 'Candy gingerbread croissant danish carrot cake',
      description: 'Candy croissant danish',
      dueDate: '23 MAY 2024',
      approvalStatus: 'Reject',
      approvalDate: 'Pending'
    }
  ]

  const openTicketDetails = (ticket: any) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  const handleDelete = (ticketId: string) => {
    console.log(`Ticket with ID ${ticketId} deleted`)
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
              <Table aria-label='Ticket Approval Table'>
                <TableHeader>
                  <TableColumn className='text-center text-lg'>Campaign Title</TableColumn>
                  <TableColumn className='text-center text-lg'>Description</TableColumn>
                  <TableColumn className='text-center text-lg'>Due Date</TableColumn>
                  <TableColumn className='text-center text-lg'>Approval Status</TableColumn>
                  <TableColumn className='text-center text-lg'>Approval Date</TableColumn>
                  <TableColumn className='text-center text-lg'>Actions</TableColumn>
                </TableHeader>

                <TableBody>
                  {tickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>No rows to display.</TableCell>
                    </TableRow>
                  ) : (
                    tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.description}</TableCell>
                        <TableCell>{ticket.dueDate}</TableCell>
                        <TableCell>
                          <span className={`${
                            ticket.approvalStatus === 'Approved'
                              ? 'text-[#2ff528]' // Green for Approved
                              : ticket.approvalStatus === 'Awaiting Approval'
                              ? 'text-[#faf738]' // Yellow for Pending
                              : 'text-[#ff1c1c]' // Red for Rejected
                          } px-2 py-1`}>
                            {ticket.approvalStatus}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.approvalDate}</TableCell>
                        <TableCell>
                          <div className='flex justify-end mt-4 space-x-2'>
                            <Button className='text-blue-500 hover:text-blue-700 p-1' onClick={() => openTicketDetails(ticket)} style={{ width: '30px', height: '30px' }}>
                              <FaEdit style={{ fontSize: '16px' }} />
                            </Button>
                            <Button className='text-red-500 hover:text-red-700 p-1' onClick={() => handleDelete(ticket.id)} style={{ width: '30px', height: '30px' }}>
                              <FaTrashAlt style={{ fontSize: '16px' }} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

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
              <p><strong>Approval Status:</strong> {selectedTicket.approvalStatus}</p>
              <p><strong>Approval Date:</strong> {selectedTicket.approvalDate}</p>
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
