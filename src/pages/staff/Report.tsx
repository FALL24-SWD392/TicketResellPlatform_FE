import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Button, Spinner } from '@nextui-org/react';
import { AiOutlineEye } from 'react-icons/ai';
import SidebarStaff from 'src/layouts/staff/SidebarStaff';
import reportAPI from 'src/apis/report.api';
import { useMutation } from '@tanstack/react-query';
import { ListBaseResponse } from 'src/@types/response';
import { Report as ReportType } from 'src/@types/report.type';
import { toast } from 'react-toastify';

const Report = () => {
  const [reports, setReports] = useState<ListBaseResponse<ReportType>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mutation để fetch reports
  const getAllReportMutation = useMutation({
    mutationKey: ['getReports'],
    mutationFn: () => reportAPI.getAllReport({ page: 1, size: 10 }), // Cung cấp page và size
    onSuccess: (data) => {
      setReports(data.data); // Cập nhật dữ liệu
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Failed to fetch reports:', error);
      toast.error('Failed to load reports. Please try again later.');
      setIsLoading(false);
    },
  });

  useEffect(() => {
    // Đảm bảo mutate chỉ gọi một lần khi component mount
    if (isLoading) {
      getAllReportMutation.mutate();
    }
  }, [isLoading]); // Chỉ gọi lại khi trạng thái isLoading là true

  const openReportDetails = () => {
    console.log('Opening modal...');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SidebarStaff />
        <div className="flex flex-col w-full items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-2">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarStaff />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold mb-6">User Reports</h1>

        {/* Filter Section */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by reporter or reported user"
            className="border border-gray-300 rounded p-2 mr-4"
          />
        </div>

        {/* Reports Table */}
        <div className="p-4">
          <Table aria-label="User Reports Table">
            <TableHeader>
              <TableColumn>Reporter</TableColumn>
              <TableColumn>Reported User</TableColumn>
              <TableColumn>Content</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {reports.data.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.reporterId}</TableCell>
                  <TableCell>{report.reportedId}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded ${report.status === 'PENDING' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-blue-500 flex items-center" onClick={openReportDetails}>
                      <AiOutlineEye className="mr-2" /> View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Report Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} closeButton className="p-6">
        <h2 className="text-xl font-bold mb-4">Report Details</h2>
        {/* Render selected report details here */}
        <div className="mt-6 flex justify-end">
          <Button color="danger" onClick={closeModal} className="mr-4">Reject</Button>
          <Button color="success" onClick={closeModal}>Approve</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Report;
