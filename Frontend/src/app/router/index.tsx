import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthPage } from '@/features/auth/AuthPage';
import { AppProvidersInner } from '@/app/providers';
import { ROUTES } from '@/constants/app.constants';

const RootLayout = () => (
  <AppProvidersInner>
    <Outlet />
  </AppProvidersInner>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace />,
      },
      {
        path: ROUTES.LOGIN,
        element: <AuthPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <AuthPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <Navigate to={ROUTES.LOGIN} replace />,
      },
    ],
  },
]);