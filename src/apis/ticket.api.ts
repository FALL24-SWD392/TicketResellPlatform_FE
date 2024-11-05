
import { CreateTicket, Ticket } from './../@types/ticket.type'
import http from 'src/utils/http'
import { ItemBaseResponse, ListBaseResponse } from 'src/@types/response'

const ticketAPI = {
  getAllTicket: ({page, size} : {page: number, size: number}) =>
    http.get<ListBaseResponse<Ticket>>(
      `api/tickets?category=ALL&page=${page}&size=${size}&name`
    ),
  getTicketById: (id: string) => http.get<ItemBaseResponse<Ticket>>(`api/tickets/${id}`),
  createTicket: (body: CreateTicket) => http.post<ItemBaseResponse<Ticket>>(`api/tickets`, body)
}

export default ticketAPI
