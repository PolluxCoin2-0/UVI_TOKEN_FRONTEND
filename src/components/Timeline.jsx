import { useState, useEffect } from "react";

const intervals = [
  { label: "0 Hours", value: 0 },
  { label: "4 Hours", value: 4 },
  { label: "8 Hours", value: 8 },
  { label: "12 Hours", value: 12 },
  { label: "16 Hours", value: 16 },
  { label: "20 Hours", value: 20 },
  { label: "24 Hours", value: 24 },
];

const calculatePercentage = (hours) => (hours / 24) * 100;

const TimelineProgressBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getHoursPassedSinceMidnight = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return hours + minutes / 60;
  };

  const hoursPassed = getHoursPassedSinceMidnight();
  const currentSlot = Math.floor(hoursPassed / 4); // 4 hours per slot
  const progressWithinSlot = ((hoursPassed % 4) / 4) * 100; // Progress within the current slot

  const overallProgress =
    (currentSlot * (100 / 6)) + (progressWithinSlot / 6); // Overall progress as a percentage of the full 24 hours

  return (
    <div className="p-0 pt-6 rounded-lg relative">
      <div className="relative mb-4">
        {/* Time Intervals */}
        <div className="absolute top-[-36px] left-0 right-0 flex flex-row justify-between text-xs text-white">
          {intervals.map((interval) => (
            <span
              key={interval.value}
              className="w-1/7 text-xl font-semibold pl-20 whitespace-nowrap"
              style={{
                left: `${calculatePercentage(interval.value)}%`,
                transform: "translateX(-50%)",
              }}
            >
              {interval.label}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-8 border-[1px] border-white border-opacity-15 bg-[#1B1B1B] rounded-3xl cursor-pointer z-0 mt-8">
        <div
          className="h-10 -mt-1 bg-[#FFBE2E] rounded-l-3xl"
          style={{ width: `${overallProgress}%` }}
        ></div>

        <div
          className="absolute top-0 -mt-2 -ml-7 transform translate-x-1/2 bg-white w-7 h-12 rounded-full border-2 border-white"
          style={{ left: `${overallProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimelineProgressBar;
