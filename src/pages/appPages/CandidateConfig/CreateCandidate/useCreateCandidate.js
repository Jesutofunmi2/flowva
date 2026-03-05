import React, {useState} from 'react'
import { callSupabase } from "../../../../helpers/supabaseWrapper";

const useCreateCandidate = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");

  const [message, setMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const createUser = async () => {
  try {
    setIsCreating(true);

    // get logged in user
    const { data: sessionData } = await callSupabase((sb) =>
      sb.auth.getUser()
    );

    const userId = sessionData?.user?.id;

    // get admin profile
    const { data: adminProfile } = await callSupabase((sb) =>
      sb
        .from("profile")
        .select("school_id")
        .eq("id", userId)
        .single()
    );

    const schoolId = adminProfile.school_id;

    // create candidate
    const { data: candidate } = await callSupabase((sb) =>
      sb
        .from("candidates")
        .insert({
          username,
          full_name: fullName,
          password,
          school_id: schoolId,
        })
    );

    setMessage("Candidate created successfully");
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