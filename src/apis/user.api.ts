import { MyMembership, MyTransactions, UserProfile } from "src/@types/users.type";
import { ItemBaseResponse, ListBaseResponse } from "src/@types/response";
import { TicketList, UpdateTicket } from './../@types/ticket.type';
import http from "src/utils/http";

const userAPI ={
    getMe: () => http.get<ItemBaseResponse<UserProfile>>('api/users/myInfo'),
    updateProfile: (body: {avatar: string}) => http.put<ItemBaseResponse<UserProfile>>('api/users/myInfo', body),
    getMembership: () => http.get<ItemBaseResponse<MyMembership>>('api/tickets/user-membership'),
    getMyTickets: (userId:string, page: number, size: number) => http.get<ListBaseResponse<TicketList>>(`api/tickets/user?userId=${userId}&size=${size}&page=${page}&direction=DESC&properties=createdAt`),
    updateMyTicket: (ticketId: string, body: UpdateTicket) => http.put<ItemBaseResponse<TicketList>>(`api/tickets/${ticketId}`, body)
    getTransaction: () => http.get<ListBaseResponse<MyTransactions>>('api/transactions/user'),
}
export default userAPI;