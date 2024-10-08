import { SuccessResponse } from './../@types/utils.type'
import http from '../utils/http'
import { FormData } from 'src/pages/Login'
const authAPI = {
  login: (body: FormData) =>
    http.post<
      SuccessResponse<{
        data: { access_token: string; refresh_token: string }
      }>
    >('/auth/login', body),
  logout: (body: string) => http.post('/auth/logout', body)
}
export default authAPI