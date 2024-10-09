
import { Ticket, TicketList } from './../@types/ticket.type'
import { TicketListConfig } from 'src/@types/ticket.type'
import { UserList } from 'src/@types/users.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'
import { ListBaseResponse } from 'src/@types/response'

const ticketAPI = {
  getAllTicket: () =>
    http.get<ListBaseResponse<Ticket>>(
      '/tickets'
    )
}

export default ticketAPI
