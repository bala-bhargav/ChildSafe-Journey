import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ROUTES } from '@/constants/app.constants';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
]);
