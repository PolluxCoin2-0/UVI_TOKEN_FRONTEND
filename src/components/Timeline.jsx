import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSlotNumber } from "../redux/slice/SlotsSlice";

const intervals = Array.from({ length: 48 }, (_, i) => {
  const startMinutes = i * 30;
  const endMinutes = startMinutes + 30;
  return {
    label: `Slot No: ${i + 1}/48 (${Math.floor(startMinutes / 60)}:${startMinutes % 60 === 0 ? '00' : startMinutes % 60} - ${Math.floor(endMinutes / 60)}:${endMinutes % 60 === 0 ? '00' : endMinutes % 60})`,
    value: endMinutes,
    color: `hsl(${(i * 360) / 48}, 70%, 60%)`, // Generate color for each slot
    bgColor: `rgba(${(i * 255) / 48}, ${(255 - (i * 255) / 48)}, ${(i * 255) / 48}, 0.3)` // Generate background color for each slot
  };
});

const calculatePercentage = (minutes, end) => Math.min((minutes / end) * 100, 100);

const TimelineProgressBar = () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const getMinutesPassedSinceMidnight = () => {
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
    return diff / (1000 * 60); // Convert to minutes
  };

  const minutesPassed = getMinutesPassedSinceMidnight();

  // Determine the current time slot number based on the minutes passed
  const determineCurrentSlotNumber = () => {
    const currentSlotIndex = intervals.findIndex((interval, index) => {
      const start = index === 0 ? 0 : intervals[index - 1].value;
      return minutesPassed >= start && minutesPassed < interval.value;
    });

    if (currentSlotIndex !== -1) {
      const slotNumber = currentSlotIndex + 1; // Slot numbers are 1-based (1, 2, ..., 48)
      dispatch(setCurrentSlotNumber(slotNumber)); // Dispatch the current slot number
    }
  };

  // Calculate the current slot number whenever the time updates
  useEffect(() => {
    determineCurrentSlotNumber();
  }, [minutesPassed]);

  return (
    <>
      <p className="text-white text-md md:text-xl font-semibold pb-2 text-center py-8">
        Current Time Slot Progress
      </p>
      <div className="grid grid-cols-2 gap-4 md:gap-4 md:grid-cols-6 lg:grid-cols-12 my-2">
        {/* Slots */}
        {intervals.map((interval, index) => {
          const start = index === 0 ? 0 : intervals[index - 1].value;
          const percentage = calculatePercentage(minutesPassed - start, interval.value - start);
          const completedColor = interval.color;
          const remainingColor = interval.bgColor;

          return (
            <div key={interval.value} className="flex flex-col items-start">
              {/* Slot Bar */}
              <div className="relative w-full h-[5px] md:h-5 rounded-lg overflow-hidden shadow-lg flex">
                {/* Completed Portion */}
                <div
                  className="h-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: completedColor,
                    borderRadius: 5,
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
              <div className="flex flex-row justify-center items-center mt-2 mx-0 md:mx-2">
                <span
                  className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full"
                  style={{ backgroundColor: completedColor }}
                ></span>
                <span className="text-white text-[10px] md:text-xs lg:text-sm font-medium ml-2">
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
