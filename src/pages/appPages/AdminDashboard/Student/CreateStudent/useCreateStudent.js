import { useEffect, useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { supabase } from "../../../../../hooks/supabaseClient";
import { generateUsername, ROLES } from "../../../../../helpers";

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

    // 1️⃣ Save admin session
    const {
      data: { session: adminSession },
    } = await supabase.auth.getSession();

    if (!adminSession) throw new Error("Admin session not found");

    let photoUrl = null;

    // 2️⃣ Upload passport
    if (passport) {
      const fileName = `${Date.now()}-${passport.name}`;

      const { data: uploadData, error: uploadError } = await callSupabase(
        (sb) => sb.storage.from("student-passports").upload(fileName, passport)
      );

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("student-passports")
        .getPublicUrl(uploadData.path);

      photoUrl = data.publicUrl;
    }

    // 3️⃣ Get admin user
    const { data: userData } = await callSupabase((sb) => sb.auth.getUser());

    const adminId = userData?.user?.id;

    if (!adminId) throw new Error("Admin not authenticated");

    // 4️⃣ Get admin school
    const { data: adminProfile } = await callSupabase((sb) =>
      sb.from("profile").select("school_id").eq("id", adminId).single()
    );

    const schoolId = adminProfile?.school_id;

    if (!schoolId) throw new Error("School not found for this admin");

    // 5️⃣ Generate username
    const usernameId = await generateUsername(schoolId);
    setUsername(usernameId);

    const email = `${usernameId}@student.school.com`;

    // 6️⃣ Create auth account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const authUserId = authData.user.id;

    // 7️⃣ Restore admin session
    await supabase.auth.setSession({
      access_token: adminSession.access_token,
      refresh_token: adminSession.refresh_token,
    });

    // 8️⃣ Insert candidate
    const { error: candidateError } = await callSupabase((sb) =>
      sb.from("candidates").insert({
        user_id: authUserId,
        username: usernameId,
        full_name: fullName,
        school_id: schoolId,
        class_id: className,
        gender,
        date_of_birth: dateOfBirth,
        session,
        password,
        photo_url: photoUrl,
      })
    );

    if (candidateError) throw candidateError;

    // 9️⃣ Insert profile
    const { error: profileError } = await callSupabase((sb) =>
      sb.from("profile").upsert({
        id: authUserId,
        full_name: fullName,
        role: ROLES.CANDIDATE,
        school_id: schoolId,
      })
    );

    if (profileError) throw profileError;

    setMessage("Candidate created successfully");
  } catch (err) {
    console.error(err);
    setErrorMessage(err.message);
  } finally {
    setIsCreating(false);
  }
};

  /**
   * Handle passport upload preview
   */
  const handlePassportChange = (file) => {
    setPassport(file);

    if (file) {
      const preview = URL.createObjectURL(file);
      setPassportPreview(preview);
    }
  };

  /**
   * Fetch school classes
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