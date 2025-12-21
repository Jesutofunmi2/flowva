import { useState } from "react";
import { RequestLoader } from "../../../hooks/context";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../hooks/supabaseClient";

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Login failed");
        setIsLogging(false);
        return;
      }

      const refreshToken = data?.session?.refresh_token ?? data?.refresh_token ?? null;
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      setIsLogging(false);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err?.message || "Unexpected error");
      setIsLogging(false);
    }
  };

 const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });

    if (error) {
      setErrorMessage(error.message || "Google sign in failed");
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    setErrorMessage(err?.message || "Google sign in failed");
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
