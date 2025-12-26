import { MarkIcon } from "../../../assets/svgIcons";

const RewardClaimModalContent = ({ points = 5 }) => (
  <div className="claim-modal">
    <div
      className="claim-icon"
      style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}
    >
     <MarkIcon />
    </div>

    <h2
      style={{
        fontSize: 24,
        fontWeight: 700,
        color: "#9013fe",
        marginBottom: 8,
      }}
    >
      Level Up! 🎉
    </h2>
    <div
      style={{
        fontSize: 36,
        fontWeight: 800,
        margin: "8px 0",
        background: "linear-gradient(90deg,#9013fe,#FF9FF5)",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      +{points} Points
    </div>
    <p style={{ color: "#6b7280", marginTop: 8 }}>
      You've claimed your daily points! Come back tomorrow for more!
    </p>
  </div>
);
export default RewardClaimModalContent;
