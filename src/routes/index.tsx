import { Navigate, Route, Routes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import AdminPage from 'src/pages/admin/AdminPage'
import { ChangePassword, CreateTicketPage, Home, LoginPage, ProfilePage, Register, ResetPassword, StaffPage, TicketApproval, TicketDetailPage, Userlist } from 'src/pages'
// import path from "path";
import Report from 'src/pages/staff/Report'
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage'
import BlogPage from 'src/pages/BlogPage'
import ManagerUsers from 'src/pages/admin/ManagerUser'

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
  {
    path: `/ticket-detail/:id`,
    element: <TicketDetailPage />
  }
  {
    path: '/blog-page',
    element: <BlogPage />
  },
]

const authenicatedRoutes: RouteType[] = [
  {
    path: '/me',
    element: <></> //Profile
  },
  {
    path: '/create-ticket',
    element: <CreateTicketPage/>
  }
  
  
]

const adminRoutes: RouteType[] = [
  {
    path: '/admin',
    element: <AdminPage /> // AdminDashboard
  },
  {
    path: '/manager-users',
    element: <ManagerUsers />
  },

]

const unAuthenticatedRoute: RouteType[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
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
  console.log(user)
  const router = [
    ...publicRoutes,
    ...(isAuthenticated ? authenicatedRoutes : unAuthenticatedRoute),
    ...(['ADMIN', 'STAFF'].includes(user.scope) ? adminRoutes : []),

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
