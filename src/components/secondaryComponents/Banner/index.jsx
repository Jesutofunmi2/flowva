import React from "react";
import "./Banner.scss";
import Images from "../../../assets/images";

const Banner = ({
  title = "Big News: We’re Becoming Bravoo! 🎉",
  subtitle = `Bravoo a platform designed to make learning fun, simple, and truly rewarding. With Bravoo, you’ll complete quick, engaging missions that help you build real digital skills while earning coins, prizes, gadgets, and more. Explore what’s coming on our brand-new website: `,
  ctaUrl = "https://www.joinbravoo.com",
  image = Images.Banner,
  className = "",
}) => {
  return (
    <div className={`announcement-banner ${className}`}>
      <div className="announcement-banner__inner">
        <div className="announcement-banner__left">
          <div className="announcement-banner__icon">
            <img src={image} alt="announcement" className="announcement-banner__image" />
          </div>
        </div>

        <div className="announcement-banner__text">
          <div className="announcement-banner__title">
            <strong>{title}</strong>
          </div>

          <div className="announcement-banner__subtitle">
            <span>{subtitle}</span>
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="announcement-banner__link">
              {ctaUrl.replace(/^https?:\/\//, "")}
            </a>
            <span> You’ll get a sneak peek of the experience and learn how to join the growing Bravoo community. We officially launch on January 10, and we’re excited to have you on this journey with us.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;