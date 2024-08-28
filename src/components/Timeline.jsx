import { useState, useEffect } from "react";

const intervals = [
  { label: "Slot No: 1/4 (0-6 hours)", value: 6, color: "#FFA21B", bgColor: "rgba(255, 162, 27, 0.3)" },
  { label: "Slot No: 2/4 (6-12 hours)", value: 12, color: "#6B8BFC", bgColor: "rgba(107, 139, 252, 0.3)" },
  { label: "Slot No: 3/4 (12-18 hours)", value: 18, color: "#FFCC07", bgColor: "rgba(255, 204, 7, 0.3)" },
  { label: "Slot No: 4/4 (18-24 hours)", value: 24, color: "#0098FE", bgColor: "rgba(0, 152, 254, 0.3)" },
];

const calculatePercentage = (hours, end) => Math.min((hours / end) * 100, 100);

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

  return (
    <>
      <p className="text-white text-xl font-semibold pb-4">Current Time Slot Progress</p>
      <div className="relative w-full px-0 pt-4 pb-12 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Slots */}
        {intervals.map((interval, index) => {
          const start = index === 0 ? 0 : intervals[index - 1].value;
          const percentage = calculatePercentage(hoursPassed - start, interval.value - start);
          const completedColor = interval.color;
          const remainingColor = interval.bgColor;

          return (
            <div key={interval.value} className="w-full md:flex-1 flex flex-col items-start">
              {/* Slot Bar */}
              <div className="relative w-full h-3 rounded-lg overflow-hidden shadow-lg flex">
                {/* Completed Portion */}
                <div
                  className="h-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: completedColor,
                    borderRadius: 8,
                  }}
                ></div>
                {/* Remaining Portion */}
                <div
                  className="h-full"
                  style={{
                    width: `${100 - percentage}%`,
                    backgroundColor: remainingColor,
                  }}
                ></div>
              </div>

              {/* Slot Label */}
              <div className="flex items-center mt-2 mx-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: completedColor }}
                ></span>
                <span className="text-white text-sm font-medium ml-2">
                  {interval.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TimelineProgressBar;
