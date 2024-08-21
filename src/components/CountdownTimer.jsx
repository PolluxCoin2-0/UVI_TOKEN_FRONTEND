import { useState, useEffect } from "react";

const CountdownTimer = ({ timeStampOfUser }) => {
  // Get the timestamp from localStorage or use the passed prop
  const timeFromLocalStorage = parseInt(localStorage.getItem("timeStamp")) || timeStampOfUser;
  
  // Calculate the target date (6 hours from the saved timestamp)
  const targetDate = new Date(timeFromLocalStorage + 6 * 60 * 60 * 1000).getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    // If the time is up, return zeroes
    return {
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
    <div className="flex items-start justify-center w-full gap-3 count-down-main ">
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element hours font-semibold text-2xl md:text-3xl text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl md:text-3xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element minutes font-semibold text-2xl md:text-3xl text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl md:text-3xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element seconds font-semibold text-2xl md:text-3xl text-white">
            {String(timeLeft.seconds).padStart(2, "0")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
