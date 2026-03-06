import React, { useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "../../../../../routes/pathContants";

const useCreateSubject = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const createSubject = async () => {
    setIsCreating(true);
    // get logged in user
    const { data: sessionData } = await callSupabase((sb) => sb.auth.getUser());

    const userId = sessionData?.user?.id;

    // get admin profile
    const { data: adminProfile } = await callSupabase((sb) =>
      sb.from("profile").select("school_id").eq("id", userId).single()
    );

    const schoolId = adminProfile.school_id;
    setIsCreating(false);

    // create subject
    const { data: newSubject, error } = await callSupabase((sb) =>
      sb
        .from("subjects")
        .insert({
          name,
          school_id: schoolId,
        })
        .select()
        .single()
    );

    console.log("newSubject", newSubject);

    if (error) {
      setErrorMessage("Failed to create subject", error?.message);
    } else {
      setMessage("Subject created successfully");
      navigate(pathConstants.ALL_SUBJECTS);
    }
  };

  return { message, errorMessage, isCreating, name, createSubject, setName };
};

export default useCreateSubject;
