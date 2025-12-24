import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      try {
        const { data, error } = await callSupabase((sb) => sb.auth.getSessionFromUrl());
        if (error) {
          console.error("auth callback error:", error);
          navigate("/login");
          return;
        }
        const refreshToken = data?.session?.refresh_token ?? data?.refresh_token ?? null;
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);  
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    handle();
  }, [navigate]);

  return <div>Completing sign-in...</div>;
};

export default AuthCallback;