import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCountOfUsers, getLeaderboardStats } from "../../utils/axios";
import { shortenString } from "../../utils/shortenString";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

const HomeLeaderBoard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [userleaderBoardData, setUserLeaderBoardData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const walletAddress = useSelector((state) => state.wallet.address);

  useEffect(() => {
    const fetchData = async () => {
      const leaderboard = await getLeaderboardStats(walletAddress);
      setLeaderBoardData(leaderboard?.data.slice(0, 5));
      const filteredResult = leaderboard?.data.filter(
        (item) => item.walletAddress === walletAddress
      );
      setUserLeaderBoardData(filteredResult);
      const userCountData = await getCountOfUsers();
      setUserCount(userCountData?.data);
    };
    fetchData();
  }, [walletAddress]);

  return (
    <>
      <div
        className=" mt-16 bg-[#141414] rounded-3xl"
        style={{
          boxShadow: `
              0 2px 10px rgba(255, 255, 255, 0.05), 
              inset 0 0 10px rgba(255, 255, 255, 0.5)
            `, // White shadow with moderate opacity
        }}
      >
        <div
          className="flex flex-row justify-between items-center bg-[#141414] rounded-t-3xl py-4 px-8"
          style={{
            boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 2px 5px rgba(255, 255, 255, 0.1),
                inset 0 0px 2px rgba(255, 255, 255, 0.1)
              `, // Outer shadow and inner shadow without affecting the bottom
          }}
        >
          <p className="text-white font-bold text-xl text-center ">
            LeaderBoard
          </p>
          <p className="text-white font-bold text-xl text-center ">
            Total Users: {userCount ? userCount : 0}
          </p>
        </div>

        {leaderBoardData && leaderBoardData.length > 0 ? (
          <>
            <div className="px-4 py-4 bg-[#0E0E0E] rounded-b-3xl  overflow-x-scroll md:overflow-hidden min-w-[350px] md:min-w-full">
              {leaderBoardData &&
                leaderBoardData.map((data, index) => {
                  return (
                    <>
                      <div
                        className={`flex flex-row justify-between py-4 ${
                          index === leaderBoardData.length - 1
                            ? ""
                            : "border-b-[1px] border-[#171717]"
                        } `}
                      >
                        {/* wallet address */}
                        <div className="flex flex-row space-x-4 md:space-x-8 text-white">
                          {/* Index */}
                          <div className="rounded-full bg-[#171717] text-white font-semibold text-lg flex items-center justify-center w-8 h-8 md:h-10 md:w-10">
                            {index + 1}
                          </div>
                          <div>
                            {/* for mobile screen */}
                            <p className="block md:hidden text-xs md:text-lg font-semibold">
                              {data?.walletAddress &&
                                shortenString(data?.walletAddress, 5)}
                            </p>

                            {/* for tablet and above devices */}
                            <p className="hidden md:block text-xs md:text-lg font-semibold">
                              {data?.walletAddress}
                            </p>
                            <p className="text-[#8C8B8B] text-xs md:text-lg font-medium">
                              Total UVI Balance{" "}
                            </p>
                          </div>
                        </div>
                        {/* total transactions */}
                        <div>
                          <p className="text-xs md:text-lg font-semibold text-[#FFC121]">
                            Total Holding
                          </p>
                          <p className="text-white text-xs md:text-lg font-medium">
                            {data?.tokenBalance} UVI
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}

              <div className="flex items-center justify-center w-full space-x-2 ">
                {/* Link for the text */}
                <Link
                  to="/leaderboard"
                  className="text-lg text-[#FCC121] font-semibold cursor-pointer"
                >
                  More
                </Link>

                {/* Link for the icon */}
                <Link to="/leaderboard">
                  <MdArrowForward
                    className="text-[#FCC121] cursor-pointer"
                    size={24}
                  />
                </Link>
              </div>

              <div className="h-[2px] bg-[#171717] my-8"></div>

              <p className=" text-lg text-[#FCC121] font-semibold">My Place</p>
              {/* My Place */}
              <div className="flex flex-row justify-between py-4 ">
                {/* wallet address */}
                <div className="flex flex-row space-x-8 text-white">
                  {/* Index */}
                  <div
                    className="flex items-center justify-center bg-[#171717] text-white font-semibold rounded-full"
                    style={{
                      width: userleaderBoardData?.[0]?.position
                        ? `${Math.max(
                            2.5,
                            userleaderBoardData[0].position.toString().length
                          )}rem`
                        : "2.5rem",
                      height: userleaderBoardData?.[0]?.position
                        ? `${Math.max(
                            2.5,
                            userleaderBoardData[0].position.toString().length
                          )}rem`
                        : "2.5rem",
                      minWidth: "2.5rem", // Ensures a minimum size for smaller numbers
                      minHeight: "2.5rem", // Ensures a minimum size for smaller numbers
                    }}
                  >
                    {userleaderBoardData?.[0]?.position}
                  </div>

                  <div>
                    {/* for mobile screen */}
                    <p className="block md:hidden font-semibold">
                      {" "}
                      {userleaderBoardData?.[0]?.walletAddress &&
                        shortenString(
                          userleaderBoardData?.[0]?.walletAddress,
                          8
                        )}
                    </p>

                    {/* for mobile and above devices */}
                    <p className="hidden md:block  font-semibold text-xs md:text-lg">
                      {" "}
                      {userleaderBoardData?.[0]?.walletAddress}
                    </p>
                    <p className="text-[#8C8B8B] text-xs md:text-lg font-medium">
                      Total UVI Balance{" "}
                    </p>
                  </div>
                </div>
                {/* total transactions */}
                <div>
                  <p className="font-semibold text-xs md:text-lg text-[#FFC121]">
                    Total Holding
                  </p>
                  <p className="text-white text-xs md:text-lg font-medium">
                    {userleaderBoardData?.[0]?.tokenBalance} UVI
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center font-bold text-white text-xl py-6">
            No data found . . .
          </p>
        )}
      </div>
    </>
  );
};

export default HomeLeaderBoard;
