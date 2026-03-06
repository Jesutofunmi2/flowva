import React, { useEffect, useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { pathConstants } from "../../../../../routes/pathContants";

const useUpdateSubject = () => {
  const [name, setName] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const updateSubject = async () => {
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

    // update subject
    const { data: updatedSubject } = await callSupabase((sb) =>
      sb
        .from("subjects")
        .update({
          name,
          school_id: schoolId,
        })
        .eq("id", subjectId)
        .select()
        .single()
    );
    console.log("updatedSubject", updatedSubject);
    setMessage("Subject updated successfully");
    setLoading(false);
    navigate(pathConstants.ALL_SUBJECTS);
  };

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      setLoading(true);
      const { data: subjectDetails, error } = await callSupabase((sb) =>
        sb.from("subjects").select("*").eq("id", subjectId).single()
      );

      if (error) {
        setErrorMessage("Failed to fetch subject details");
      } else {
        setName(subjectDetails.name);
      }
      setLoading(false);
    };

    if (subjectId) {
      fetchSubjectDetails();
    }
  }, [subjectId]);
  return { updateSubject, name, setName, errorMessage, message, loading };
};

export default useUpdateSubject;
