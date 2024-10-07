import { TicketList } from './../@types/ticket.type'
import { TicketListConfig } from 'src/@types/ticket.type'
import { UserList } from 'src/@types/users.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const ticketAPI = {
  getAllTicket: (params: Pick<UserList, 'sub'> & { page: number; limit: number }) =>
    http.get<SuccessResponse<{ tickets: TicketList[]; paginate: { size?: string; totalSize?: string; page?: string; totalPage?: string } }>>(
      '/ticket/view-all-ticket',
      { params }
    )
}

export default ticketAPI
