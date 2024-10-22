
import { Ticket } from './../@types/ticket.type'
import http from 'src/utils/http'
import { ListBaseResponse } from 'src/@types/response'

const ticketAPI = {
  getAllTicket: ({page, size} : {page: number, size: number}) =>
    http.get<ListBaseResponse<Ticket>>(
      `api/tickets?category=ALL&page=${page}&size=${size}&name`
    )
}

export default ticketAPI
