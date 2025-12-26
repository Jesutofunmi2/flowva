import "./DailyStreak.scss";
import { DefaultCalendarIcon } from "../../../assets/svgIcons";
import PrimaryComponents from "../../primaryComponents";
import useDailyStreak from "./useDailyStreak";

const DailyStreak = ({
  streak = 1,
  days = ["M", "T", "W", "T", "F", "S", "S"],
  claimedToday = false,
  claimedDates = [],
  onClaim = () => {},
  className = "",
  loading = false,
}) => {
  const { todayStr, monday } = useDailyStreak();
  return (
    <div
      className={`daily-streak-card ${className}`}
      role="group"
      aria-label="Daily streak card"
    >
      <div className="daily-streak-card__header">
        <h3 className="daily-streak-card__title">
          <span className="daily-streak-card__icon">
            <DefaultCalendarIcon />
          </span>
          Daily Streak
        </h3>
      </div>

      <div className="daily-streak-card__body">
        <div className="daily-streak-card__count">
          {streak} day{streak !== 1 ? "s" : ""}
        </div>

        <div
          className="daily-streak-card__days"
          role="list"
          aria-label="Week days"
        >
          {days.map((d, i) => {
            const dayDate = new Date(monday);
            dayDate.setDate(monday.getDate() + i);
            const dayStr = dayDate.toISOString().slice(0, 10);
            const isActive = dayStr === todayStr;
            const isPast = dayDate < new Date(todayStr + "T00:00:00");
            const isClaimedPast =
              isPast &&
              Array.isArray(claimedDates) &&
              claimedDates.includes(dayStr);

            const cls = [
              "daily-streak-card__day",
              isActive ? "is-active" : "",
              isClaimedPast ? "is-claimed" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={i}
                role="listitem"
                aria-current={isActive ? "true" : undefined}
                className={cls}
              >
                {d}
              </div>
            );
          })}
        </div>

        <p className="daily-streak-card__hint">
          Check in daily to earn +5 points
        </p>

        <PrimaryComponents.Button
          classNames="btn btn--primary cover smallBtn"
          type="button"
          loadingText="Claiming..."
          isDisabled={claimedToday || loading}
          isLoading={loading}
          onClick={onClaim}
        >
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="daily-streak-card__btn-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
            </svg>
            {claimedToday ? "Claimed Today" : "Claim"}
          </span>
        </PrimaryComponents.Button>
      </div>
    </div>
  );
};

export default DailyStreak;
