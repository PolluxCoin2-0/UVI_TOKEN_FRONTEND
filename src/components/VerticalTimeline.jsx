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
    <div className="flex justify-center items-center h-auto">
      {/* Container for intervals and progress bar */}
      <div className="flex flex-row space-x-4">
        {/* Time Intervals with vertical spacing */}
        <div className="relative h-96 flex flex-col justify-between text-xs text-white space-y-10">
          {intervals.map((interval, index) => (
            <span
              key={interval.value}
              className={`absolute text-lg font-semibold ${
                index % 2 === 0 ? "left-[-75px]" : "right-[-130px]"
              }`}
              style={{
                top: `${calculatePercentage(interval.value)}%`,
                transform: "translateY(-50%)",
              }}
            >
              {interval.label}
            </span>
          ))}
        </div>

        {/* Vertical Progress Bar */}
        <div
          className="relative w-6 border-[1px] border-white border-opacity-15 bg-[#1B1B1B] rounded-3xl"
          style={{ height: "450px" }}
        >
          <div
            className="absolute top-0 bg-[#FFBE2E] rounded-t-3xl"
            style={{ height: `${overallProgress}%`, width: "100%" }}
          ></div>

          {/* Centered White Handle */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bg-white w-10 h-10 rounded-full border-2 border-white"
            style={{
              top: `${overallProgress}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineProgressBar;
