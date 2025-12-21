import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../hooks/supabaseClient";

const SignupLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const signup = async () => {
    setErrorMessage(null);
    if (!email) {
      setErrorMessage("Please enter your email");
      return;
    }
    setIsSigning(true);
    try {
      setIsSigning(true);
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setErrorMessage(error.message || "Failed to send magic link");
      } else {
        setMessage(
          "Check your email for the confirmation link to complete signup"
        );
      }
    } catch (err) {
      setErrorMessage(err?.message || "Failed to send confirmation link");
    } finally {
      setIsSigning(false);
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
