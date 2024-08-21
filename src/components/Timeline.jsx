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
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const getHoursPassedSinceMidnight = () => {
    const now = currentTime;
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const diff = now - midnight;
    return diff / (1000 * 60 * 60);
  };

  const hoursPassed = getHoursPassedSinceMidnight();
  const overallProgress = (hoursPassed / 24) * 100;

  const currentSlot = Math.floor(hoursPassed / 4) + 1; // Calculate the current slot

  return (
    <>
      <p className="text-white text-xl font-semibold pb-0">Slot No: {currentSlot}/6</p>
      <div className="relative w-full px-4 pt-8 pb-20">
        {/* Time Labels */}
        <div className="relative h-24">
          {intervals.map((interval, index) => {
            const positionPercent = calculatePercentage(interval.value);

            return (
              <div
                key={interval.value}
                className="absolute flex flex-col items-center"
                style={{ left: `${positionPercent}%`, transform: 'translateX(-50%)' }}
              >
                {index % 2 === 0 ? (
                  <>
                    <span className="text-white text-base font-medium mb-2 whitespace-nowrap">
                      {interval.label}
                    </span>
                    <div className="w-[4px] h-16 bg-yellow-400 mb-2 rounded-3xl"></div>
                  </>
                ) : (
                  <>
                    <div className="w-[4px] h-16 bg-yellow-400 mt-36 rounded-3xl"></div>
                    <span className="text-white text-base font-medium mt-2 whitespace-nowrap">
                      {interval.label}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative h-8 bg-gray-700 bg-opacity-50 rounded-full mt-1 backdrop-blur-lg shadow-lg">
          {/* Background Line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-full"></div>

          {/* Progress Fill */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg"
            style={{ width: `${overallProgress}%` }}
          ></div>

          {/* Current Progress Indicator */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ left: `${overallProgress}%` }}
          >
            <div className="relative flex justify-center items-center">
              <div className="w-9 h-9 -ml-6 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineProgressBar;
