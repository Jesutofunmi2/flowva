import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";
import { pathConstants } from "../../../routes/pathContants";

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
      const { data, error } = await callSupabase((sb) =>
        sb.from("candidates").select("*").eq("username", email).limit(1)
      );

      if (error) throw error;

      const candidate = data;

      if (!candidate) {
        throw new Error("Invalid username or password");
      }

      if (String(candidate.password).trim() !== String(password).trim()) {
        throw new Error("Invalid  password");
      }
      localStorage.setItem("role", "candidate");
      localStorage.setItem("candidate_id", candidate.id);

      navigate(pathConstants.CANDIDATE_DASHBOARD, { replace: true });
    } catch (err) {
      setErrorMessage(err?.message || "Login failed");
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
  };
};
export default LoginLogic;
