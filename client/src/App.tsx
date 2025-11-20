import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import MainLayout from './layout/MainLayout'
import Profile from './components/Profile'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    },

    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/verify-email',
      element: <VerifyEmail />
    }
  ])
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App
