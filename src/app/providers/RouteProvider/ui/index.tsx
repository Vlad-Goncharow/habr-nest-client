import { router } from '../config'
import { RouterProvider } from 'react-router-dom';

export const RouteProvider = () => {
  return (
    <RouterProvider router={router} />
  )
}
