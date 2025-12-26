import React from "react";
import "./ReferralCard.scss";
import StarIcon from "../../../assets/svgIcons/StarIcon";

const ReferralCard = ({
  title = "Refer and win 10,000 points!",
  body = "Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of 10,000 points. Friends must complete onboarding to qualify.",
  highlight = "10,000 points",
  className = "",
}) => {
  return (
    <article className={`referral-card ${className}`} aria-labelledby="referral-card-title">
      <div className="referral-card__head">
        <div className="referral-card__icon" aria-hidden>
          <StarIcon />
        </div>
        <div>
          <h3 id="referral-card-title" className="referral-card__title">{title}</h3>
        </div>
      </div>

      <div className="referral-card__body">
        <p className="referral-card__desc">
          {body.split(highlight).map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="referral-card__highlight">{highlight}</span>}
            </React.Fragment>
          ))}
        </p>
      </div>
    </article>
  );
};

export default ReferralCard;