import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Verification from './pages/Verification'
import Home from './pages/Home'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },

    {
      path: '/verification',
      element: <Verification />
    },
    {
      path: '/home',
      element: <Home />
    }
  ])
  return routeElements
}
