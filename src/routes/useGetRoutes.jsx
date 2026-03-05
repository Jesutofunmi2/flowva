import { pathConstants } from "./pathContants";

import { Navigate, Outlet } from "react-router-dom";
import Error404 from "../pages/ErrorPages/Error404";
import AuthPages from "../pages/authPages";
import AppPages from "../pages/appPages";

import { AppGuard, OnboardingGuard } from "../components/common";
import AppLayout from "../layouts/AppLayout";
import { RoleGuard } from "../hooks/roleGuard";

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
          path: pathConstants.SUPER_ADMIN_DASHBOARD,
          element: (
            <RoleGuard allowedRoles={["super_admin"]}>
              <AppPages.SuperAdminDashboard />
            </RoleGuard>
          ),
        },{
          path: pathConstants.CREATE_SCHOOL,
          element: (
            <RoleGuard allowedRoles={["super_admin"]}>
              <AppPages.CreateSchool />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.SUPER_ADMIN_USER,
          element: (
            <RoleGuard allowedRoles={["super_admin"]}>
              <AppPages.SuperAdminUser />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.CLASS,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
              <AppPages.ClassManagement />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.SUBJECT,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
              <AppPages.SubjectManagement />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.CREATE_CLASS,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
              <AppPages.CreateClass />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.ALL_CLASSES,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
              <AppPages.AllClasses />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.ADMIN_DASHBOARD,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
              <AppPages.AdminDashboard />
            </RoleGuard>
          ),
        },
        {
          path: pathConstants.CREATE_ASSESSMENT,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
               <AppPages.CreateAssessment />
            </RoleGuard>
          )
        },
        {
          path: pathConstants.QUESTION,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
               <AppPages.Question />
            </RoleGuard>
          )
        },
        {
          path: pathConstants.EXAMS,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
               <AppPages.Exams />
            </RoleGuard>
          )
        },
        {
          path: pathConstants.CANDIDATE,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
               <AppPages.CandidateConfig />
            </RoleGuard>
          )
        },
        {
          path: pathConstants.CREATE_CANDIDATE,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
               <AppPages.CreateCandidate />
            </RoleGuard>
          )
        },
         {
          path: pathConstants.RESULT,
          element: (
            <RoleGuard allowedRoles={["admin"]}>
               <AppPages.Result />
            </RoleGuard>
          )
        },
        {
          path: pathConstants.CANDIDATE_DASHBOARD,
          element: (
            <RoleGuard allowedRoles={["candidate"]}>
              <AppPages.CandidateDashboard />
            </RoleGuard>
          ),
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
