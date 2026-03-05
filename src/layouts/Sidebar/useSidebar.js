import React, { useState, useRef, useEffect } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { adminSidebarItems, candidateSidebarItems, superAdminSidebarItems} from "../../localdata/appSidebarItems";
import { ROLES } from "../../helpers";

export const useSidebar = () => {
  const { signOut, displayEmail, displayName, profileImageUrl } = useAuthUser();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const { role } = useAuthUser();
  const menuItems =
    role === ROLES.ADMIN
      ? adminSidebarItems
      : role === ROLES.CANDIDATE
      ? candidateSidebarItems
      : role === ROLES.SUPER_ADMIN
      ? superAdminSidebarItems
      : [];


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
    menuItems,
  };
};


