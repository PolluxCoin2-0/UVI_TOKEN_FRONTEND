import { useEffect, useRef, useState } from "react";
import WinnerImg from "../assets/winner.png";
import { getLeaderboardStats } from "../utils/axios";
import { useSelector } from "react-redux";
import { shortenString } from "../utils/shortenString";
import Pagination from "../components/Pagination";

const LeaderBoard = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const userWalletAddress = useSelector(
    (state) => state?.wallet?.dataObject?.walletAddress
  );

  const topPositionRef = useRef(null);
  const windowHeight = window.innerHeight;
  const threshold = windowHeight * 0.2; // 20% from the bottom
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await getLeaderboardStats();
      setLeaderboardData(apiData?.data?.leaderboardWithPosition);
    };
    fetchData();
  }, []);

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

  // Get the paginated data for the current page
  const paginatedData = leaderboardData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen relative bg-black px-4 lg:px-8 py-10 overflow-x-scroll">
      <div className="relative overflow-x-auto xl:overflow-x-clip 2xl:overflow-x-clip z-20">
        <p className="text-2xl md:text-3xl font-bold text-white text-center lg:text-left">
          Leaderboard
        </p>

        <div className="mt-10 border border-white border-opacity-15 min-w-[280px] md:min-w-[300px] lg:min-w-[600px] xl:min-w-[1000px] rounded-3xl ">
          {leaderboardData &&
            paginatedData.map((data, index) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
              const isSpecialIndex = globalIndex % 10 === 1;
              return (
                <div
                  key={data?.walletAddress}
                  ref={
                    data?.walletAddress === userWalletAddress
                      ? topPositionRef
                      : null
                  }
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
                  globalIndex === 1
                    ? "bg-gradient-to-r from-[#FBCF41] to-[#000000] p-3 rounded-tl-3xl rounded-tr-3xl"
                    : "bg-[#1B1B1B] p-4 lg:p-10 "
                } 
                ${isSpecialIndex ? "rounded-tl-3xl rounded-tr-3xl" : ""}
                ${
                  index === paginatedData.length - 1
                    ? "rounded-bl-3xl rounded-br-3xl"
                    : ""
                }
              `}
                >
                  <div className="flex items-center space-x-2 lg:space-x-10">
                    {globalIndex === 1 ? (
                      <img
                        src={WinnerImg}
                        alt="Top player"
                        className=" w-12 h-12 md:w-16 md:h-16 lg:w-full lg:h-12 xl:h-20"
                      />
                    ) : (
                      <p className="text-white text-sm md:text-xl lg:text-xl font-semibold bg-[#070707] rounded-full px-4 py-4 flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
                        {globalIndex}
                      </p>
                    )}
                    <div>
                      {/* for mobile screen */}
                      <p
                        className={`block md:hidden pt-1 ${
                          globalIndex === 1
                            ? "text-black text-sm lg:text-lg xl:text-xl font-bold"
                            : "text-white text-sm lg:text-lg xl:text-xl font-semibold"
                        }`}
                      >
                        {data?.walletAddress &&
                          shortenString(data?.walletAddress, 5)}
                      </p>

                      <p
                        className={`hidden md:block pt-1 ${
                          globalIndex === 1
                            ? "text-black text-lg md:text-2xl lg:text-xl xl:text-3xl font-bold"
                            : "text-white text-lg lg:text-lg xl:text-xl font-semibold"
                        }`}
                      >
                        {data?.walletAddress}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${
                      globalIndex === 1 ? "mt-4 lg:mt-0" : "mt-2 lg:mt-0"
                    }`}
                  >
                    <div
                      className={`whitespace-nowrap flex ${
                        globalIndex === 1
                          ? "flex-row space-x-4 lg:space-x-8"
                          : "flex-row items-end space-x-4 lg:space-x-8"
                      }`}
                    >
                      <p className="text-[#FFC121] text-sm lg:text-lg xl:text-xlfont-semibold">
                        Total Token
                      </p>
                      <p className="text-white text-sm lg:text-lg xl:text-xl font-semibold">
                        {data?.tokenBalance}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <Pagination
          totalRecords={leaderboardData.length}
          setPageNo={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LeaderBoard;
