import React, { useEffect, useState, useRef } from "react";
import { getWeekIndexFromDate } from "../../../helpers";

const useDailyStreak = () => {
  const [, setActiveIndex] = useState(() => getWeekIndexFromDate());
  const intervalRef = useRef(null);

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const monday = new Date();
  const currIndex = getWeekIndexFromDate();
  monday.setDate(monday.getDate() - currIndex);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const t = setTimeout(() => {
      setActiveIndex(getWeekIndexFromDate());
      intervalRef.current = setInterval(
        () => setActiveIndex(getWeekIndexFromDate()),
        24 * 60 * 60 * 1000
      );
    }, msUntilMidnight + 1000);

    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    todayStr,
    monday,
  };
};

export default useDailyStreak;
