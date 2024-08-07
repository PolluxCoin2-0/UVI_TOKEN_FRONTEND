import { useState, useEffect } from 'react';

const intervals = [
  { label: '0 Hours', value: 0 },
  { label: '4 Hours', value: 4 },
  { label: '8 Hours', value: 8 },
  { label: '12 Hours', value: 12 },
  { label: '16 Hours', value: 16 },
  { label: '20 Hours', value: 20 },
  { label: '24 Hours', value: 24 },
];

const calculatePercentage = (hours) => (hours / 24) * 100;

const TimelineProgressBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progress, setProgress] = useState(calculatePercentage(currentTime.getHours()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hoursPassed = (currentTime.getHours() + currentTime.getMinutes() / 60) % 24;
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
    <div className="bg-black p-0 pt-6 rounded-lg relative">
     
      <div className="relative mb-4">
        {/* Time Intervals */}
        <div className="absolute top-[-36px] left-0 right-0 flex flex-row justify-between text-xs text-white border-">
          {intervals.map((interval) => (
            <span
              key={interval.value}
              className="w-1/7 text-xl font-semibold pl-20 "
              style={{
                left: `${calculatePercentage(interval.value)}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {interval.label}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div
      className="relative h-6 border-[1px] border-white border-opacity-15 bg-[#1B1B1B] rounded-lg overflow-hidden cursor-pointer z-0"
      onClick={handleClick}
    >
      <div
        className="h-full bg-[#FFBE2E] relative"
        style={{width: `${progress}%` }}
      >
        <div className="absolute right-0 transform translate-x-1/2 bg-white w-5 h-6 -p-5 rounded-full border-2 border-white "></div>
      </div>
      
    </div>
    {/* <div className="absolute top-0 mt-6  transform translate-x-1/2 bg-white w-8 h-12 -p-5 rounded-full border-2 border-white "></div> */}
    </div>
  );
};

export default TimelineProgressBar;
