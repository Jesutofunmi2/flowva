import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";

const SignupLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const ref = new URLSearchParams(window.location.search).get('ref');

 const signup = async () => {
    setErrorMessage(null);
    setIsSigning(true);
    try {
      if (ref) localStorage.setItem("referral", ref);
      await callSupabase((sb) =>
        sb.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })
      );

      setMessage("Check your email for the confirmation link to complete signup");
    } catch (err) {
      setErrorMessage(err?.message || "Failed to send confirmation link");
    } finally {
      setIsSigning(false);
    }
  };

  const signInWithGoogle = async () => {
    setErrorMessage(null);
    try {
      if (ref) localStorage.setItem("referral", ref);
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
    }
  };

  return {
    email,
    password,
    message,
    confirmPassword,
    signup,
    setPassword,
    setEmail,
    setConfirmPassword,
    navigate,
    signInWithGoogle,
    isSigning,
    errorMessage,
  };
};
export default SignupLogic;
