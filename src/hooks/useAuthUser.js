import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../helpers/supabaseWrapper";
import { supabase } from "../hooks/supabaseClient";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(null);

  const navigate = useNavigate();

  /**
   * 🔄 Fetch current session user
   */
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await callSupabase((sb) => sb.auth.getUser());
      const currentUser = data?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await fetchUserRole(currentUser.id);
      } else {
        setRole(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 👤 Fetch role from profiles table
   */
  const fetchUserRole = async (userId) => {
    try {
      const { data } = await callSupabase((sb) =>
        sb
          .from("profile")
          .select("role")
          .eq("id", userId)
          .single()
      );

      setRole(data?.role ?? null);
    } catch {
      setRole(null);
    }
  };

  /**
   * 🔐 Listen to auth state changes
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
        await fetchUserRole(sessionUser.id);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [refreshUser]);

  /**
   * 🔗 Generate referral link
   */
  useEffect(() => {
    if (!user?.id) {
      setLink(null);
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const { data } = await callSupabase((sb) =>
          sb
            .from("profiles")
            .select("referral_code")
            .eq("id", user.id)
            .maybeSingle()
        );

        if (!mounted) return;

        setLink(
          `${window.location.origin}/signup?ref=${data?.referral_code ?? ""}`
        );
      } catch {
        if (mounted) setLink(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  /**
   * 🏷 Display helpers
   */
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "";

  const displayEmail = user?.email ?? "";

  const profileImageUrl =
    user?.user_metadata?.avatar_url ??
    user?.user_metadata?.picture ??
    null;

  /**
   * 🚪 Sign Out
   */
  const signOut = async () => {
    await callSupabase((sb) => sb.auth.signOut());
    localStorage.removeItem("refreshToken");
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  return {
    user,
    role,
    loading,
    displayName,
    displayEmail,
    profileImageUrl,
    refreshUser,
    signOut,
    setLoading,
    link,
  };
}