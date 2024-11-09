import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { MyTransactions } from 'src/@types/users.type'
import dayjs from 'dayjs';
import userAPI from 'src/apis/user.api'

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<MyTransactions[]>([])
  const getAllTransactionsMutation = useMutation({ mutationFn: () => userAPI.getTransaction(), onSuccess: (data) => setTransactions(data?.data.data) })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "FAILED":
        return "danger";
      default:
        return "warning";
    }
  };

  useEffect(() => {
    getAllTransactionsMutation.mutate();
  }, []);

  return (
    <Table aria-label='Order Details Table' style={{ minWidth: '100%', textAlign: 'left' }}>
      <TableHeader>
        <TableColumn className='text-lg'>Order Code</TableColumn>
        <TableColumn className='text-lg'>Status</TableColumn>
        <TableColumn className='text-lg'>Created At</TableColumn>
        <TableColumn className='text-lg'>Updated At</TableColumn>
        <TableColumn className='text-lg'>User Name</TableColumn>
        <TableColumn className='text-lg'>Description</TableColumn>
      </TableHeader>

      <TableBody>
        {transactions.map((transactions) => (
          <TableRow>
            <TableCell>{transactions?.orderCode}</TableCell>
            <TableCell>{transactions?.userName}</TableCell>
            <TableCell>
              <span className="text-teal-700 font-bold">
                {dayjs(transactions.createdAt).format('MM/DD/YYYY HH:mm')}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-teal-700 font-bold">
                {dayjs(transactions.updatedAt).format('MM/DD/YYYY HH:mm')}
              </span>
            </TableCell>
            <TableCell>
            <Chip color={getStatusBadgeClass(transactions.status)} size="sm">
                {transactions.status}
              </Chip>
            </TableCell>
            <TableCell>{transactions?.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TransactionsPage
