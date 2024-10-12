import { SuccessResponse } from './../@types/utils.type'
import http from '../utils/http'
import { FormData } from 'src/pages/Login'
import { ListBaseResponse } from 'src/@types/response'
import { RegisterSchema } from 'src/utils/rules';
const authAPI = {
  login: (body: FormData) =>
    http.post<
      ListBaseResponse<{
        data: { access_token: string; refresh_token: string }
        message: string
      }>
    >('api/auth/login', body),
  register: (body: Omit<RegisterSchema, 'confirmPassword'>) => http.post<ListBaseResponse<{}>>('api/auth/register', body),
  logout: (body: string) => http.post<ListBaseResponse<{message: string}>>('api/auth/logout', body)
}
export default authAPI