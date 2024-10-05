import { createContext, useState } from 'react'

type AuthContextType = {
  token: {
    accessToken: string | null
    refreshToken: string | null
  }
  addToken: ({ acessToken, refreshToken }: { acessToken: string; refreshToken: string }) => void
  clearToken: () => void
}

const initalToken = JSON.parse(localStorage.getItem('token') || 'accessToken: null, refreshToken: null')

const AuthContext = createContext<AuthContextType>({
  token: initalToken,
  addToken: () => {},
  clearToken: () => {}
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<{ accessToken: string | null; refreshToken: string | null }>(initalToken)
}
