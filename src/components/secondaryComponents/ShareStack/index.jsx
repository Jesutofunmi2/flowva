import React, { useState } from "react";
import "./ShareStack.scss";
import { ShareIcon } from "../../../assets/svgIcons";

const ShareStack = ({
  title = "Share Your Stack",
  subtitle = "Share your tool stack",
  points = 25,
  shareText = "Check out my tool stack on Flowva Hub",
  shareUrl = window.location.origin,
  onShareSuccess = () => {},
  className = "",
}) => {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
   
      if (navigator.share) {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      }
      onShareSuccess();
    setLoading(false);
  };

  return (
    <article className={`share-stack-card ${className}`} aria-labelledby="share-stack-title">
      <div className="share-stack-card__head">
        <div className="share-stack-card__icon" aria-hidden>
          <ShareIcon />
        </div>
        <div className="share-stack-card__meta">
          <h3 id="share-stack-title" className="share-stack-card__title">{title}</h3>
          <div className="share-stack-card__pts">Earn <span className="share-stack-card__pts-value">+{points} pts</span></div>
        </div>
      </div>

      <div className="share-stack-card__body">
        <p className="share-stack-card__desc">{subtitle}</p>
        <div className="share-stack-card__actions">
          <button
            className="btn btn--primary smallBtn"
            onClick={handleShare}
            disabled={loading}
            aria-label="Share your stack"
          >
            <span className="share-stack-card__btn-inner">
              <ShareIcon />
              <span>{loading ? "Sharing..." : "Share"}</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ShareStack;