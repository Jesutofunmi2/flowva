import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    //refreshUser();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [refreshUser]);

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "";
  const displayEmail = user?.email ?? "";
  const profileImageUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    loading,
    displayName,
    displayEmail,
    profileImageUrl,
    refreshUser,
    signOut,
    setLoading,
  };
}
