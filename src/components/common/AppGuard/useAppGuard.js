import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUrlQuerysection } from "../../../helpers";
import { pathConstants } from "../../../routes/pathContants";
import { supabase } from "../../../hooks/supabaseClient";

const useAppGuard = () => {
  const [grantAccess, setGrantAccess] = useState(() => !!localStorage.getItem("refreshToken"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const hasSession = !!data?.session;
        if (!mounted) return;
        setGrantAccess(hasSession);
        if (!hasSession) {
          localStorage.setItem("nextRoute", location.pathname + getUrlQuerysection());
          navigate(pathConstants.LOGIN);
        }
      } catch {
        if (!mounted) return;
        setGrantAccess(false);
        localStorage.setItem("nextRoute", location.pathname + getUrlQuerysection());
        navigate(pathConstants.LOGIN);
      }
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const hasSession = !!session?.access_token || !!session?.user;
      setGrantAccess(hasSession);
      if (!hasSession) {
        localStorage.setItem("nextRoute", location.pathname + getUrlQuerysection());
        navigate(pathConstants.LOGIN);
      }
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [navigate, location]);

  return { grantAccess };
};

export default useAppGuard;