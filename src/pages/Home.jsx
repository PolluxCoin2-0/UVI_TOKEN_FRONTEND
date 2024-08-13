import CountdownTimer from "../components/CountdownTimer";
import Timeline from "../components/Timeline";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import UviLogo from "../assets/UvitokenLogo.png";
import WinnerImg from "../assets/winner.png";
import { LeaderboardData } from "../data/LeaderboardData";
import { Link } from "react-router-dom";
import BackgroundImg from "../assets/BGImage.png";
import VerticalTimeline from "../components/VerticalTimeline";

const Home = () => {
  return (
    <div className="bg-black w-full h-full  relative pb-12">
      <img
        src={BackgroundImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30  "
      />
      <div className="px-5 md:px-8 lg:px-16  relative z-10 "> 
        {/* Timer */}
        <div className="absolute left-1/2 transform -translate-x-1/2 border-[1px] border-white border-opacity-15 bg-[#1B1B1B]
        w-[60%] md:w-[35%] lg:w-[30%] xl:w-[15%] h-[3%] md:h-[4%] rounded-b-2xl flex flex-col shadow-inner shadow-gray-600 items-center justify-center z-10">
          <CountdownTimer />
          <p className="text-gray-400 text-center ">Remaining Time</p>
          <p className="border-[1px] px-14 mt-2"></p>
        </div>

        {/* Video */}
        <div className="border-[1px] border-[#F6B63E] border-opacity-15 rounded-2xl bg-[#040510] h-[450px] top-14 flex items-center
         justify-center relative">
          {/* Your video component goes here */}
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <p className="text-white text-xl font-semibold mb-12">Slot No: 1/6</p>
          {/* Your timeline component goes here */}
          {/* for devices lg, xl, 2xl  */}
          <div className="hidden md:block mt-0 md:mt-32 lg:mt-12">
          <Timeline />
          </div>
         
          <div className=" md:hidden mb-12">
          <VerticalTimeline />
          </div>
        </div>

        {/* blocks */}
        <div className="flex flex-col md:flex-col lg:flex-row justify-between w-full 
        space-x-0 md:space-x-0 lg:space-x-10 space-y-6 md:space-y-6 lg:space-y-0 mt-0 md:mt-14">
          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl 
          w-full md:w-full lg:w-[32%] flex flex-row justify-between items-center  p-8">
            <div>
              <p className="text-xl md:text-4xl text-white font-bold">0.00</p>
              <p className="text-[#8C8B8B] text-md md:text-lg font-semibold mt-0 md:mt-3">
                Your Total Uvi Balance
              </p>
            </div>
            <div className="text-white ">
              <MdOutlineAccountBalanceWallet size={56} />
            </div>
          </div>

          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-[32%] flex flex-row justify-between items-center  p-8">
            <div>
              <p className="text-xl md:text-4xl text-white font-bold">0.00</p>
              <p className="text-[#8C8B8B] text-md md:text-lg font-semibold mt-3">
                Your Coin Worth at Launch
              </p>
            </div>
            <div className="text-white ">
              <BiDollar size={36} />
            </div>
          </div>
          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-[32%] flex flex-row justify-between items-center  p-8">
            <div>
              <p className="text-xl md:text-3xl text-white font-bold">dPLxc5</p>
              <p className="text-[#8C8B8B] text-md md:text-lg font-semibold mt-3">
                Your Referral Earnings
              </p>
            </div>
            <div className="text-white ">   
              <LuCopy size={36} />
            </div>
          </div>
        </div>

        {/* Start Mining */}
        <div className="flex flex-col md:flex-col lg:flex-row justify-center   w-full md:space-x-0 lg:space-x-10 space-y-6 md:space-y-6 lg:space-y-0 mt-14  ">
          <div className="bg-black text-white  border-[1px] border-yellow-600 rounded-xl shadow-inner shadow-yellow-600 w-full md:w-full lg:w-[32%] p-2 flex flex-row justify-center space-x-5 items-center">
            <div className="text-xl md:text-4xl font-semibold">Start Mining</div>
            <div>
              <img src={UviLogo} alt="uvi-token" className="h-[120px]" />
            </div>
          </div>

          <div className="bg-black text-white border-[1px]  border-white rounded-xl shadow-inner shadow-white  w-full md:w-full lg:w-[32%] p-2 flex flex-row justify-center space-x-5 items-center">
            <Link to="/buycoin">
              <div className="text-xl md:text-4xl font-semibold">Buy Coin</div>
            </Link>

            <div>
              <img src={UviLogo} alt="uvi-token" className="h-[120px]" />
            </div>
          </div>
        </div>

        {/* border-bottom */}
        <div className="border-b-[1px] border-white border-opacity-15 mt-10 "></div>

        {/* Leaderboard */} 
        <div className="overflow-x-scroll ">
          <p className="text-3xl font-bold text-white mt-10 ">Leaderboard</p>

          <div className="mt-10 border-[1px]  border-white border-opacity-15 min-w-[1000px]">
            {LeaderboardData.map((data, index) => (
              <div
                key={index}
                className={`flex flex-row justify-between p-10 border-b-[1px] border-white border-opacity-15  ${
                  index === 0
                    ? "bg-gradient-to-r from-[#FBCF41]  to-[#000000] p-3 rounded-tl-xl rounded-tr-lg"
                    : "bg-[#1B1B1B] p-10"
                } ${
                  index === LeaderboardData.length - 1
                    ? "rounded-bl-xl rounded-br-xl"
                    : ""
                }
              `}
              >
                <div className="flex flex-row space-x-10 items-center">
                  {index === 0 ? (
                    <img
                      src={WinnerImg} // Replace with your image URL
                      alt="Top player"
                      className="" // Style the image as needed
                    />
                  ) : (
                    <p className="text-white text-2xl font-semibold">
                      {index + 1}
                    </p>
                  )}
                  <div>
                    <p
                      className={` ${
                        index === 0
                          ? "text-black text-4xl font-bold "
                          : "text-white text-2xl  font-semibold"
                      }`}
                    >
                      {data.userName}
                    </p>

                    <p
                      className={` pt-1 ${
                        index === 0 ? "text-black" : "text-[#8C8B8B]"
                      }`}
                    >
                      {data?.balance}
                    </p>
                  </div>
                </div>

                <div className={`${index === 0 ? "mt-10" : "mt-0"}`}>
                  <div
                    className={` ${
                      index === 0
                        ? "flex flex-row space-x-8 mr-10"
                        : "flex flex-col items-end mr-5"
                    }`}
                  >
                    <p className="text-[#FFC121] text-lg">Total Transaction</p>
                    <p className="text-white text-lg font-semibold">
                      {data.TotalTransaction}
                    </p>
                  </div>

                  {index === 0 && (
                    <div className="flex flex-row space-x-16">
                      <p className="text-[#FFC121] text-lg mt-2">
                        Coin Holding
                      </p>
                      <p className="text-white text-lg font-semibold mt-2">
                        {data.TotalTransaction}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
