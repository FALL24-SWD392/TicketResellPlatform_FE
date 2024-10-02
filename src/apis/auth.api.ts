import { User } from './../@types/users.type'
import { SuccessResponse } from './../@types/utils.type'
import http from '../utils/http'
import { FormData } from 'src/pages/Login'
const authAPI = {
  login: (body: FormData) =>
    http.post<
      SuccessResponse<{
        result: { access_token: string; refresh_token: string }
        // user: User
        // listEvent: Array<{ _id: string; ticketId: string; user_id: string }>
      }>
    >('/api/auth/login', body),
  logout: (body: { refresh_token: string }) => http.post('/users/logout', body)
}
export default authAPI