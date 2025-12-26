import MetaSetter from "../../../components/secondaryComponents/MetaSetter";
import SecondaryComponents from "../../../components/secondaryComponents";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import { PointIcon } from "../../../assets/svgIcons";
import useRewardHub from "./useRewardHub";
import SpotlightCard from "../../../components/secondaryComponents/SpotlightCard";

const RewardHub = () => {
  const {
    pointsTotal,
    streak,
    claimedToday,
    loading,
    handleClaim,
    openClaimModal,
    setOpenClaimModal,
    claimedDates,
    referral_code,
  } = useRewardHub();
  return (
    <MetaSetter
      title="Flowva Hub | Reward Hub"
      description="Explore and manage your rewards on Flowva Hub."
    >
      <SecondaryComponents.RewardHeading>
        Your Rewards Journey
      </SecondaryComponents.RewardHeading>
      <div className={globalStyles.responsiveGrid}>
        <SecondaryComponents.PointsCard
          Icon={PointIcon}
          points={pointsTotal}
          current={pointsTotal}
        />
        <SecondaryComponents.DailyStreak
          streak={streak}
          days={["M", "T", "W", "T", "F", "S", "S"]}
          activeIndex={2}
          claimedToday={claimedToday}
          onClaim={() => {
            setOpenClaimModal(true);
            handleClaim();
          }}
          loading={loading}
          claimedDates={claimedDates}
        />
        <SpotlightCard
          featured
          tag="Featured"
          title="Top Tool Spotlight"
          subtitle="Reclaim"
          description="Reclaim is an AI-powered calendar assistant..."
          image="https://api.flowvahub.com/storage/v1/object/public/icons/reclaim.png"
        />
      </div>
      <SecondaryComponents.RewardHeading>
        Earn More Points
      </SecondaryComponents.RewardHeading>
      <div className={globalStyles.responsiveGrid}>
        <SecondaryComponents.ReferralCard
          title="Refer and win 10,000 points!"
          body="Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of 10,000 points. Friends must complete onboarding to qualify."
          highlight="10,000 points"
        />
        <SecondaryComponents.ShareStack
          points={25}
          shareText="Check out my stack on Flowva Hub!"
          shareUrl="https://app.flowvahub.com/my-stack"
          onShareSuccess={() => {
            SecondaryComponents.ToastHelper.success(
              "Thanks for sharing! You've earned 25 points."
            );
          }}
        />
      </div>
      <SecondaryComponents.RewardHeading>
        Refer & Earn
      </SecondaryComponents.RewardHeading>
      <SecondaryComponents.ReferralShareCard
        referrals={0}
        pointsEarned={0}
        link={`${referral_code}`}
      />
      <SecondaryComponents.Modal
        isOpen={openClaimModal}
        onClose={() => setOpenClaimModal(false)}
        content={<SecondaryComponents.RewardClaimModalContent points={5} />}
      />
    </MetaSetter>
  );
};

export default RewardHub;
