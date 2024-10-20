import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import SidebarStaff from 'src/layouts/staff/SidebarStaff'

function Userlist() {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SidebarStaff />
      <div className='flex-1 p-6 ml-64'>
        <h1 className='text-3xl font-bold mb-6'>User List</h1>

        {/* Filter Section */}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search by username'
            className='border border-gray-300 rounded p-2 mr-4'
          />
        </div>

        {/* Users Table */}
        <div className='p-4'>
        <Table aria-label='User List Table'>
            <TableHeader>
              <TableColumn>Username</TableColumn>
              <TableColumn>Role</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Nguyen Van A</TableCell>
                <TableCell>Người bán</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tran B</TableCell>
                <TableCell>Người mua</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Le C</TableCell>
                <TableCell>Người bán</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hoang D</TableCell>
                <TableCell>Người mua</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Userlist