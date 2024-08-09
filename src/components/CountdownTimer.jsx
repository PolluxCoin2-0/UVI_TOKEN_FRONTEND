import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});
  const [targetDate, setTargetDate] = useState(new Date(new Date().getTime() + 4 * 60 * 60 * 1000));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-start justify-center w-full gap-3 count-down-main ">
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element hours  font-semibold text-3xl text-white ">
            {String(timeLeft.hours).padStart(2, "0")}
          </h3>
        </div>
        {/* <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">hours</p> */}
      </div>
      <h3 className=" font-semibold text-3xl text-white pl-2">:</h3>

      <div className="timer w-5 ">
        <div>
          <h3 className="countdown-element minutes font-semibold text-3xl text-white ">
            {String(timeLeft.minutes).padStart(2, "0")}
          </h3>
        </div>
        {/* <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">minutes</p> */}
      </div>
      <h3 className=" font-semibold text-3xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element seconds  font-semibold text-3xl text-white ">
            {String(timeLeft.seconds).padStart(2, "0")}
          </h3>
        </div>
        {/* <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">seconds</p> */}
      </div>
    </div>
  );
};

export default CountdownTimer;
