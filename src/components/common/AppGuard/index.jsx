import useAppGuard from "./useAppGuard";

export const AppGuard = ({ children }) => {
  const { grantAccess } = useAppGuard();

  return grantAccess ? children : null;
};
