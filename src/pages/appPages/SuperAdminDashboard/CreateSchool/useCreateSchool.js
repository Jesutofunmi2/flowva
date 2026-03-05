import React, { useState } from "react";
import { callSupabase } from "../../../../helpers/supabaseWrapper";
import { ROLES } from "../../../../helpers";

const useCreateSchool = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");

  const [message, setMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

const createSchool = async () => {
  setIsCreating(true);
  setErrorMessage(null);
  setMessage(null);

  try {
    // Save super admin session
    const { data: sessionData } = await callSupabase((sb) =>
      sb.auth.getSession()
    );

    const superAdminSession = sessionData.session;

    // Create school
    const { data: school, error: schoolError } = await callSupabase((sb) =>
      sb
        .from("schools")
        .insert({
          name,
          email,
          address,
          phone,
        })
        .select()
        .single()
    );

    if (schoolError) throw schoolError;

    // Create school admin user
    const { data: userData, error: userError } = await callSupabase((sb) =>
      sb.auth.signUp({
        email,
        password,
      })
    );

    if (userError) throw userError;

    const newUser = userData?.user;

    // Restore super admin session
    await callSupabase((sb) =>
      sb.auth.setSession({
        access_token: superAdminSession?.access_token,
        refresh_token: superAdminSession?.refresh_token,
      })
    );

    // Insert profile
    const { error: profileError } = await callSupabase((sb) =>
      sb.from("profile").upsert({
        id: newUser.id,
        full_name: name,
        role: ROLES.ADMIN,
        school_id: school.id,
      })
    );

    if (profileError) throw profileError;

    setMessage("School and Admin created successfully.");
  } catch (err) {
    setErrorMessage(err.message);
  } finally {
    setIsCreating(false);
  }
};

  return {
    address,
    name,
    phone,
    password,
    message,
    email,
    isCreating,
    errorMessage,
    setAddress,
    setName,
    setPhone,
    setEmail,
    setPassword,
    setMessage,
    setIsCreating,
    setErrorMessage,
    createSchool,
  };
};

export default useCreateSchool;
