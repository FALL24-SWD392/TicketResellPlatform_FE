
import { Ticket } from './../@types/ticket.type'
import http from 'src/utils/http'
import { ListBaseResponse } from 'src/@types/response'

const ticketAPI = {
  getAllTicket: ({page, size} : {page: number, size: number}) =>
    http.get<ListBaseResponse<Ticket>>(
      `/tickets?page=${page}&size=${size}`
    )
}

export default ticketAPI
