import { useState } from "react";
import useDailyPoints from "../../../hooks/useDailyPoints";
import useAuthUser from "../../../hooks/useAuthUser";

const useRewardHub = () => {
  const { link } = useAuthUser();
  const { total, claimedToday, loading, claim, streak, claimedDates } = useDailyPoints();
  const [openClaimModal, setOpenClaimModal] = useState(false);

  const handleClaim = async () => {
    await claim(5);
  };
  return {
    pointsTotal: total,
    claimedToday,
    streak,
    loading,
    handleClaim,
    openClaimModal,
    setOpenClaimModal,
    claimedDates,
    referral_code: link
  };
};

export default useRewardHub;
