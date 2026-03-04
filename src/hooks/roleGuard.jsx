import useAuthUser from "./useAuthUser";
import { Navigate } from "react-router-dom";

export const RoleGuard = ({ allowedRoles, children }) => {
  const { role, loading } = useAuthUser();

  if (loading) return null;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};