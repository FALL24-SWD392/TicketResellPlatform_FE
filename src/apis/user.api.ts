import { MyMembership, MyTransactions, UserProfile } from "src/@types/users.type";
import { ItemBaseResponse, ListBaseResponse } from "src/@types/response";
import { TicketList, UpdateTicket, Tickets} from './../@types/ticket.type';
import http from "src/utils/http";
import { Order, OrderDetail } from "src/@types/order.type";

const userAPI ={
    getMe: () => http.get<ItemBaseResponse<UserProfile>>('api/users/myInfo'),
    updateProfile: (body: {avatar: string}) => http.put<ItemBaseResponse<UserProfile>>('api/users/myInfo', body),
    getMembership: () => http.get<ItemBaseResponse<MyMembership>>('api/tickets/user-membership'),
    getMyTickets: (userId:string, page: number, size: number) => http.get<ListBaseResponse<TicketList>>(`api/tickets/user?userId=${userId}&size=${size}&page=${page}&direction=DESC&properties=createdAt`),
    updateMyTicket: (ticketId: string, body: UpdateTicket) => http.put<ItemBaseResponse<TicketList>>(`api/tickets?id=${ticketId}`, body),
    getTransaction: () => http.get<ListBaseResponse<MyTransactions>>('api/transactions/user'),
    deleteMyTicket: (ticketId: string) => http.delete<ItemBaseResponse<TicketList>>(`api/tickets?id=${ticketId}`),
    getOrderDetail: (orderId: string) => http.get<ItemBaseResponse<OrderDetail>>(`api/orders/details/order?orderId=${orderId}&page=1&size=20&direction=ASC&properties=id`),
    getMyOrder: (userId: string) => http.get<ListBaseResponse<Order>>(`api/orders/user?userId=${userId}&page=1&size=20&direction=ASC&properties=id`)
}
export default userAPI;