import { useState, useEffect } from "react";

const CountdownTimer = () => {
  // Set the target date to August 9th of the current year
  const targetDate = new Date(new Date().getFullYear(), 8, 9, 0, 0, 0).getTime(); // 7 is August (zero-based)

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
      const secondsLeft = Math.floor((difference / 1000) % 60);

      return {
        days: String(daysLeft).padStart(2, "0"),
        hours: String(hoursLeft).padStart(2, "0"),
        minutes: String(minutesLeft).padStart(2, "0"),
        seconds: String(secondsLeft).padStart(2, "0"),
      };
    }

    // If the target date has passed, return zeroes
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-start justify-center w-full gap-3 count-down-main">
      {/* Show Days */}
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element days font-semibold text-2xl md:text-3xl text-white">
            {timeLeft.days}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl md:text-3xl text-white pl-2">:</h3>

      {/* Show Hours */}
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element hours font-semibold text-2xl md:text-3xl text-white">
            {timeLeft.hours}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl md:text-3xl text-white pl-2">:</h3>

      {/* Show Minutes */}
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element minutes font-semibold text-2xl md:text-3xl text-white">
            {timeLeft.minutes}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl md:text-3xl text-white pl-2">:</h3>

      {/* Show Seconds */}
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element seconds font-semibold text-2xl md:text-3xl text-white">
            {timeLeft.seconds}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
