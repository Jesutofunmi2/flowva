import React, { useEffect, useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { supabase } from "../../../../../hooks/supabaseClient";
import { useParams } from "react-router-dom";

const useEditStudent = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [session, setSession] = useState("");
  const [password, setPassword] = useState("12345678");

  const [passport, setPassport] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);

  const { candidateId } = useParams();

  const [message, setMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * UPDATE STUDENT
   */
  const updateUser = async () => {
    try {
      setIsCreating(true);
      setErrorMessage(null);

      let photoUrl = passportPreview;

      /**
       * Upload new passport if selected
       */
      if (passport) {
        const fileName = `${Date.now()}-${passport.name}`;

        const { data: uploadData, error: uploadError } = await callSupabase(
          (sb) =>
            sb.storage.from("student-passports").upload(fileName, passport)
        );

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("student-passports")
          .getPublicUrl(uploadData.path);

        photoUrl = data.publicUrl;
      }

      /**
       * UPDATE STUDENT
       */
      const { data, error } = await callSupabase((sb) =>
        sb
          .from("candidates")
          .update({
            full_name: fullName,
            class_id: className,
            gender,
            date_of_birth: dateOfBirth,
            session,
            photo_url: photoUrl,
            password,
          })
          .eq("id", candidateId)
          .select()
          .single()
      );

      if (error) throw error;

      console.log("Student updated:", data);

      setMessage("Student updated successfully");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * HANDLE PASSPORT CHANGE
   */
  const handlePassportChange = (file) => {
    setPassport(file);

    if (file) {
      const preview = URL.createObjectURL(file);
      setPassportPreview(preview);
    }
  };

  /**
   * FETCH CLASSES
   */
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data: sessionData } = await callSupabase((sb) =>
          sb.auth.getUser()
        );

        const userId = sessionData?.user?.id;

        const { data: adminProfile } = await callSupabase((sb) =>
          sb.from("profile").select("school_id").eq("id", userId).single()
        );

        const schoolId = adminProfile.school_id;

        const { data: classes } = await callSupabase((sb) =>
          sb.from("classes").select("name, id").eq("school_id", schoolId)
        );

        setClasses(classes || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };

    fetchClasses();
  }, []);

  /**
   * FETCH STUDENT DETAILS
   */
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const { data, error } = await callSupabase((sb) =>
          sb.from("candidates").select("*").eq("id", candidateId).single()
        );

        if (error) throw error;

        if (data) {
          setUsername(data.username);
          setFullName(data.full_name);
          setClassName(data.class_id);
          setGender(data.gender);
          setDateOfBirth(data.date_of_birth);
          setSession(data.session);
          setPassportPreview(data.photo_url);
        }
      } catch (err) {
        console.error("Error fetching student details:", err);
      }
    };

    if (candidateId) {
      fetchStudentDetails();
    }
  }, [candidateId]);

  return {
    username,
    passport,
    passportPreview,
    fullName,
    password,
    message,
    session,
    errorMessage,
    isCreating,
    classes,
    className,
    gender,
    dateOfBirth,
    updateUser,
    setGender,
    setDateOfBirth,
    setClassName,
    setSession,
    setPassword,
    setFullName,
    setUsername,
    handlePassportChange,
  };
};

export default useEditStudent;