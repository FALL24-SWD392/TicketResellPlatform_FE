// src/pages/StaffPage.tsx
import SidebarStaff from 'src/layouts/staff/SidebarStaff'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import Chart4ST from 'src/Components/charts/Chart4ST'

const StaffPage = () => {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SidebarStaff />
      <div className='flex-1 p-6 ml-64'>
        {/* Background Overlay */}
        <div className='bg-[#5b39d6] p-4 rounded-lg shadow-lg mb-6'>
          {/* Header */}
          <div className='flex justify-between items-center mb-8' style={{ transform: 'translateY(50px)'}}>
            <h2 className='text-3xl font-bold text-white ml-10'>TickStaff</h2>
            <button className='bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200 mr-10'>Create New </button>
          </div>

          {/* Cards Overview */}
          <div className='grid grid-cols-4 gap-8 mt-8'>
            <div className='bg-[#ffffff] p-6 rounded-lg shadow-md flex items-center' style={{ transform: 'translateY(80px)'}} >
              <div className='bg-purple-100 p-3 rounded-full mr-4'>{/* Icon */}📁</div>
              <div>
                <p className='text-gray-500'>User</p>
                <h2 className='text-2xl font-bold'>18</h2>
                <p>2 Completed</p>
              </div>
            </div>

            <div className='bg-[#ffffff] p-6 rounded-lg shadow-md flex items-center' style={{ transform: 'translateY(80px)'}}>
              <div className='bg-purple-100 p-3 rounded-full mr-4'>{/* Icon */}📝</div>
              <div>
                <p className='text-gray-500'>Reports</p>
                <h2 className='text-2xl font-bold'>132</h2>
                <p>28 Completed</p>
              </div>
            </div>

            <div className='bg-[#ffffff] p-6 rounded-lg shadow-md flex items-center' style={{ transform: 'translateY(80px)'}}>
              <div className='bg-purple-100 p-3 rounded-full mr-4'>{/* Icon */}👥</div>
              <div>
                <p className='text-gray-500'>Transactions</p>
                <h2 className='text-2xl font-bold'>12</h2>
                <p>1 Completed</p>
              </div>
            </div>

            <div className='bg-[#ffffff] p-6 rounded-lg shadow-md flex items-center' style={{ transform: 'translateY(80px)'}}>
              <div className='bg-purple-100 p-3 rounded-full mr-4'>{/* Icon */}📊</div>
              <div>
                <p className='text-gray-500'>Ticket</p>
                <h2 className='text-2xl font-bold'>76%</h2>
                <p>5% Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h3 className='text-lg font-bold mb-4 mt-10'>Active Projects</h3>
          <Table aria-label='Active Projects Table' className='w-full'>
            <TableHeader>
              <TableColumn>PROJECT NAME</TableColumn>
              <TableColumn>HOURS</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>MEMBERS</TableColumn>
              <TableColumn>PROGRESS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key='1'>
                <TableCell>Dropbox Design System</TableCell>
                <TableCell>34</TableCell>
                <TableCell>
                  <span className='bg-yellow-500 text-white px-2 py-1 rounded'>Medium</span>
                </TableCell>
                <TableCell>5 Members</TableCell>
                <TableCell>
                  <div className='bg-gray-200 rounded-full h-2 w-full'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '15%' }}></div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key='2'>
                <TableCell>Slack Team UI Design</TableCell>
                <TableCell>47</TableCell>
                <TableCell>
                  <span className='bg-red-500 text-white px-2 py-1 rounded'>High</span>
                </TableCell>
                <TableCell>5 Members</TableCell>
                <TableCell>
                  <div className='bg-gray-200 rounded-full h-2 w-full'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '35%' }}></div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key='3'>
                <TableCell>GitHub Satellite</TableCell>
                <TableCell>120</TableCell>
                <TableCell>
                  <span className='bg-green-500 text-white px-2 py-1 rounded'>Low</span>
                </TableCell>
                <TableCell>5 Members</TableCell>
                <TableCell>
                  <div className='bg-gray-200 rounded-full h-2 w-full'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '75%' }}></div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key='4'>
                <TableCell>Seller</TableCell>
                <TableCell>1200</TableCell>
                <TableCell>
                  <span className='bg-green-500 text-white px-2 py-1 rounded'>Low</span>
                </TableCell>
                <TableCell>500 Members</TableCell>
                <TableCell>
                  <div className='bg-gray-200 rounded-full h-2 w-full'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '75%' }}></div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className='text-right mt-4 mr-10'>
            <button className='text-blue-500'>View All Projects</button>
          </div>
        </div>
                {/* Teams Section */}
                
                <div className='grid grid-cols-2 gap-6 mt-8'>
                  <Chart4ST/>


          {/* Teams Table */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-bold mb-4'>Teams</h3>
            <Table aria-label='Teams Table' className='w-full'>
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Last Activity</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key='1'>
                  <TableCell>Anita Parmar</TableCell>
                  <TableCell>Front End Developer</TableCell>
                  <TableCell>3 May, 2023</TableCell>
                </TableRow>
                <TableRow key='2'>
                  <TableCell>Jitu Chauhan</TableCell>
                  <TableCell>Project Director</TableCell>
                  <TableCell>Today</TableCell>
                </TableRow>
                <TableRow key='3'>
                  <TableCell>Sandeep Chauhan</TableCell>
                  <TableCell>Full-Stack Developer</TableCell>
                  <TableCell>Yesterday</TableCell>
                </TableRow>
                <TableRow key='4'>
                  <TableCell>Amanda Darnell</TableCell>
                  <TableCell>Account Manager</TableCell>
                  <TableCell>3 May, 2023</TableCell>
                </TableRow>
                <TableRow key='5'>
                  <TableCell>Patricia Murrill</TableCell>
                  <TableCell>Digital Marketer</TableCell>
                  <TableCell>3 May, 2023</TableCell>
                </TableRow>
                <TableRow key='6'>
                  <TableCell>Darshini Nair</TableCell>
                  <TableCell>Front End Developer</TableCell>
                  <TableCell>3 May, 2023</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StaffPage
