import React, { useEffect, useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { pathConstants } from "../../../../../routes/pathContants";

const useUpdateClass = () => {
  const [name, setName] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { classId } = useParams();

  const updateClass = async () => {
    setLoading(true);
    const { data: sessionData } = await callSupabase((sb) => sb.auth.getUser());

    const userId = sessionData?.user?.id;

    setErrorMessage(null);
    setMessage(null);

    // get admin profile
    const { data: adminProfile } = await callSupabase((sb) =>
      sb.from("profile").select("school_id").eq("id", userId).single()
    );

    const schoolId = adminProfile?.school_id;

    // update class
    const { data: updatedClass } = await callSupabase((sb) =>
      sb
        .from("classes")
        .update({
          name,
          school_id: schoolId,
        })
        .eq("id", classId)
        .select()
        .single()
    );
    console.log("updatedClass", updatedClass);
    setMessage("Class updated successfully");
    setLoading(false);
    navigate(pathConstants.ALL_CLASSES);
  };

  useEffect(() => {
    const fetchClassDetails = async () => {
      setLoading(true);
      const { data: classDetails, error } = await callSupabase((sb) =>
        sb.from("classes").select("*").eq("id", classId).single()
      );

      if (error) {
        setErrorMessage("Failed to fetch class details");
      } else {
        setName(classDetails.name);
      }
      setLoading(false);
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);
  return { updateClass, name, setName, errorMessage, message, loading };
};

export default useUpdateClass;
