
import useAuthUser from "../../../hooks/useAuthUser";
import { useState, useEffect, useCallback } from "react";
import { callSupabase } from "../../../helpers/supabaseWrapper";

const useDashboard = () => {
  const { loading: authLoading, displayName, user } = useAuthUser();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLocalLoading] = useState(false);

  const fetchCards = useCallback(async () => {
    setLocalLoading(true);
    setError(null);
    try {
      const { data: dashboardCards } = await callSupabase((sb) =>
        sb.from("dashboard_cards").select("*").order("created_at", { ascending: true })
      );

      const { data: countsData } = await callSupabase((sb) =>
        sb.rpc("user_dashboard_counts", { uid: user.id })
      );

      const counts = countsData ?? {};
      const mapped = (dashboardCards || []).map((m) => ({
        ...m,
        count: counts[m.key] ?? 0,
      }));
      setCards(mapped);
    } catch (err) {
      const msg = err?.message ?? "Failed to load dashboard";
      setError(msg);
      setCards([]);
    } finally {
      setLocalLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    fetchCards();
  }, [user?.id, fetchCards]);

  return {
    loading: authLoading || loading,
    displayName,
    cards,
    error,
    refresh: fetchCards,
  };
};

export default useDashboard;