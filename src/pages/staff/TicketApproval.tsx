import React, { useState, useEffect } from 'react'
import { Modal, Button, Pagination, useDisclosure, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { FaCheck, FaTimes, FaEdit, FaTrashAlt, FaAngleDown } from 'react-icons/fa'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import SidebarStaff from 'src/layouts/staff/SidebarStaff'
import ticketAPI from 'src/apis/ticket.api'
import SearchAndSort from 'src/Components/ticket/SearchAndSort'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Ticket } from 'src/@types/ticket.type'
import { format } from 'date-fns'

const TicketApproval: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [size] = useState(30)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const queryClient = useQueryClient()

  // Mutation for getting all tickets
  const getAllTicketsMutation = useMutation({
    mutationFn: () => ticketAPI.getAllTicketAdmin(),
    onSuccess: (data) => {
      setTickets(data.data.data)
      setLoading(false)
    },
    onError: () => {
      toast.error('Failed to load tickets')
      setLoading(false)
    }
  })

  // Mutation for processing ticket status
  const processTicketMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => ticketAPI.processTicket(id, status),
    onSuccess: () => {
      toast.success('Ticket status updated successfully')
      setIsModalOpen(false)
      getAllTicketsMutation.mutate()
    },
    onError: () => {
      toast.error('Failed to update ticket status')
    }
  })

  useEffect(() => {
    getAllTicketsMutation.mutate()
  }, [])

  const handleSearch = async (title: string, type: string) => {
    setLoading(true)
    try {
      const response = await ticketAPI.getTicketByCateAndName(title, type, page, size)
      setTickets(response.data.data)
    } catch (err) {
      setError('Failed to search tickets')
      toast.error('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTicket = (status: string) => {
    if (!selectedTicket) return
    processTicketMutation.mutate({
      id: selectedTicket.id,
      status: status
    })
  }

  const handleStatusFilter = async (status: string) => {
    setSelectedStatus(status)
    setLoading(true)
    try {
      if (status === 'all') {
        const response = await ticketAPI.getAllTicketAdmin()
        setTickets(response.data.data)
      } else {
        const response = await ticketAPI.getAllTicketAdmin()
        const allTickets = response.data.data
        const filteredTickets = allTickets.filter((ticket) => ticket.status === status)
        setTickets(filteredTickets)
      }
    } catch (error) {
      toast.error('Failed to filter tickets')
      console.error('Filter error:', error)
    } finally {
      setLoading(false)
    }
  }

  const openTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleDelete = async (ticketId: string) => {
    try {
      await ticketAPI.deleteTicketById(ticketId)
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId))
      toast.success('Ticket deleted successfully')
    } catch (err) {
      setError('Failed to delete ticket')
      toast.error('Failed to delete ticket')
    }
  }

  const getStatusColor = (status: string) => {
    const statusColors = {
      APPROVED: 'success',
      PENDING: 'warning',
      REJECTED: 'danger',
      REMOVED: 'default'
    }
    return statusColors[status as keyof typeof statusColors] || 'default'
  }

  const getStatusStyle = (status: string) => {
    const colorMap = {
      success: 'text-[#2ff528]',
      warning: 'text-[#faf738]',
      danger: 'text-[#ff1c1c]',
      default: 'text-gray-500'
    } as const
    return colorMap[getStatusColor(status) as keyof typeof colorMap]
  }

  const getStatusCount = (status: string) => {
    return tickets.filter((ticket) => ticket.status === status).length
  }

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-100'>
        <SidebarStaff />
        <div className='flex flex-col w-full items-center justify-center'>
          <Spinner size='lg' />
        </div>
      </div>
    )
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
              <SearchAndSort onSearch={handleSearch} />
            </div>

            <div className='w-3/4 bg-white p-6 rounded-lg shadow-md'>
              <Table aria-label='Ticket Approval Table'>
                <TableHeader>
                  <TableColumn className='text-lg'>Title</TableColumn>
                  <TableColumn className='text-lg'>Type</TableColumn>
                  <TableColumn className='text-center text-lg'>Price</TableColumn>
                  <TableColumn className='text-center text-lg'>Quantity</TableColumn>
                  <TableColumn className='text-center text-lg'>
                    <div className='flex items-center justify-center gap-2'>
                      Status
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant='light' size='sm' className='min-w-unit-6 h-unit-6'>
                            <FaAngleDown className='text-small' />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label='Status filter'
                          onAction={(key) => handleStatusFilter(key as string)}
                          selectedKeys={new Set([selectedStatus])}
                          selectionMode='single'
                          className='min-w-[120px]'
                        >
                          <DropdownItem key='all'>All ({tickets.length})</DropdownItem>
                          <DropdownItem key='APPROVED'>Approved ({getStatusCount('APPROVED')})</DropdownItem>
                          <DropdownItem key='REJECTED'>Rejected ({getStatusCount('REJECTED')})</DropdownItem>
                          <DropdownItem key='PENDING'>Pending ({getStatusCount('PENDING')})</DropdownItem>
                          <DropdownItem key='REMOVED'>Removed ({getStatusCount('REMOVED')})</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableColumn>
                  <TableColumn className='text-center text-lg'>Exp Date</TableColumn>
                  <TableColumn className='text-center text-lg'>Actions</TableColumn>
                </TableHeader>

                <TableBody>
                  {tickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className='text-center'>
                        No tickets found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.type}</TableCell>
                        <TableCell className='text-center'>{ticket.unitPrice}</TableCell>
                        <TableCell className='text-center'>{ticket.quantity}</TableCell>
                        <TableCell className='text-center'>
                          <span className={`${getStatusStyle(ticket.status)} px-2 py-1`}>{ticket.status}</span>
                        </TableCell>
                        <TableCell className='text-center'>
                          <div className='text-sm'>
                            {format(new Date(ticket.expDate), 'dd MMM yyyy')}
                            <div className='text-xs text-gray-400 mt-0.5'>{format(new Date(ticket.expDate), 'HH:mm:ss')}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex justify-end space-x-2'>
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
              <div className='flex justify-end mt-4'>
                <Pagination showControls total={10} initialPage={1} onChange={(page) => setPage(page)} />
              </div>
            </div>
          </div>

          <Modal
            backdrop='opaque'
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            placement='center'
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut'
                  }
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: 'easeIn'
                  }
                }
              }
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>
                    <h2 className='text-xl font-bold'>Update Ticket Status</h2>
                  </ModalHeader>
                  <ModalBody>
                    {selectedTicket && (
                      <div className='space-y-4'>
                        <div>
                          <p className='text-gray-600'>Ticket ID:</p>
                          <p className='font-medium'>{selectedTicket.id}</p>
                        </div>
                        <div>
                          <p className='text-gray-600'>Current Status:</p>
                          <span className={`${getStatusStyle(selectedTicket.status)} font-medium`}>{selectedTicket.status}</span>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={() => handleUpdateTicket('REJECTED')} isLoading={processTicketMutation.isPending}>
                      <FaTimes className='mr-2' /> Reject
                    </Button>
                    <Button color='success' onPress={() => handleUpdateTicket('APPROVED')} isLoading={processTicketMutation.isPending}>
                      <FaCheck className='mr-2' /> Approve
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default TicketApproval
