import React from "react";
import "./SpotlightCard.scss";
import { ClaimIcon, UserIcon } from "../../../assets/svgIcons";
import Image from "../../../assets/images";

const SpotlightCard = ({
  featured = true,
  tag = "Featured",
  title = "Top Tool Spotlight",
  subtitle = "Automate and Optimize Your Schedule",
  description = "Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!",
  image,
  onPrimary,
  onSecondary,
  primaryText = "Sign up",
  secondaryText = "Claim 50 pts",
  primaryDisabled = false,
  secondaryDisabled = false,
}) => {
  return (
    <article className="spotlight-card" aria-labelledby="spotlight-title">
      <header className="spotlight-card__hero" role="img" aria-hidden>
        {featured && (
          <span className="spotlight-card__badge" aria-hidden>
            {tag}
          </span>
        )}

        <div className="spotlight-card__hero-row">
          <h3 id="spotlight-title" className="white--text spotlight-card__title">
            {title}
          </h3>
          <div className="spotlight-card__thumb">
            {image ? (
              <img src={Image.ReClaim} alt="" />
            ) : (
              <div className="spotlight-card__thumb-fallback" />
            )}
          </div>
        </div>

        <p className="spotlight-card__subtitle white--text">
          <strong>{subtitle}</strong>
        </p>
      </header>

      <div className="spotlight-card__body">
        <div className="spotlight-card__icon-row">
          <div className="spotlight-card__icon">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
            >
              <path d="M8 2v4M16 2v4M3 10h18" />
            </svg>
          </div>
          <div className="spotlight-card__text">
            <h4 className="spotlight-card__heading">{subtitle}</h4>
            <p className="spotlight-card__desc">{description}</p>
          </div>
        </div>
      </div>

      <footer className="spotlight-card__cta">
        <button
          type="button"
          className="spotlight-card__btn spotlight-card__btn--primary"
          onClick={onPrimary}
          disabled={primaryDisabled}
          aria-disabled={primaryDisabled}
        >
          <UserIcon />
          {primaryText}
        </button>

        <button
          type="button"
          className="spotlight-card__btn spotlight-card__btn--secondary"
          onClick={onSecondary}
          disabled={secondaryDisabled}
          aria-disabled={secondaryDisabled}
        >
          <ClaimIcon />
          {secondaryText}
        </button>
      </footer>
    </article>
  );
};

export default SpotlightCard;
