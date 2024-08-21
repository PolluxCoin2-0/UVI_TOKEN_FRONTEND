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
    <>
      <p className="text-white text-xl font-semibold pb-10">Slot No: {currentSlot + 1}/6</p>
      <div className="flex justify-center items-center h-auto">
        {/* Container for intervals and progress bar */}
        <div className="flex flex-row items-center space-x-8">
          {/* Time Intervals with alternating position */}
          <div className="relative h-96 flex flex-col justify-between text-xs text-white">
            {intervals.map((interval, index) => {
              const positionPercent = calculatePercentage(interval.value);
              const isEven = index % 2 === 0;
              const linePosition = `left-${isEven ? '-80px' : 'auto'}`;

              return (
                <div key={interval.value} className="relative">
                  {/* Yellow Line */}
                  <div
                    className={`absolute top-${positionPercent}% ${linePosition} w-16 h-1 bg-yellow-400 ${isEven ? 'left-[-40px]' : 'right-[-130px]'} rounded-full`}
                  ></div>
                  <span
                    className={`absolute text-lg font-semibold ${isEven ? 'left-[-120px]' : 'right-[-210px]'}`}
                    style={{
                      top: `${positionPercent}%`,
                      transform: "translateY(-50%)",
                      whiteSpace: "nowrap",
                      textAlign: isEven ? "right" : "left",
                    }}
                  >
                    {interval.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Vertical Progress Bar */}
          <div
            className="relative w-6 bg-gray-800 border border-gray-600 rounded-3xl"
            style={{ height: "450px" }}
          >
            <div
              className="absolute top-0 bg-[#FFBE2E] rounded-t-3xl"
              style={{ height: `${overallProgress}%`, width: "100%" }}
            ></div>

            {/* Centered White Handle */}
            <div
              className="animate-pulse absolute left-1/2 transform -translate-x-1/2 bg-yellow-500 w-7 h-7 rounded-full  shadow-lg"
              style={{
                top: `${overallProgress}%`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineProgressBar;
