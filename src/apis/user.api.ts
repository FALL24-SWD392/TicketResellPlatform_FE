import { TicketList, UpdateTicket } from './../@types/ticket.type';
import { ItemBaseResponse, ListBaseResponse } from "src/@types/response";
import { MyMembership, UserProfile } from "src/@types/users.type";
import http from "src/utils/http";

const userAPI ={
    getMe: () => http.get<ItemBaseResponse<UserProfile>>('api/users/myInfo'),
    updateProfile: (body: {avatar: string}) => http.put<ItemBaseResponse<UserProfile>>('api/users/myInfo', body),
    getMembership: () => http.get<ItemBaseResponse<MyMembership>>('api/tickets/user-membership'),
    getMyTickets: (userId:string, page: number, size: number) => http.get<ListBaseResponse<TicketList>>(`api/tickets/user?userId=${userId}&size=${size}&page=${page}&direction=DESC&properties=createdAt`),
    updateMyTicket: (ticketId: string, body: UpdateTicket) => http.put<ItemBaseResponse<TicketList>>(`api/tickets/${ticketId}`, body)
}
export default userAPI;