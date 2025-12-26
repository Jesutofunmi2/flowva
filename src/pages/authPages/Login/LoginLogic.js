import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";

const LoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

   const login = async () => {
    setIsLogging(true);
    setErrorMessage(null);

    try {
      const res = await callSupabase((sb) =>
        sb.auth.signInWithPassword({ email, password })
      );

      const refreshToken =
        res?.data?.session?.refresh_token ?? res?.data?.refresh_token ?? null;
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err?.message || "Login failed");
    } finally {
      setIsLogging(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLogging(true);
    setErrorMessage(null);
    try {
      const res = await callSupabase((sb) =>
        sb.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin + "/dashboard" },
        })
      );

      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      setErrorMessage(err?.message || "Google sign in failed");
    } finally {
      setIsLogging(false);
    }
  };
  return {
    email,
    password,
    login,
    setPassword,
    setEmail,
    navigate,
    isLogging,
    errorMessage,
    signInWithGoogle
  };
};
export default LoginLogic;
