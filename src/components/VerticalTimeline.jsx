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
  const [progress, setProgress] = useState(
    calculatePercentage(currentTime.getHours())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hoursPassed =
    (currentTime.getHours() + currentTime.getMinutes() / 60) % 24;
  const percentage = calculatePercentage(hoursPassed);

  const handleClick = (e) => {
    const { top, height } = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientY - top;
    const clickedPercentage = (clickPosition / height) * 100;
    setProgress(clickedPercentage); // Update without inverting progress
  };

  const getHoursFromPercentage = (percentage) => (percentage / 100) * 24;

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
          className="relative w-6 border-[1px] border-white border-opacity-15 bg-[#1B1B1B] rounded-3xl cursor-pointer"
          style={{ height: "450px" }}
          onClick={handleClick}
        >
          <div
            className="absolute top-0 bg-[#FFBE2E] rounded-t-3xl"
            style={{ height: `${progress}%`, width: "100%" }}
          ></div>

          {/* Centered White Handle */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bg-white w-10 h-10 rounded-full border-2 border-white"
            style={{
              top: `${progress}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineProgressBar;
