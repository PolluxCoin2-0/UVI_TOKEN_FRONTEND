import { useEffect, useRef, useState } from "react";
import WinnerImg from "../assets/winner.png";
import { LeaderboardData } from "../data/LeaderboardData";

const LeaderBoard = () => {
  const [isFixed, setIsFixed] = useState(false);

  const topPositionRef = useRef(null);
  const windowHeight = window.innerHeight;
  const threshold = windowHeight * 0.2; // 20% from the bottom

  useEffect(() => {
    const handleScroll = () => {
      if (topPositionRef.current) {
        const rect = topPositionRef.current.getBoundingClientRect();
        if (rect.bottom >= windowHeight - threshold || rect.top <= threshold) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black bgimage px-4 lg:px-8 py-10">
      <div className="overflow-x-auto xl:overflow-x-clip 2xl:overflow-x-clip">
        <p className="text-3xl font-bold text-white text-center lg:text-left">
          Leaderboard
        </p>

        {/* <div className="mt-10 border border-white border-opacity-15 min-w-[300px] lg:min-w-[1000px] rounded-xl"> */}
          {/* {LeaderboardData.map((data, index) => (
            <div
              key={index}
              ref={index === 5 ? topPositionRef : null}
              style={{
                transform:
                  isFixed && index === 5
                    ? "translateX(20px) translateX(-20px)"
                    : "",
              }}
              className={`flex flex-col lg:flex-row justify-between p-4 lg:p-10 border-b border-white border-opacity-15 
                ${
                  isFixed &&
                  index === 5 &&
                  "sticky top-0 bottom-0 left-0 right-0 shadow-outline"
                } 
                ${
                  index === 0
                    ? "bg-gradient-to-r from-[#FBCF41] to-[#000000] p-3 rounded-tl-xl rounded-tr-xl"
                    : "bg-[#1B1B1B] p-4 lg:p-10"
                } 
                ${index === LeaderboardData.length - 1 ? "rounded-bl-xl rounded-br-xl" : ""}
              `}
            >
              <div className="flex items-center space-x-4 lg:space-x-10">
                {index === 0 ? (
                  <img
                    src={WinnerImg}
                    alt="Top player"
                    className="w-16 h-16 lg:w-20 lg:h-20"
                  />
                ) : (
                  <p className="text-white text-xl lg:text-2xl font-semibold">
                    {index + 1}
                  </p>
                )}
                <div>
                  <p
                    className={`${
                      index === 0
                        ? "text-black text-2xl lg:text-4xl font-bold"
                        : "text-white text-xl lg:text-2xl font-semibold"
                    }`}
                  >
                    {data.userName}
                  </p>
                  <p className={`pt-1 ${index === 0 ? "text-black" : "text-[#8C8B8B]"}`}>
                    {data?.balance}
                  </p>
                </div>
              </div>
              <div className={`${index === 0 ? "mt-4 lg:mt-0" : "mt-2 lg:mt-0"}`}>
                <div className={`flex ${index === 0 ? "flex-row space-x-4 lg:space-x-8" : "flex-col items-end space-y-2 lg:space-y-0 lg:mr-5"}`}>
                  <p className="text-[#FFC121] text-lg">Total Transaction</p>
                  <p className="text-white text-lg font-semibold">{data.TotalTransaction}</p>
                </div>
                {index === 0 && (
                  <div className="flex flex-row space-x-4 lg:space-x-16 mt-2 lg:mt-0">
                    <p className="text-[#FFC121] text-lg">Coin Holding</p>
                    <p className="text-white text-lg font-semibold">{data.TotalTransaction}</p>
                  </div>
                )}
              </div>
            </div>
          ))} */}
          <p className="text-center text-white font-bold text-3xl">Coming Soon . . .</p>

        {/* </div> */}
      </div>
    </div>
  );
};

export default LeaderBoard;
