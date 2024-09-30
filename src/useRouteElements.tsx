import { useRoutes } from 'react-router-dom'
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