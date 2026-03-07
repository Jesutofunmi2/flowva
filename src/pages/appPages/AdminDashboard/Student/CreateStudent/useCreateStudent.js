import React, { useEffect, useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { supabase } from "../../../../../hooks/supabaseClient";
import { generateUsername } from "../../../../../helpers";

const useCreateCandidate = () => {
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

  const [message, setMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const createUser = async () => {
    try {
      setIsCreating(true);
      setErrorMessage(null);

      let photoUrl = null;

      // upload passport
      if (passport) {
        const fileName = `${Date.now()}-${passport.name}`;

        const { data: uploadData, error: uploadError } = await callSupabase(
          (sb) =>
            sb.storage.from("student-passports").upload(fileName, passport)
        );

        if (uploadError) throw uploadError;

        console.log("Upload data:", uploadData);

        // get public url (no await needed)
        const { data } = supabase.storage
          .from("student-passports")
          .getPublicUrl(uploadData.path);

        photoUrl = data.publicUrl;

        console.log("Public URL:", photoUrl);
      }

      // get logged in user
      const { data: userData, error: userError } = await callSupabase((sb) =>
        sb.auth.getUser()
      );

      if (userError) throw userError;

      const userId = userData?.user?.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // get admin profile
      const { data: adminProfile, error: profileError } = await callSupabase(
        (sb) => sb.from("profile").select("school_id").eq("id", userId).single()
      );

      if (profileError) throw profileError;

      const schoolId = adminProfile?.school_id;

      if (!schoolId) {
        throw new Error("School not found for this admin");
      }

      const usernameId = await generateUsername(schoolId);
      setUsername(usernameId);

      // create candidate
      const { data: candidate, error: insertError } = await callSupabase((sb) =>
        sb
          .from("candidates")
          .insert({
            username: usernameId,
            full_name: fullName,
            password,
            school_id: schoolId,
            class_id: className,
            gender,
            date_of_birth: dateOfBirth,
            session,
            photo_url: photoUrl,
          })
          .select()
          .single()
      );

      if (insertError) throw insertError;

      console.log("Candidate created:", candidate);

      setMessage("Candidate created successfully");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handlePassportChange = (file) => {
    setPassport(file);

    if (file) {
      const preview = URL.createObjectURL(file);
      setPassportPreview(preview);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
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

        // fetch classes for the school
        const { data: classes } = await callSupabase((sb) =>
          sb.from("classes").select("name, id").eq("school_id", schoolId)
        );

        setClasses(classes);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };

    fetchClasses();
  }, []);

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
    createUser,
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

export default useCreateCandidate;
