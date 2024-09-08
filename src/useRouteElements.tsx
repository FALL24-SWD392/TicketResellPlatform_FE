import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'path'
import { Home } from './pages/Home'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    }
  ])

  return routeElements
}
export default useRouteElements