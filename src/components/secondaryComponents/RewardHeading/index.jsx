import "./RewardHeading.scss";

const RewardHeading = ({
  children = "Your Rewards Journey",
  className = "",
  ...props
}) => {
  return (
    <h2 className={`reward-heading ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default RewardHeading;
