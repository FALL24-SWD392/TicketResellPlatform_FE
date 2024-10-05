import { User } from './../@types/users.type'
import { SuccessResponse } from './../@types/utils.type'
import http from '../utils/http'
import { FormData } from 'src/pages/Login'
const authAPI = {
  login: (body: FormData) =>
    http.post<
      SuccessResponse<{
        data: { access_token: string; refresh_token: string }
        // user: User
        // listEvent: Array<{ _id: string; ticketId: string; user_id: string }>
      }>
    >('/auth/login/system', body),
  // logout: (body: { refresh_token: string }) => http.post('/users/logout', body)
}
export default authAPI