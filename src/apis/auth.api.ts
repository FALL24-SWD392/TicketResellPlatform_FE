import { SuccessResponse } from './../@types/utils.type'
import http from '../utils/http'
import { FormData } from 'src/pages/LoginPage'
import {FormDataChange} from "src/pages/ChangePassword"
import { ListBaseResponse } from 'src/@types/response'
import { RegisterSchema } from 'src/utils/rules';
import { FormDataForgot } from 'src/pages/ForgotPasswordPage'
const authAPI = {
  login: (body: FormData) =>
    http.post<
      ListBaseResponse<{
        data: { access_token: string; refresh_token: string }
        message: string
      }>
    >('api/auth/login', body),
  register: (body: Omit<RegisterSchema, 'confirmPassword'>) => http.post<ListBaseResponse<{}>>('api/auth/register', body),
  logout: (body: {token: string}) => http.post<ListBaseResponse<{message: string}>>('api/auth/logout', body),
  
  changePassword: (body: FormDataChange) => http.put<ListBaseResponse<{}>>("api/auth/password/change", body),
  ResetPassword: (body: FormDataChange) => http.put<ListBaseResponse<{}>>("/api/auth/password/reset", body),
  ForgotPassword: (body: FormDataForgot) =>http.put<ListBaseResponse<{}>>('/api/auth/password/forgot', body),
  }
export default authAPI