import { TicketList } from './../@types/ticket.type'
import { TicketListConfig } from 'src/@types/ticket.type'
import { UserList } from 'src/@types/users.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const ticketAPI = {
  getAllTicket: () =>
    http.get<SuccessResponse<{data: TicketList, message: string}>>(
      '/tickets/view-all-ticket'
    )
}

export default ticketAPI
