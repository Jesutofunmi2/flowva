// src/components/secondaryComponents/PointsCard/index.jsx
import React, { useEffect, useRef } from "react";
import "./PointsCard.scss";
import { PointloitIcon } from "../../../assets/svgIcons";

const PointsCard = ({
  title = "Points Balance",
  points = 0,
  targetLabel = "$5 Gift Card",
  current = 0,
  target = 5000,
  Icon = null,
  iconBg = "#eef2ff",
  iconColor = "#9013FE",
  lottieData = null,
  className = "",
  onClick,
}) => {
  const lottieRef = useRef(null);
  const IconComponent = Icon && (Icon.default ?? Icon);

  useEffect(() => {
    let anim;
    let mounted = true;

    if (lottieData && lottieRef.current) {
      (async () => {
          const lottie = await import("lottie-web");
          if (!mounted) return;
          anim = lottie.loadAnimation({
            container: lottieRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: lottieData,
          });
      })();
    }

    return () => {
      mounted = false;
      anim?.destroy();
    };
  }, [lottieData]);

  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  return (
    <div className={`points-card ${className}`} onClick={onClick}>
      <div className="points-card__header">
        <h3 className="points-card__title">
          {IconComponent && (
            <span
              className="points-card__icon"
              style={{ background: iconBg, color: iconColor }}
              aria-hidden
            >
              <IconComponent />
            </span>
          )}
          <span>{title}</span>
        </h3>
      </div>

      <div className="points-card__body">
        <div className="points-card__main">
          <div className="points-card__value" aria-live="polite">{points}</div>
          <PointloitIcon />
        </div>

        <div className="points-card__progress">
          <div className="points-card__progress-row">
            <div className="points-card__progress-label">
              Progress to <span className="points-card__progress-target">{targetLabel}</span>
            </div>
            <div className="points-card__progress-count">{current}/{target}</div>
          </div>

          <div
            className="points-card__progress-bar"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress to ${targetLabel}: ${pct}%`}
          >
            <div className="points-card__progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <p className="points-card__hint">🚀 Just getting started — keep earning points!</p>
        </div>
      </div>
    </div>
  );
};

export default PointsCard;