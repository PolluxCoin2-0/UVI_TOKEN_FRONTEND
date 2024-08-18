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
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const clickedPercentage = (clickPosition / width) * 100;
    setProgress(clickedPercentage);
  };

  const getHoursFromPercentage = (percentage) => (percentage / 100) * 24;
  const formattedTime = new Date().setHours(getHoursFromPercentage(progress));

  return (
    <div className=" p-0 pt-6 rounded-lg relative">
      <div className="relative mb-4">
        {/* Time Intervals */}
        <div className="absolute top-[-36px] left-0 right-0 flex flex-row justify-between text-xs text-white ">
          {intervals.map((interval) => (
            <span
              key={interval.value}
              className="w-1/7 text-xl font-semibold pl-20 whitespace-nowrap "
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
      <div
  className="relative h-8 border-[1px] border-white border-opacity-15 bg-[#1B1B1B] rounded-3xl cursor-pointer z-0 mt-8"
  onClick={handleClick}
>
  <div
    className="h-10 -mt-1 bg-[#FFBE2E] rounded-l-3xl"
    style={{ width: `${progress}%` }}
  ></div>

  <div className="absolute top-0 -mt-2 -ml-7 transform translate-x-1/2 bg-white w-7 h-12 rounded-full border-2 border-white" style={{ left: `${progress}%` }}></div>
</div>
    </div>
  );
};

export default TimelineProgressBar;
