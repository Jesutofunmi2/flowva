import React, { useState, useRef, useEffect } from "react";
import useAuthUser from "../../hooks/useAuthUser";

export const useSidebar = () => {
  const { signOut, displayEmail, displayName, profileImageUrl } = useAuthUser();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);
  return {
    signOut,
    displayEmail,
    displayName,
    profileImageUrl,
    profileMenuOpen,
    setProfileMenuOpen,
    profileRef,
  };
};


