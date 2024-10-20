import { Navigate, Route, Routes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import AdminPage from 'src/pages/admin/AdminPage'
import { Home, LoginPage, ProfilePage, Register, StaffPage, Userlist } from 'src/pages'
// import path from "path";
import Report from 'src/pages/staff/Report'
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
  }
  
]

const authenicatedRoutes: RouteType[] = [
  {
    path: '/me',
    element: <></> //Profile
  }
  
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
