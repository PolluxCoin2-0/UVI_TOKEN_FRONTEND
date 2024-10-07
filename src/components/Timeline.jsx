import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSlotNumber } from "../redux/slice/SlotsSlice";
import { getLastMintedTime } from "../utils/axios";

// Define a function to create intervals based on a base time
const createIntervals = (baseTime) => {
  const baseHours = baseTime.getHours();
  const baseMinutes = baseTime.getMinutes();
  
  return [
    { label: `Slot No: 1/4 (${baseHours}:${String(baseMinutes).padStart(2, '0')} - ${(baseHours + 6) % 24}:${String(baseMinutes).padStart(2, '0')})`, value: 6, color: "#FFA21B", bgColor: "rgba(255, 162, 27, 0.3)" },
    { label: `Slot No: 2/4 (${(baseHours + 6) % 24}:${String(baseMinutes).padStart(2, '0')} - ${(baseHours + 12) % 24}:${String(baseMinutes).padStart(2, '0')})`, value: 12, color: "#6B8BFC", bgColor: "rgba(107, 139, 252, 0.3)" },
    { label: `Slot No: 3/4 (${(baseHours + 12) % 24}:${String(baseMinutes).padStart(2, '0')} - ${(baseHours + 18) % 24}:${String(baseMinutes).padStart(2, '0')})`, value: 18, color: "#FFCC07", bgColor: "rgba(255, 204, 7, 0.3)" },
    { label: `Slot No: 4/4 (${(baseHours + 18) % 24}:${String(baseMinutes).padStart(2, '0')} - ${baseHours}:${String(baseMinutes).padStart(2, '0')})`, value: 24, color: "#0098FE", bgColor: "rgba(0, 152, 254, 0.3)" },
  ];
};

// Helper function to calculate percentage progress
const calculatePercentage = (hours, end) => Math.min((hours / end) * 100, 100);

const TimelineProgressBar = () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [baseTime, setBaseTime] = useState(new Date()); // State to hold the dynamic base time
  const [intervals, setIntervals] = useState([]); // State to hold the intervals

  useEffect(() => {
    const fetchData = async () => {
      const timeData = await getLastMintedTime();
      const fetchedTime = timeData?.data?.nextExpectedInterval; // Extract the last mined time from the API response
      
      if (fetchedTime) {
        const dateParts = fetchedTime.split(", ");
        const timeString = dateParts[1]; // Time part (HH:MM:SS)

        // Split the time string by colon
        const timeComponents = timeString.split(":");
        const hours = parseInt(timeComponents[0], 10); // Get hours and convert to integer
        const minutes = parseInt(timeComponents[1], 10); // Get minutes and convert to integer
        
        // Set the base time based on the API response
        const newBaseTime = new Date();
        newBaseTime.setHours(hours, minutes, 0, 0); // Set the base time to the API fetched time
        setBaseTime(newBaseTime);
        
        // Create intervals based on the fetched base time
        setIntervals(createIntervals(newBaseTime));
      }
    };
    fetchData();
  }, []);

  // Update current time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  // Calculate hours passed since the dynamic base time
  const getHoursPassedSinceBaseTime = () => {
    const now = currentTime;

    // If the current time is before the base time, subtract a day
    if (now < baseTime) {
      baseTime.setDate(baseTime.getDate() - 1);
    }

    const diff = now - baseTime;
    return diff / (1000 * 60 * 60); // Convert milliseconds to hours
  };

  const hoursPassed = getHoursPassedSinceBaseTime();

  // Determine the current time slot number based on hours passed
  const determineCurrentSlotNumber = () => {
    const currentSlotIndex = intervals.findIndex((interval, index) => {
      const start = index === 0 ? 0 : intervals[index - 1].value;
      return hoursPassed >= start && hoursPassed < interval.value;
    });

    if (currentSlotIndex !== -1) {
      const slotNumber = currentSlotIndex + 1; // Slot numbers are 1-based (1, 2, 3, 4)
      dispatch(setCurrentSlotNumber(slotNumber)); // Dispatch the current slot number
    }
  };

  // Calculate the current slot number whenever the time updates
  useEffect(() => {
    determineCurrentSlotNumber();
  }, [hoursPassed, intervals]); // Add intervals as a dependency to re-run when they are set

  return (
    <>
      <p className="text-white text-md md:text-xl font-semibold pb-2 text-center py-8">
        Current Time Slot Progress
      </p>
      <div className="grid grid-cols-2 gap-4 md:gap-4 md:grid-cols-4 mt-4 mb-2">
        {/* Slots */}
        {intervals.map((interval, index) => {
          const start = index === 0 ? 0 : intervals[index - 1].value;
          const percentage = calculatePercentage(hoursPassed - start, interval.value - start);
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
                <span className="text-[#f7f4f4] text-[11px] md:text-sm font-medium ml-2">
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
