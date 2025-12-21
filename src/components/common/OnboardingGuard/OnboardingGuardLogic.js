import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "../../../routes/pathContants";

const OnboardingGuardLogic = () => {
  const [grantAccess, setGrantAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("refreshToken"))
      navigate(pathConstants.DASHBOARD);
    setGrantAccess(true);
  }, []);
  return { grantAccess };
};

export default OnboardingGuardLogic;
