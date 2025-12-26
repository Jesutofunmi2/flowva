import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../helpers/supabaseWrapper";
import { supabase } from "../hooks/supabaseClient";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(null);
  const navigate = useNavigate();

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await callSupabase((sb) => sb.auth.getUser());
      setUser(data?.user ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const subscription = data?.subscription;
    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, [refreshUser]);

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

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "";
  const displayEmail = user?.email ?? "";
  const profileImageUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;

  const signOut = async () => {
    await callSupabase((sb) => sb.auth.signOut());
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
    link,
  };
}
