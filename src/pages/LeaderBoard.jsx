  import { useEffect, useRef, useState } from "react";
import WinnerImg from "../assets/winner.png";
import { getLeaderboardStats } from "../utils/axios";
import BackgroundImg from "../assets/BGImage.png";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const userWalletAddress = useSelector((state)=>state?.wallet?.dataObject?.walletAddress)

  const topPositionRef = useRef(null);
  const windowHeight = window.innerHeight;
  const threshold = windowHeight * 0.2; // 20% from the bottom

  useEffect(()=>{
    const fetchData = async()=>{
      const apiData = await getLeaderboardStats();
      setLeaderboardData(apiData?.data)
    }
    fetchData();
  },[])

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
    <div className="min-h-screen relative bg-black px-4 lg:px-8 py-10">
        <img
        src={BackgroundImg}
        alt="background"
        className="absolute inset-0 w-full object-cover object-center opacity-30"
        style={{ height: '100%', zIndex: 1 }}
      />
      <div className="relative overflow-x-auto xl:overflow-x-clip 2xl:overflow-x-clip z-20">
        <p className="text-3xl font-bold text-white text-center lg:text-left">
          Leaderboard
        </p>

        <div className="mt-10 border border-white border-opacity-15 min-w-[800px] md:min-w-[300px] lg:min-w-[600px] xl:min-w-[1000px] rounded-3xl">
          {leaderboardData && leaderboardData.map((data, index) => (
            <div
              key={data?.walletAddress}
              ref={data?.walletAddress === userWalletAddress ? topPositionRef : null}
              style={{
                transform:
                  isFixed && data?.walletAddress === userWalletAddress
                    ? "translateX(20px) translateX(-20px)"
                    : "",
              }}
              className={`flex flex-row justify-between p-4 lg:p-10 border-b border-white border-opacity-15 
                ${
                  isFixed &&
                  data?.walletAddress === userWalletAddress &&
                  "sticky top-0 bottom-0 left-0 right-0 shadow-outline"
                } 
                ${
                  index === 0
                    ? "bg-gradient-to-r from-[#FBCF41] to-[#000000] p-3 rounded-tl-3xl rounded-tr-3xl"
                    : "bg-[#1B1B1B] p-4 lg:p-10"
                } 
                ${index === leaderboardData.length - 1 ? "rounded-bl-3xl rounded-br-3xl" : ""}
              `}
            >
              <div className="flex items-center space-x-4 lg:space-x-10">
                {index === 0 ? (
                  <img
                    src={WinnerImg}
                    alt="Top player"
                    className="w-16 h-16 lg:w-full lg:h-12 xl:h-20"
                  />
                ) : (
                  <p className="text-white text-xl lg:text-xl font-semibold bg-[#070707] rounded-full px-4 py-4 flex items-center justify-center w-10 h-10">
                  {index + 1}
                </p>
                
                )}
                <div>
                  <p
                    className={`${
                      index === 0
                        ? "text-black text-2xl lg:text-xl xl:text-4xl font-bold"
                        : "text-white text-xl lg:text-xl xl:text-2xl font-semibold"
                    }`}
                  >
                    {data?.email}
                  </p>
                  <p className={`pt-1 ${index === 0 ? "text-black" : "text-[#8C8B8B]"}`}>
                    {data?.walletAddress}
                  </p>
                </div>
              </div>
              <div className={`${index === 0 ? "mt-4 lg:mt-0" : "mt-2 lg:mt-0"}`}>
                <div className={`whitespace-nowrap flex ${index === 0 ? "flex-row space-x-4 lg:space-x-8" : "flex-row items-end space-x-4 lg:space-x-8"}`}>
                  <p className="text-[#FFC121] text-xl font-semibold">Total Token</p>
                  <p className="text-white text-xl font-semibold">{data?.tokenBalance}</p>
                </div>
                
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
