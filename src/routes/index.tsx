import { Navigate, Route, Routes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import AdminPage from 'src/pages/admin/AdminPage'
import {
  ChangePassword,
  Chat,
  CreateTicketPage,
  Home,
  LoginPage,
  ManageMyTicketPage,
  ProfilePage,
  Register,
  ResetPassword,
  StaffPage,
  TicketApproval,
  TicketDetailPage,
  Userlist,
  YourTicket
} from 'src/pages'
// import path from "path";
import Report from 'src/pages/staff/Report'
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage'
import BlogPage from 'src/pages/BlogPage'
import ManagerUsers from 'src/pages/admin/ManagerUser'
import ManagerTicket from 'src/pages/admin/ManagerTicket'
import Subscriptions from 'src/pages/Subscriptions'
import Transactions from 'src/pages/admin/Transactions'
import ViewAllTicketPage from 'src/pages/ViewAllTicketPage'
import FailPage from 'src/pages/error/FailPage'
import SuccessPage from 'src/pages/error/SuccessPage'
import UserListForStaff from 'src/pages/staff/Userlist'
import TransactionsForStaff from 'src/pages/staff/TransactionForStaff'

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
    path: '/staff',
    element: <StaffPage />
  },
  {
    path: '/report',
    element: <Report />
  },
  {
    path: '/user-list',
    element: <Userlist />
  },
  {
    path: '/user-list-staff',
    element: <UserListForStaff />
  },
  {
    path: '/staff/transaction',
    element: <TransactionsForStaff />
  },
  {
    path: '/ticketApproval',
    element: <TicketApproval />
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
  },
  {
    path: '/blog-page',
    element: <BlogPage />
  },
  {
    path: '/view-all-ticket',
    element: <ViewAllTicketPage />
  },
  {
    path: '/subscriptions',
    element: <Subscriptions />
  },
  {
    path: '/fail',
    element: <FailPage />
  },
  {
    path: '/success',
    element: <SuccessPage />
  },
]

const authenicatedRoutes: RouteType[] = [
  {
    path: '/me/*',
    element: <ProfilePage /> //Profile
  },
  {
    path: '/create-ticket',
    element: <CreateTicketPage />
  },
  {
    path: '/chat/:id',
    element: <Chat />
  },
  {
    path: '/chat',
    element: <Chat />
  },
  {
    path: '/my-ticket',
    element: <YourTicket />
  },
  {
    path: '/manage-my-ticket/:id',
    element: <ManageMyTicketPage />
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
  {
    path: '/manager-tickets',
    element: <ManagerTicket />
  },
  {
    path: '/transactions',
    element: <Transactions />
  }
]
const staffRoutes: RouteType[] = [
  {
    path: '/staff',
    element: <StaffPage />
  }
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
  const router = [
    ...publicRoutes,
    ...(isAuthenticated ? authenicatedRoutes : unAuthenticatedRoute),
    ...(['ADMIN'].includes(user.scope) ? adminRoutes : []),
    ...(['STAFF'].includes(user.scope) ? staffRoutes : []),

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
