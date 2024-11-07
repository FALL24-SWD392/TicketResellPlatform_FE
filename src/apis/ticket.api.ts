
import { CreateTicket, Ticket, TicketList } from './../@types/ticket.type'
import http from 'src/utils/http'
import { ItemBaseResponse, ListBaseResponse } from 'src/@types/response'

const ticketAPI = {
  getAllTicket: ({page, size} : {page: number, size: number}) =>
    http.get<ListBaseResponse<Ticket>>(
      `api/tickets?category=ALL&page=${page}&size=${size}&name`
    ),
  getAllTicketAdmin: () => http.get<ListBaseResponse<Ticket>>("api/tickets/admin"),
  getTicketById: (id: string) => http.get<ItemBaseResponse<Ticket>>(`api/tickets/${id}`),
  createTicket: (body: CreateTicket) => http.post<ItemBaseResponse<TicketList>>(`api/tickets`, body),
  getTicketByCateAndName: (name: string , type: string) => http.get<ListBaseResponse<ReportList>>(`api/tickets?title=pied&type=VOUCHER&page=1&size=20&direction=ASC`),
  deleteTicketById: (id: string) => http.delete<ListBaseResponse<{}>>(`api/tickets?id=${id}`),
  getCategory: () => http.get<ListBaseResponse<Ticket>>("api/tickets/categories"),
  
}

export default ticketAPI
