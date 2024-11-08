import { ItemBaseResponse } from "src/@types/response";
import { MyMembership, UserProfile } from "src/@types/users.type";
import http from "src/utils/http";

const userAPI ={
    getMe: () => http.get<ItemBaseResponse<UserProfile>>('api/users/myInfo'),
    updateProfile: (body: {avatar: string}) => http.put<ItemBaseResponse<UserProfile>>('api/users/myInfo', body),
    getMembership: () => http.get<ItemBaseResponse<MyMembership>>('api/tickets/user-membership'),
}
export default userAPI;