// import { Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import OnboardingGuardLogic from "./OnboardingGuardLogic";

export const OnboardingGuard = () => {
  const { grantAccess } = OnboardingGuardLogic();

  return <>{grantAccess && <Outlet />}</>;
};
