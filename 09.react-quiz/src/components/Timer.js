import { useEffect } from "react";
export default function Timer({ dispatch, secondRemaining }) {
  const minutesPassed = String(Math.floor(secondRemaining / 60)).padStart(2, "0");
  const secondPassed = String(secondRemaining % 60).padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutesPassed}:{secondPassed}
    </div>
  );
}
