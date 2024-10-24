import { Navigate, Route, Routes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import AdminPage from 'src/pages/admin/AdminPage'
import { ChangePassword, Home, LoginPage, ProfilePage, Register, ResetPassword, StaffPage, TicketApproval, Userlist } from 'src/pages'
// import path from "path";
import Report from 'src/pages/staff/Report'
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage'

type RouteType = {
  path: string
  element: JSX.Element
}

const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: "/staff",
    element: <StaffPage/>
  },
  {
    path: '/report',
    element: <Report/>
  },
  {
    path: '/user-list',
    element: <Userlist/>
  },
  {
    path: '/ticketApproval',
    element: <TicketApproval/>
  },
  {
    path: '/change-password',
    element: <ChangePassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
]

const authenicatedRoutes: RouteType[] = [
  {
    path: '/me',
    element: <></> //Profile
  },
  
  
]

const adminRoutes: RouteType[] = [
  {
    path: '/admin',
    element: <AdminPage /> // AdminDashboard
  }

]

const unAuthenticatedRoute: RouteType[] = [
  {
    path: '/login-page',
    element: <LoginPage />
  },
  {
    path: '/register-page',
    element: <Register />
  },
  {
    path: '/forgot-page',
    element: <ForgotPasswordPage />
  }
]

const Router = () => {
  const { isAuthenticated } = useContext(AppContext)
  const user = JSON.parse(localStorage.getItem('profile') || '{}')
  const router = [
    ...publicRoutes,
    ...(isAuthenticated ? authenicatedRoutes : unAuthenticatedRoute),
    ...(['admin', 'staff'].includes(user.sub) ? adminRoutes : []),

    {
      path: '*',
      element: <Navigate to='/' />
    }
  ]
  return (
    <Routes>
      {router.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default Router
