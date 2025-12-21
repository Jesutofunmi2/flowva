import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../hooks/supabaseClient";

const useResetPasswordCallback = () => {
  const navigate = useNavigate();
  const [isReseting, setIsReseting] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSessionFromUrl().then(({ error }) => {
      setIsReseting(false);
      if (error) {
        setError(error.message);
      }
    });
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsReseting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        setError(error.message);
      } else {
        navigate("/login");
      }
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
