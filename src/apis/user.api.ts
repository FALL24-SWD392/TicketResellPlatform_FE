import { ItemBaseResponse } from "src/@types/response";
import { UserProfile } from "src/@types/users.type";
import http from "src/utils/http";

const userAPI ={
    getMe: () => http.get<ItemBaseResponse<UserProfile>>('api/users/myInfo'),
    updateProfile: (body: {avatar: string}) => http.put<ItemBaseResponse<UserProfile>>('api/users/myInfo', body)
}
export default userAPI;