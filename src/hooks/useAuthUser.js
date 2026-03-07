import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../helpers/supabaseWrapper";
import { supabase } from "../hooks/supabaseClient";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);

  const navigate = useNavigate();

  /**
   * 👤 Fetch role from profile table
   */
  const fetchUserRole = async (userId) => {
  try {
    const { data } = await callSupabase((sb) =>
      sb
        .from("profile")
        .select("role, full_name")
        .eq("id", userId)
        .single()
    );

    const userRole = data?.role ?? null;

    setRole(userRole);
    setFullName(data?.full_name ?? null);

    return userRole;
  } catch {
    setRole(null);
    setFullName(null);
    return null;
  }
};
  /**
   * 🎓 Fetch candidate info
   */
  const fetchCandidate = async (userId) => {
    console.log("Fetching candidate info for user ID:", userId); // Debug log
    try {
      const { data } = await callSupabase((sb) =>
        sb
          .from("candidates")
          .select(`
            full_name,
            session,
            photo_url,
            classes (
              name
            )
          `)
          .eq("user_id", userId)
          .single()
      );

      setCandidate(data ?? null);
    } catch {
      setCandidate(null);
    }
  };

  /**
   * 🔄 Refresh current user
   */
  const refreshUser = useCallback(async () => {
  setLoading(true);

  try {
    const { data } = await callSupabase((sb) => sb.auth.getUser());

    const currentUser = data?.user ?? null;

    setUser(currentUser);

    if (currentUser) {
      const userRole = await fetchUserRole(currentUser?.id);
        if (userRole === "candidate") {
        await fetchCandidate(currentUser?.id);
      } else {
        setCandidate(null);
      }
    } else {
      setRole(null);
      setCandidate(null);
    }
  } finally {
    setLoading(false);
  }
}, []);
  /**
   * 🔐 Listen to auth changes
   */
 useEffect(() => {
  let mounted = true;

  refreshUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (!mounted) return;

    const sessionUser = session?.user ?? null;

    setUser(sessionUser);

    if (sessionUser) {
      const userRole = await fetchUserRole(sessionUser?.id);

      if (userRole === "candidate") {
        await fetchCandidate(sessionUser?.id);
      } else {
        setCandidate(null);
      }
    } else {
      setRole(null);
      setCandidate(null);
    }

    setLoading(false);
  });

  return () => {
    mounted = false;
    subscription?.unsubscribe();
  };
}, [refreshUser]);
  /**
   * 🏷 Display helpers
   */
  const displayName =
    candidate?.full_name ?? fullName ??
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "";

  const displayEmail = user?.email ?? "";

  const profileImageUrl =
    candidate?.photo_url ??
    user?.user_metadata?.avatar_url ??
    null;

  /**
   * 🚪 Sign Out
   */
  const signOut = async () => {
    await callSupabase((sb) => sb.auth.signOut());

    localStorage.removeItem("refreshToken");

    setUser(null);
    setRole(null);
    setCandidate(null);

    navigate("/login");
  };

  return {
    user,
    role,
    candidate,
    loading,
    displayName,
    displayEmail,
    profileImageUrl,
    refreshUser,
    signOut,
    setLoading,
  };
}