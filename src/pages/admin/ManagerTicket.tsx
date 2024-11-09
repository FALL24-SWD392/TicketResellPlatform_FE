import { useState, useEffect } from 'react';
import SidebarAdmin from 'src/layouts/admin/SidebarAdmin';
import authAPI from 'src/apis/auth.api';
import { useMutation } from '@tanstack/react-query';
import { ListBaseResponse } from 'src/@types/response';
import TicketLists from 'src/Components/users/TicketLists';
import { TicketList } from 'src/@types/ticket.type';
import ticketAPI from 'src/apis/ticket.api';


function ManagerTicket() {
  const [tickets, setTickets] = useState<ListBaseResponse<TicketList>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: [],
  });

  const getAllTicketMutation = useMutation({
    mutationKey: ['getTickets'],
    mutationFn: () => ticketAPI.getAllTicketAdmin(),
    onSuccess: (data) => {
      console.log(data.data)
      setTickets(data.data)
    },
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    getAllTicketMutation.mutate();
  }, []);

  const handleDeleteTicket = (id: string) => {
    console.log('Delete ticket:', id);
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SidebarAdmin />
      <div className='flex-1 p-6 ml-64'>
        <h1 className='text-3xl font-bold mb-6'>Ticket List</h1>
        <div className='p-4 -ml-20'>
          <TicketLists 
            tickets={tickets.data} 
            onDeleteTicket={handleDeleteTicket}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagerTicket;