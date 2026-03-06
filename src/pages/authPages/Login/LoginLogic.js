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
      const res = await callSupabase((sb) =>
        sb.auth.signInWithPassword({ email, password })
      );

      const refreshToken =
        res?.data?.session?.refresh_token ?? res?.data?.refresh_token ?? null;
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      const session = res?.data?.session;
      const user = session?.user;
      /**
       * ✅ Fetch role
       */
      if (user) {
        const { data: profile } = await callSupabase((sb) =>
          sb.from("profile").select("role").eq("id", user.id).single()
        );

        const role = profile?.role;

        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate(pathConstants.ADMIN_DASHBOARD, { replace: true });
          return;
        }

        if (role === "super_admin") {
          navigate(pathConstants.SUPER_ADMIN_DASHBOARD, { replace: true });
          return;
        }
      }

      /**
       * 2️⃣ Candidate Login (username + password)
       */
      const { data: candidate } = await callSupabase((sb) =>
        sb.from("candidates").select("*").eq("username", email).single()
      );

      if (!candidate) {
        throw new Error("Invalid username or password");
      }

      if (candidate.password !== password) {
        throw new Error("Invalid username or password");
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

  const signInWithGoogle = async () => {
    setIsLogging(true);
    setErrorMessage(null);
    try {
      const res = await callSupabase((sb) =>
        sb.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin + "/admin_dashboard" },
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
    isLogging,
    errorMessage,
    login,
    setPassword,
    setEmail,
    navigate,
    signInWithGoogle,
  };
};
export default LoginLogic;
