import { useState, useEffect } from "react";

const Timer = () => {
  // Function to calculate the time left
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Initialize the target date to 20 minutes from now
  const [timeLeft, setTimeLeft] = useState({});
  const [targetDate, setTargetDate] = useState(new Date(new Date().getTime() + 20 * 60 * 1000));

  useEffect(() => {
    // Set initial time left
    setTimeLeft(calculateTimeLeft(targetDate));

    // Update the time left every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-start justify-center w-full gap-3 count-down-main">
      <div className="timer w-5 mr-4">
        <div className="flex flex-row justify-center">
          <p className="countdown-element minutes">
            {String(timeLeft.minutes).padStart(2, "0")} 
          </p>
          <p>m</p>
        </div>
      </div>

      <div className="timer w-5">
        <div className="flex flex-row justify-center">
          <p className="countdown-element seconds">
            {String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <p>sec</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
