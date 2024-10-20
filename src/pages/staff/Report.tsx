import { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Button } from '@nextui-org/react';
import { AiOutlineEye } from 'react-icons/ai';
import SidebarStaff from 'src/layouts/staff/SidebarStaff';

const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReportDetails = () => {
    console.log('Opening modal...');  // Kiểm tra sự kiện click
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SidebarStaff />
      <div className='flex-1 p-6 ml-64'>
        <h1 className='text-3xl font-bold mb-6'>User Reports</h1>

        {/* Filter Section */}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search by reporter or reported user'
            className='border border-gray-300 rounded p-2 mr-4'
          />
        </div>

        {/* Reports Table */}
        <div className='p-4'>
          <Table aria-label='User Reports Table'>
            <TableHeader>
              <TableColumn>Reporter</TableColumn>
              <TableColumn>Reported User</TableColumn>
              <TableColumn>Content</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Nguyen Van A</TableCell>
                <TableCell>Tran B</TableCell>
                <TableCell>Vi phạm quy tắc cộng đồng</TableCell>
                <TableCell>2024-10-15</TableCell>
                <TableCell>
                  <span className='px-2 py-1 rounded bg-yellow-500 text-white'>Pending</span>
                </TableCell>
                <TableCell>
                  <button className='text-blue-500 flex items-center' onClick={openReportDetails}>
                    <AiOutlineEye className='mr-2' /> View
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Report Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} closeButton className='p-6'>
        <h2 className='text-xl font-bold mb-4'>Report Details</h2>
        <p><strong>Reporter:</strong> Nguyen Van A</p>
        <p><strong>Reported User:</strong> Tran B</p>
        <p><strong>Content:</strong> Vi phạm quy tắc cộng đồng</p>
        <p><strong>Date:</strong> 2024-10-15</p>

        {/* Action Buttons */}
        <div className='mt-6 flex justify-end'>
          <Button color='danger' onClick={closeModal} className='mr-4'>Reject</Button>
          <Button color='success' onClick={closeModal}>Approve</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Report;
