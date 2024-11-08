import { User } from 'src/@types/users.type'

export const setTokenToLS = (
  accessToken: string,
  refreshToken: string
): void => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const clearLocalStorage = (): void => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('profile')
  localStorage.removeItem('refreshToken')
}

export const getAccessTokenFromLS = (): string =>
  localStorage.getItem('accessToken') || ''

export const getRefreshTokenFromLS = (): string =>
  localStorage.getItem('refreshToken') || ''

export const getProfileFormLS = (): User | null => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const setProfileToLS = (profile: User): void => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getIsStaffFormLs = (): string => {
  const isStaff = localStorage.getItem('isStaff')
  return isStaff ? JSON.parse(isStaff) : ''
}

export const setIsStaffToLS = (isStaff: boolean): void => {
  localStorage.setItem('isStaff', JSON.stringify(isStaff))
}

export const setTicketIdToLS = (ticketId: string): void => {
  localStorage.setItem('ticketId', ticketId)
}

export const getTicketIdFromLS = (): string =>
  localStorage.getItem('ticketId') || ''

export const clearTicketIdFromLS = (): void => {
  localStorage.removeItem('ticketId')
}
