import { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Button,
  Spinner,
  Link,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  ChipProps
} from '@nextui-org/react'
import { AiOutlineEye } from 'react-icons/ai'
import SidebarStaff from 'src/layouts/staff/SidebarStaff'
import reportAPI from 'src/apis/report.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ListBaseResponse } from 'src/@types/response'
import { Report as ReportType } from 'src/@types/report.type'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

// Define the status color map for Chip component
const statusColorMap: Record<string, ChipProps['color']> = {
  APPROVED: 'success',
  REJECTED: 'danger',
  PENDING: 'warning'
}

const Report = () => {
  const [reports, setReports] = useState<ListBaseResponse<ReportType>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: [] // Ensure `data` is initialized as an empty array
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const queryClient = useQueryClient()

  // Mutation for getting all reports
  const getAllReportMutation = useMutation({
    mutationFn: () => reportAPI.getAllReport({ page: 1, size: 10 }),
    onSuccess: (data) => {
      setReports(data.data)
      setIsLoading(false)
    },
    onError: () => {
      toast.error('Failed to load reports')
      setIsLoading(false)
    }
  })

  // Mutation for updating report status
  const updateReportMutation = useMutation({
    mutationFn: (data: { id: string; status: 'APPROVED' | 'REJECTED' }) => reportAPI.updateReport(data),
    onSuccess: () => {
      toast.success('Status updated successfully')
      getAllReportMutation.mutate()
    },
    onError: () => {
      toast.error('Failed to update status')
    }
  })

  useEffect(() => {
    getAllReportMutation.mutate()
  }, [])

  // Handle report status update
  const handleUpdateReport = (status: 'APPROVED' | 'REJECTED') => {
    if (!selectedReport) return
    updateReportMutation.mutate({
      id: selectedReport.id,
      status: status
    })
  }

  // Render the status with corresponding color
  const renderStatus = (status: string) => {
    const statusColor = statusColorMap[status as keyof typeof statusColorMap]

    return (
      <Chip color={statusColor} className='text-sm font-semibold'>
        {status}
      </Chip>
    )
  }

  if (isLoading) {
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
      <div className='flex-1 p-8 ml-64'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h1 className='text-2xl font-bold mb-6'>Reports Management</h1>

          <Table aria-label='Reports table'>
            <TableHeader>
              <TableColumn>REPORTER</TableColumn>
              <TableColumn>REPORTED</TableColumn>
              <TableColumn>TICKET NAME</TableColumn>
              <TableColumn>DESCRIPTION</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {(reports.data || []).map(
                (
                  report // Ensure `reports.data` is always an array
                ) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.reporterName}</TableCell>
                    <TableCell>{report.reportedName}</TableCell>
                    <TableCell>
                      <Link href={`/ticket-detail/${report.ticketId}`}>
                        <a className='text-blue-500 hover:underline'>{report.ticketName}</a>
                      </Link>
                    </TableCell>
                    <TableCell>{report.description}</TableCell>

                    <TableCell>{renderStatus(report.status)}</TableCell>
                    <TableCell>{dayjs(report.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell>
                      {report.status === 'PENDING' && (
                        <>
                          <Button
                            onClick={() => {
                              setSelectedReport(report)
                              handleUpdateReport('APPROVED')
                            }}
                            className='text-green-500 flex items-center hover:text-green-700'
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedReport(report)
                              handleUpdateReport('REJECTED')
                            }}
                            className='text-red-500 flex items-center hover:text-red-700'
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>

        {/* Modal for updating report status */}
        <Modal
          backdrop='opaque'
          isOpen={isOpen}
          onOpenChange={onOpenChange}
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
                  <h2 className='text-xl font-bold'>Update Report Status</h2>
                </ModalHeader>
                <ModalBody>
                  {selectedReport && (
                    <div className='space-y-4'>
                      <div>
                        <p className='text-gray-600'>Report ID:</p>
                        <p className='font-medium'>{selectedReport.id}</p>
                      </div>
                      <div>
                        <p className='text-gray-600'>Current Status:</p>
                        <div className='mt-1'>{renderStatus(selectedReport.status)}</div>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='flat' onPress={() => handleUpdateReport('REJECTED')} isLoading={updateReportMutation.isPending}>
                    Reject
                  </Button>
                  <Button color='success' onPress={() => handleUpdateReport('APPROVED')} isLoading={updateReportMutation.isPending}>
                    Approve
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default Report
