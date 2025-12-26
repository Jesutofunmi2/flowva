import React from "react";
import "./ReferralShareCard.scss";
import { ShareIcon, CopyIcon, FacebookIcon, LinkedlnIcon, WhatsappIcon, TwitterIcon } from "../../../assets/svgIcons";
import useReferralShareCard from "./useReferralShareCard";

const ReferralShareCard = ({
  referrals = 0,
  pointsEarned = 0,
  link = `${window.location.origin}/signup/?ref=unknown`,
  onShareSuccess = () => {},
  className = "",
}) => {
  const { copied, handleCopy, handleShare } =
    useReferralShareCard({ link, onShareSuccess });
  return (
    <article
      className={`referral-share-card ${className}`}
      aria-labelledby="referral-title"
    >
      <div className="referral-share-card__head">
        <div className="referral-share-card__icon" aria-hidden>
          <ShareIcon />
        </div>
        <div>
          <h3 id="referral-title" className="referral-share-card__title">
            Share Your Link
          </h3>
          <p className="referral-share-card__subtitle">
            Invite friends and earn {pointsEarned} points when they join!
          </p>
        </div>
      </div>

      <div className="referral-share-card__stats">
        <div className="referral-share-card__stat">
          <div className="referral-share-card__stat-value">{referrals}</div>
          <div className="referral-share-card__stat-label">Referrals</div>
        </div>
        <div className="referral-share-card__stat">
          <div className="referral-share-card__stat-value">{pointsEarned}</div>
          <div className="referral-share-card__stat-label">Points Earned</div>
        </div>
      </div>

      <div className="referral-share-card__linkwrap">
        <input
          className="referral-share-card__input"
          readOnly
          value={link}
          aria-label="Referral link"
        />
        <button
          className="referral-share-card__copy"
          onClick={handleCopy}
          aria-label="Copy referral link"
          title="Copy link"
        >
          <CopyIcon />
        </button>
      </div>

      <div className="referral-share-card__actions">
        <button
          className="btn btn--primary referral-share-card__action"
          onClick={() => handleShare("facebook")}
          aria-label="Share on Facebook"
          style={{ background: "rgb(24, 119, 242)" }}
        >
          <FacebookIcon />
        </button>
        <button
          className="btn btn--outline referral-share-card__action"
          onClick={() => handleShare("twitter")}
          aria-label="Share on Twitter"
          style={{ background: "white" }}
        >
          <TwitterIcon />
        </button>
        <button
          className="btn btn--outline referral-share-card__action"
          onClick={() => handleShare("linkedin")}
          aria-label="Share on LinkedIn"
          style={{ background: "white" }}
        >
          <LinkedlnIcon />
        </button>
        <button
          className="btn btn--outline referral-share-card__action"
          onClick={() => handleShare("whatsapp")}
          aria-label="Share on WhatsApp"
          style={{ background: "white" }}   
        >
          <WhatsappIcon />
        </button>
        {/* <button
          className="btn btn--outline referral-share-card__action"
          onClick={() => handleShare("native")}
          aria-label="Share"
          disabled={!navigator.share || loadingShare}
        >
          {navigator.share ? "Share" : "Share"}
        </button> */}
      </div>

      {copied && <div className="referral-share-card__copied">Link copied</div>}
    </article>
  );
};

export default ReferralShareCard;
