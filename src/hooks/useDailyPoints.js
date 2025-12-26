import { useState, useEffect, useCallback } from "react";
import useAuthUser from "./useAuthUser";
import { callSupabase } from "../helpers/supabaseWrapper";

export default function useDailyPoints() {
  const { user } = useAuthUser();
  const [total, setTotal] = useState(0);
  const [lastClaim, setLastClaim] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [claimedDates, setClaimedDates] = useState([]);

  const fetchInfo = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true); setError(null);
    try {
      const { data: info } = await callSupabase((sb) => sb.rpc("user_points_info"));
      setTotal(Number(info?.total ?? 0));
      setLastClaim(info?.last_claim ? new Date(info.last_claim).toISOString() : null);

      const { data: claimedData } = await callSupabase((sb) => sb.rpc("user_claimed_dates", { p_days: 7 }))
      setClaimedDates(Array.isArray(claimedData) ? claimedData : (claimedData ?? []));

      const { data: streakInfo } = await callSupabase((sb) => sb.rpc("user_daily_streak"));
      setStreak(Number(streakInfo?.streak ?? 0));

      
    } catch (err) {
      setError(err?.message ?? "Failed to load points");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    fetchInfo();
  }, [user?.id, fetchInfo]);

  const claim = useCallback(async (points = 5) => {
    if (!user?.id) throw new Error("not authenticated");
    setLoading(true); setError(null);
    try {
      const { data } = await callSupabase((sb) => sb.rpc("claim_daily_points", { p_points: points }));
      setTotal(Number(data.total ?? 0));
      setLastClaim(data.last_claim ? new Date(data.last_claim).toISOString() : null);

      const { data: streakInfo } = await callSupabase((sb) => sb.rpc("user_daily_streak"));
      setStreak(Number(streakInfo?.streak ?? 0));

      return data;
    } catch (err) {
      setError(err?.message ?? "Failed to claim points");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const claimedToday = lastClaim
    ? new Date(lastClaim).toDateString() === new Date().toDateString()
    : false;

  return { total, lastClaim, streak, claimedToday, loading, error, fetchInfo, claim, claimedDates };
}