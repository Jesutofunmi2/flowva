import React, { useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "../../../../../routes/pathContants";

const useCreateClass = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createClass = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setMessage(null);
      setIsCreating(true);

      // get logged in user
      const { data: sessionData } = await callSupabase((sb) =>
        sb.auth.getUser()
      );

      const userId = sessionData?.user?.id;

      // get admin profile
      const { data: adminProfile } = await callSupabase((sb) =>
        sb.from("profile").select("school_id").eq("id", userId).single()
      );

      const schoolId = adminProfile.school_id;

      // create class
      const { data: newClass } = await callSupabase((sb) =>
        sb
          .from("classes")
          .insert({
            name,
            school_id: schoolId,
          })
          .select()
          .single()
      );
      console.log("newClass", newClass);
      setMessage("Class created successfully");
       setLoading(false);
       setIsCreating(false);
       navigate(pathConstants.ALL_CLASSES);
    } catch (err) {
      setErrorMessage("Failed to create class", err?.message);
    } finally {
      setLoading(false);
      setIsCreating(false);
      setName("");
    }
  };

  return {
    loading,
    setLoading,
    message,
    setMessage,
    errorMessage,
    setErrorMessage,
    isCreating,
    setIsCreating,
    name,
    setName,
    createClass,
  };
};

export default useCreateClass;
