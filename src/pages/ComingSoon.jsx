import React, { useEffect, useState } from 'react';

const ComingSoon = () => {
  // State for countdown
  const [timeRemaining, setTimeRemaining] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Initialize the destination date
    let dest = new Date('September 10, 2024 23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      let diff = dest - now;

      if (diff <= 0) {
        // If countdown is finished, set the destination date to next month
        const nextMonthDate = new Date();
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

        if (nextMonthDate.getMonth() === 0) {
          nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
        }

        dest = nextMonthDate.getTime();
        return;
      }

      // Calculate time remaining
      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Run countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative w-full bg-black text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gradient-to-b from-gray-800 to-black rounded-2xl flex-col justify-center items-center lg:gap-28 md:gap-16 gap-10 inline-flex shadow-2xl">
          <div className="flex-col justify-center items-center lg:gap-8 gap-10 flex">
            <img src="https://uvitokendev.netlify.app/assets/UvitokenLogo-BTi4rCsB.png" alt="uvitoken logo" className="w-40 lg:w-48" />
            <div className="flex-col justify-center items-center gap-10 flex">
              <div className="flex-col justify-start items-center gap-2.5 flex">
                <h2 className="text-center text-yellow-500 md:text-7xl text-5xl font-bold font-manrope leading-normal">Coming Soon</h2>
                <p className="text-center text-[#8C8B8B] text-lg font-bold leading-relaxed pt-6">Live in Few hours...</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ComingSoon;
