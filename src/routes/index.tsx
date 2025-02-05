import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import EmailFunnelPage from '../pages/dashboard/email-funnel';
import PrivateRoute from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard/email-funnel',
    element: (
      <PrivateRoute>
        <EmailFunnelPage />
      </PrivateRoute>
    )
  }
]); 