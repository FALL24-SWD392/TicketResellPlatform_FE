import { ItemBaseResponse, ListBaseResponse } from "src/@types/response";
import { MyMembership, MyTransactions, UserProfile } from "src/@types/users.type";
import http from "src/utils/http";

const userAPI ={
    getMe: () => http.get<ItemBaseResponse<UserProfile>>('api/users/myInfo'),
    updateProfile: (body: {avatar: string}) => http.put<ItemBaseResponse<UserProfile>>('api/users/myInfo', body),
    getMembership: () => http.get<ItemBaseResponse<MyMembership>>('api/tickets/user-membership'),
    getTransaction: () => http.get<ListBaseResponse<MyTransactions>>('api/transactions/user'),
}
export default userAPI;