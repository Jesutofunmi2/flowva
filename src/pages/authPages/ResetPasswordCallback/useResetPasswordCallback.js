import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";

const useResetPasswordCallback = () => {
  const navigate = useNavigate();
  const [isReseting, setIsReseting] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

 useEffect(() => {
    (async () => {
      try {
        await callSupabase((sb) => sb.auth.getSessionFromUrl());
        setIsReseting(false);
      } catch (err) {
        setIsReseting(false);
        setError(err?.message ?? "Failed to verify session");
      }
    })();
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsReseting(true);
    try {
      await callSupabase((sb) => sb.auth.updateUser({ password: newPassword }));
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Failed to update password");
    } finally {
      setIsReseting(false);
    }
  };
  return {
    isReseting,
    newPassword,
    setNewPassword,
    error,
    resetPassword,
  };
};

export default useResetPasswordCallback;
