import { SuccessResponse } from './../@types/utils.type'
import http from '../utils/http'
import { FormData } from 'src/pages/LoginPage'
import { FormDataChange } from 'src/pages/ChangePassword'
import { ItemBaseResponse, ListBaseResponse } from 'src/@types/response'
import { CreateStaffSchema, RegisterSchema } from 'src/utils/rules'
import { FormDataForgot } from 'src/pages/ForgotPasswordPage'
import { SubList, UserList } from 'src/@types/users.type'
import { FormResetPassword } from 'src/pages/ResetPassword'
import { LoginGoogleBody } from 'src/Components/SignInForm'
const authAPI = {
  login: (body: FormData) =>
    http.post<
      ItemBaseResponse<{
        data: { accessToken: string; refreshToken: string }
        message: string
      }>
    >('api/auth/login', body),
  loginGoogle: (body: LoginGoogleBody) =>
    http.post<
      ItemBaseResponse<{
        data: { accessToken: string; refreshToken: string }
        message: string
      }>
    >('api/auth/login/google', body ),
  register: (body: Omit<RegisterSchema, 'confirmPassword'>) => http.post<ListBaseResponse<{}>>('api/auth/register', body),
  logout: (body: { token: string }) => http.post<ListBaseResponse<{ message: string }>>('api/auth/logout', body),

  changePassword: (body: FormDataChange) => http.put<ItemBaseResponse<{}>>('api/auth/password/change', body),
  ResetPassword: (body: FormResetPassword) => http.put<ItemBaseResponse<{}>>('/api/auth/password/reset', body),
  ForgotPassword: (body: FormDataForgot) => http.put<ItemBaseResponse<{}>>('/api/auth/password/forgot', body),

  GetAllUser: () => http.get<ListBaseResponse<UserList>>('api/users?direction=ASC&properties=role&properties=status'),
  GetAllUserForStaff: () => http.get<ListBaseResponse<UserList>>('api/users/staff?direction=ASC&properties=role&properties=status'),
  DeleteUser: (body: { username?: string }) => http.delete<ListBaseResponse<{}>>(`api/users`, { data: body }),
  GetUserByName: (username: string) => http.get<ListBaseResponse<UserList>>(`api/users?search=${username}`),
  CreateUser: (body: CreateStaffSchema) => http.post<ListBaseResponse<{}>>(`api/users`, body),
  GetAllSubscription: () => http.get<ListBaseResponse<SubList>>('api/subscriptions/user?page&size'),
  PaySubscription: ({ subscriptionId }: { subscriptionId: string }) =>
    http.post<ItemBaseResponse<{}>>(`api/subscriptions/purchase-subscription?subscriptionId=${subscriptionId}`),
  GetAllTicketByStatus: (status: string) => http.get<ListBaseResponse<SubList>>(`api/tickets/admin?status=${status}`),
  Gettransaction: () => http.get<ListBaseResponse<{}>>(`api/transactions`)
}
export default authAPI
