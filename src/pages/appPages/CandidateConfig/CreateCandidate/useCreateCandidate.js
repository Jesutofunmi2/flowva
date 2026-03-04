import React, {useState} from 'react'
import { callSupabase } from "../../../../helpers/supabaseWrapper";

const useCreateCandidate = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const createUser = async () => {
    try {
      setIsCreating(true);
      setErrorMessage(null);

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // 🔥 Generate internal email
      const fakeEmail = `${username}@school.local`;

      // ⚠️ IMPORTANT:
      // This only works if using admin API (server-side)
      const { data, error } = await callSupabase((sb) =>
        sb.auth.signUp({
        email: fakeEmail,
        password,
      }));

      if (error) throw error;

      const userId = data.user.id;

      // Insert into profiles
      await callSupabase((sb) =>
        sb.from("profile").insert({
        id: userId,
        username,
        full_name: fullName,
        role: "candidate",
      }));

      // Insert into candidates table
      await callSupabase((sb) =>
        sb.from("candidates").insert({
        user_id: userId,
      }));

      setMessage("Candidate created successfully");
      setUsername("");
      setFullName("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    username,
    setUsername,
    fullName,
    setFullName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    errorMessage,
    isCreating,
    createUser,
  };
}

export default useCreateCandidate