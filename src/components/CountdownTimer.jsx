import { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  // Determine the start time of the current 24-hour period at 16:39
  const startOfDay = new Date().setHours(23, 0, 0, 0); // 23:00:00

  // Calculate the slot duration and number based on the current time
  const slotDuration = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const now = new Date().getTime();
  const slotNumber = Math.floor((now - startOfDay) / slotDuration) + 1;

  // Ensure the slot number is between 1 and 4
  const currentSlotNumber = slotNumber > 4 ? 4 : slotNumber;

  // Calculate the start time and end time of the current slot
  const currentSlotStartTime = startOfDay + (currentSlotNumber - 1) * slotDuration;
  const currentSlotEndTime = currentSlotStartTime + slotDuration;

  // Function to calculate the remaining time
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = currentSlotEndTime - now;

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
  const [animationTrigger, setAnimationTrigger] = useState({
    seconds: false,
    minutes: false,
    hours: false,
  });

  const prevTimeLeft = useRef(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSlotEndTime]);

  useEffect(() => {
    const newAnimationTrigger = {
      seconds: false,
      minutes: false,
      hours: false,
    };

    if (prevTimeLeft.current.seconds !== timeLeft.seconds) {
      newAnimationTrigger.seconds = true;
    }
    if (prevTimeLeft.current.minutes !== timeLeft.minutes) {
      newAnimationTrigger.minutes = true;
    }
    if (prevTimeLeft.current.hours !== timeLeft.hours) {
      newAnimationTrigger.hours = true;
    }

    setAnimationTrigger(newAnimationTrigger);
    prevTimeLeft.current = timeLeft;

    const resetAnimations = () => {
      setAnimationTrigger({ seconds: false, minutes: false, hours: false });
    };

    // Reset the animation trigger after animation completes
    const timer = setTimeout(resetAnimations, 500); // Animation duration

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 count-down-main pt-6">
      <div className="flex items-start justify-center w-full gap-4">
        {/* Hours Section */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-20 rounded-lg text-center share-tech-regular h-[68px] relative overflow-hidden custom-curve">
            <div className="h-1/2 mb-[3px] bg-[#B68B1B] "></div>
            <div className="h-1/2 bg-[#B68B1B] "></div>
            <p className={`absolute top-3 left-5 text-5xl font-medium ${animationTrigger.hours ? 'animated' : ''}`}>
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
          </div>
          <span className="text-white text-base font-normal share-tech-regular">
            Hours
          </span>
        </div>
        <h3 className="font-semibold text-2xl md:text-5xl text-white pt-2">
          :
        </h3>

        {/* Minutes Section */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-20 rounded-lg text-center share-tech-regular h-[68px] relative overflow-hidden custom-curve">
            <div className="h-1/2 mb-[3px] bg-[#B68B1B] "></div>
            <div className="h-1/2 bg-[#B68B1B] "></div>
            <p className={`absolute top-3 left-4 text-5xl font-medium ${animationTrigger.minutes ? 'animated' : ''}`}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
          </div>
          <span className="text-white text-base font-normal share-tech-regular">
            Minutes
          </span>
        </div>
        <h3 className="font-semibold text-2xl md:text-5xl text-white pt-2">
          :
        </h3>

        {/* Seconds Section */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-20 rounded-lg text-center share-tech-regular h-[68px] relative overflow-hidden custom-curve">
            <div className="h-1/2 mb-[3px] bg-[#B68B1B] "></div>
            <div className="h-1/2 bg-[#B68B1B] "></div>
            <p className={`absolute top-3 left-5 text-5xl font-medium ${animationTrigger.seconds ? 'animated' : ''}`}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
          </div>
          <span className="text-white text-base font-normal share-tech-regular">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
