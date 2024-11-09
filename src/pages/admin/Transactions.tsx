import { useState, useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react'
import SidebarAdmin from 'src/layouts/admin/SidebarAdmin'
import authAPI from 'src/apis/auth.api'
import { useQuery } from '@tanstack/react-query'
import { ListBaseResponse } from 'src/@types/response'
import { TransactionList } from 'src/@types/transactions.type'
import { format } from 'date-fns'

function Transactions() {
  const [transactions, setTransactions] = useState<ListBaseResponse<TransactionList>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: []
  })

  const { data, isLoading } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: () => authAPI.Gettransaction()
  })

  useEffect(() => {
    if (data) setTransactions(data.data)
  }, [data])

  const renderStatus = (status: string) => {
    const statusConfig = {
      COMPLETED: {
        bg: 'bg-success-100',
        text: 'text-success',
        border: 'border-success'
      },
      PENDING: {
        bg: 'bg-warning-100',
        text: 'text-warning',
        border: 'border-warning'
      },
      FAILED: {
        bg: 'bg-error-100',
        text: 'text-danger',
        border: 'border-error'
      }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-100'
    }

    return (
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-medium inline-block
        ${config.bg} ${config.text} ${config.border} border`}
      >
        {status}
      </span>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50/50'>
      <SidebarAdmin />
      <div className='flex-1 p-8 ml-65'>
        {' '}
        {/* Adjusted margin here */}
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <div className='flex justify-between items-center mb-8'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold text-gray-800'>Transactions History</h1>
              <p className='text-sm text-gray-500'>Manage and monitor all transactions</p>
            </div>
            <div className='text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-lg'>Total Transactions: {transactions.totalSize || 0}</div>
          </div>

          {isLoading ? (
            <div className='flex justify-center items-center h-72'>
              <Spinner size='lg' color='primary' />
            </div>
          ) : (
            <Table aria-label='Transactions Table'>
              <TableHeader>
                <TableColumn className='text-center'>Order Code</TableColumn>
                <TableColumn className='text-center'>User Name</TableColumn>
                <TableColumn className='text-center'>Description</TableColumn>
                <TableColumn className='text-center'>Status</TableColumn>
                <TableColumn className='text-center'>Created At</TableColumn>
                <TableColumn className='text-center'>Updated At</TableColumn>
              </TableHeader>
              <TableBody emptyContent={<div className='text-center py-12 text-gray-500'>No transactions found</div>}>
                {transactions.data.map((transaction) => (
                  <TableRow key={transaction.orderCode}>
                    <TableCell className='text-center'>
                      <span className='font-medium text-gray-700'>{transaction.orderCode}</span>
                    </TableCell>
                    <TableCell className='text-center'>
                      <span className='font-medium text-gray-700'>{transaction.userName}</span>
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='font-medium text-gray-700'>{transaction.description}</div>
                    </TableCell>

                    <TableCell className='text-center'>{renderStatus(transaction.status)}</TableCell>
                    <TableCell className='text-center'>
                      <div className='text-sm'>
                        {format(new Date(transaction.createdAt), 'dd MMM yyyy')}
                        <div className='text-xs text-gray-400 mt-0.5'>{format(new Date(transaction.createdAt), 'HH:mm:ss')}</div>
                      </div>
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='text-sm'>
                        {format(new Date(transaction.updatedAt), 'dd MMM yyyy')}
                        <div className='text-xs text-gray-400 mt-0.5'>{format(new Date(transaction.updatedAt), 'HH:mm:ss')}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Transactions
