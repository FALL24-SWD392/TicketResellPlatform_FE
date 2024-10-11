
import { Ticket } from './../@types/ticket.type'
import http from 'src/utils/http'
import { ListBaseResponse } from 'src/@types/response'

const ticketAPI = {
  getAllTicket: () =>
    http.get<ListBaseResponse<Ticket>>(
      '/tickets'
    )
}

export default ticketAPI
