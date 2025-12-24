import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";
import { ArrowRight } from "../../../assets/svgIcons";

const Card = ({
  to = "#",
  Icon = null,
  iconBg = "#E9D4FF",
  iconColor = "#9013FE",
  title,
  count = null,
  description = "",
  ctaText = "View",
  className = "",
  ...rest
}) => {
  return (
    <Link to={to} className={`card-link ${className}`} data-discover="true" {...rest}>
      <div className="card-link__icon" style={{ background: iconBg, color: iconColor }}>
        {Icon && <Icon />}
      </div>

      <h3 className="card-link__title">
        {title}
        {count !== null && <span className="card-link__count">{count}</span>}
      </h3>

      {description && <p className="card-link__desc">{description}</p>}

      <span className="card-link__cta">
        {ctaText}
        <span className="card-link__cta-icon"><ArrowRight /></span>
      </span>
    </Link>
  );
};

export default Card;