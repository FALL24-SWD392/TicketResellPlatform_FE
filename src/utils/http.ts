import axios, { AxiosError, AxiosInstance } from 'axios'
import { clearLocalStorage, getAccessTokenFromLS, setTokenToLS, setProfileToLS, getRefreshTokenFromLS } from './auth'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { ErrorResponse, SuccessResponse } from 'src/@types/utils.type'
import { isAxiosErrorJWTExpired, isUnAuthorized } from './utils'
import { User } from 'src/@types/users.type'
//
//https://ticketresellplatform-nodered.onrender.com/
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshTokenRequest: Promise<string> | null
  private refreshToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshTokenRequest = null
    this.refreshToken = getRefreshTokenFromLS()
    ;(this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })),
      this.instance.interceptors.request.use(
        (config) => {
          this.accessToken = this.accessToken ? this.accessToken : getAccessTokenFromLS()
          if (this.accessToken) {
            config.headers.Authorization = `Bearer ${this.accessToken}`
            return config
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    this.instance.interceptors.response.use(
      (response) => {
        const endPoint = response.config.url?.split('/').pop()
        if (endPoint === 'login') {
          this.accessToken = response.data.data.accessToken
          this.refreshToken = response.data.data.refreshToken
          setTokenToLS(this.accessToken, this.refreshToken)
          const user: User = jwtDecode(this.accessToken)
          if (user && user.id && user.email) { // Check if User has necessary data
            setProfileToLS(user)
          } else {
            console.error('Invalid user data:', user)
          }
        } else if (endPoint === 'logout') {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        //nếu là lỗi unprocessable entity hoặc unauthorized thì không hiện toast
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }

        if (isUnAuthorized<ErrorResponse<{}>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          if (isAxiosErrorJWTExpired(error) && config.url != '/auth/access-token') {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token }
              })
            })
          }
          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          // window.location.reload()
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<SuccessResponse<{ access_token: string; refresh_token: string }>>('/auth/access-token', {
        token: this.refreshToken
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data.data
        setTokenToLS(access_token, refresh_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}
const http = new Http().instance;

export default http
