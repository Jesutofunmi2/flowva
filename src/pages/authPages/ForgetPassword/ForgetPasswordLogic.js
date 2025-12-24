import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordLogic = () => {
  const [email, setEmail] = useState("");
  const [isReseting, setIsReseting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

 const forgetPassword = async () => {
  setErrorMessage(null);
  const normalized = (typeof email === "string" ? email : String(email || "")).trim().toLowerCase();
  if (!normalized) { setErrorMessage("Please enter a valid email"); return; }

  setIsReseting(true);
  const redirect = `${window.location.origin}/forget-password/callback`;
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/recover`;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ email: normalized, redirect_to: redirect }),
    });
    const body = await res.json();
    if (!res.ok) {
      setErrorMessage(body?.error_description ?? body?.error ?? "Failed to send reset email");
    } else {
      setSuccessMessage("We've sent you a password reset link. If your email is registered, it should arrive shortly.");
    }
  } catch (err) {
    setErrorMessage(err?.message || "Failed to send reset email");
  } finally {
    setIsReseting(false);
  }
};

  return { email, setEmail, forgetPassword, isReseting, errorMessage, successMessage, navigate };
};

export default ResetPasswordLogic;