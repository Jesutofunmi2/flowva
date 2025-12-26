import { pathConstants } from "./pathContants";

import { Navigate, Outlet } from "react-router-dom";
import Error404 from "../pages/ErrorPages/Error404";
import AuthPages from "../pages/authPages";
import AppPages from "../pages/appPages";

import { AppGuard, OnboardingGuard } from "../components/common";
import AppLayout from "../layouts/AppLayout";

const useGetRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Navigate to={pathConstants.LOGIN} replace />,
    },

    {
      element: <OnboardingGuard />,
      children: [
        {
          path: pathConstants.LOGIN,
          element: <AuthPages.Login />,
        },
        {
          path: pathConstants.SIGNUP,
          element: <AuthPages.Signup />,
        },
        {
          path: pathConstants.RESET_PASSWORD,
          element: <AuthPages.ForgetPassword />,
        },
        {
          path: pathConstants.AUTH_CALLBACK,
          element: <AuthPages.AuthCallback />,
        },
        {
          path: pathConstants.RESET_PASSWORD_CALLBACK,
          element: <AuthPages.ResetPasswordCallback />,
        },
      ],
    },

    {
      element: (
        <AppGuard>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </AppGuard>
      ),
      children: [
        {
          path: pathConstants.DASHBOARD,
          element: <AppPages.Dashboard />,
        },
        {
          path: pathConstants.REWARDS,
          element: <AppPages.RewardHub />,
        },
      ],
    },

    { path: "*", element: <Error404 /> },
  ];

  return routes;
};

export default useGetRoutes;
