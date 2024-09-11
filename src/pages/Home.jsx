import { useInView } from "react-intersection-observer";
import CountdownTimer from "../components/CountdownTimer";
import Timeline from "../components/Timeline";
import { MdArrowForward, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getLeaderboardStats,
  getReferralBalance,
  getTransactionResult,
  getVotePower,
  postDistributeReferralRewards,
  postMintUser,
  postUserAmount,
  saveUserMinigData,
  updateBalance,
} from "../utils/axios";
import HeroVideo from "../assets/HeroVideo.mp4";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SliderButton from "../components/SliderButton";
import { RiExchangeDollarLine } from "react-icons/ri";
import {
  setUserClickedWalletAddress,
  setUserSlotDate,
  setUserSlotNumber,
} from "../redux/slice/SlotsSlice";
import Footer from "../layout/Footer";
import { TbPigMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PlayStoreImg from "../assets/playstore.png";
import PolinkImg from "../assets/polink.png";
import ChromeImg from "../assets/chrome.png";
import PolinkExtensionImg from "../assets/PolinkEx.png";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import CurveImg from "../assets/Curve.png";
import { shortenString } from "../utils/shortenString";

const Home = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const CustomNextArrow = ({ onClick }) => (
    <div
      className="slider-arrow slider-arrow--next font-bold"
      onClick={onClick}
    >
      <SlArrowRight />
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div className="slider-arrow slider-arrow--prev" onClick={onClick}>
      <SlArrowLeft />
    </div>
  );

  var settings = {
    infinite: true,
    dots: false,
    // autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    adaptiveHeight: true,
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [referralAmount, setReferralAmount] = useState({});
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [userleaderBoardData, setUserLeaderBoardData] = useState([]);
  const slotsNumber = useSelector((state) => state?.slots);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const referralAddress = useSelector(
    (state) => state?.wallet?.dataObject?.referredBy
  );

  const walletAddress = useSelector((state) => state.wallet.address);
  const { ref: timerRef, inView: timerInView } = useInView({
    triggerOnce: true,
  });
  const { ref: videoRef, inView: videoInView } = useInView({
    triggerOnce: true,
  });
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
  });
  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await postUserAmount(walletAddress);
      console.log(apiData);
      setBalance(apiData?.data);
      const amount = await getReferralBalance(walletAddress);
      console.log(amount);
      setReferralAmount(amount?.data);
      const leaderboard = await getLeaderboardStats(walletAddress);
      setLeaderBoardData(leaderboard?.data.slice(0, 5));
      const filteredResult = leaderboard?.data.filter(
        (item) => item.walletAddress === walletAddress
      );
      setUserLeaderBoardData(filteredResult);
    };
    fetchData();
  }, [walletAddress]);

  const handleTapMining = async () => {
    setIsAnimating(true);
    // Optionally, reset the animation after some time if needed
    setTimeout(() => setIsAnimating(false), 4000);
    const currentDate = new Date().toISOString().split("T")[0];
    if (!walletAddress) {
      toast.error("Connect your wallet.");
      return;
    }

    const votePower = await getVotePower(walletAddress);
    const totalAmount =
      votePower.data.frozenV2.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      ) /
      10 ** 6;
    if (totalAmount < 25) {
      toast.error("Insufficient stake amount !");
      return;
    }

    if (
      slotsNumber?.userSlotNumber === slotsNumber?.currentSlotNumber &&
      slotsNumber?.userSlotDate === currentDate &&
      walletAddress === slotsNumber?.userClickedWalletAddress
    ) {
      toast.error("You have already minted in this slot.");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const apiData = await postMintUser(walletAddress, token);
    console.log(apiData);

    const signedTransaction = await window.pox.signdata(
      apiData?.data?.transaction
    );

    console.log("signedTransaction: ", signedTransaction);

    const broadcast = JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction[1]))
    );

    console.log("broadcast", broadcast);

    // check transaction result >> SUCCESS : REVERT
    const transactionResult = await getTransactionResult(
      apiData?.data?.transaction?.txID
    );
    console.log(transactionResult?.data?.receipt?.result);
    // Call the api of update Token balance
    const savedData = await saveUserMinigData(
      token,
      apiData?.data?.transaction?.txID,
      walletAddress,
      transactionResult?.data?.receipt?.result
    );
    console.log("savedData", savedData);

    // Distribute referral rewards
    if (
      transactionResult?.data?.receipt?.result === "SUCCESS" &&
      referralAddress
    ) {
      const referralData = await postDistributeReferralRewards(walletAddress);
      console.log("referralData", referralData);

      const signedTransaction2 = await window.pox.signdata(
        referralData?.data?.transaction
      );

      console.log("signedTranaction3", signedTransaction2);
      const broadcast2 = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction2[1]))
      );

      console.log("boradcast2", broadcast2);
    }

    // update token balance
    const updateTokenBalance = await updateBalance(token);
    console.log("updateTokenBalance", updateTokenBalance);

    toast.success("Your mining has started.");

    // save the clicked time slots in state management
    dispatch(setUserSlotNumber(slotsNumber?.currentSlotNumber));
    dispatch(setUserSlotDate(currentDate));
    dispatch(setUserClickedWalletAddress(walletAddress));
    setIsLoading(false);
  };

  return (
    <div className="bg-[#0E0E0E] w-full min-h-screen relative pb-0">
      <div className=" relative z-10 pt-6 md:pt-8">
        <div className="px-5 md:px-8 lg:px-6">
          <Slider {...settings}>
            {/* Video */}
            <div>
              {/* Video */}
              <div
                ref={videoRef}
                className={`relative rounded-2xl bg-[#040510] h-[200px] md:h-[330px] flex items-center justify-center
    ${videoInView ? "animate-pop-in" : ""}
  `}
              >
                <div className="absolute inset-0 rounded-2xl border-[4px] border-black blur-sm"></div>
                <video
                  className="w-full h-full object-cover rounded-2xl"
                  autoPlay
                  loop
                  muted
                >
                  <source src={HeroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Banner1 */}
            <div
              className="bg-gradient-to-r to-[#161616] via-[#1f1400] from-[#141414] rounded-3xl  h-[200px] md:h-[330px] flex items-center justify-center "
              style={{
                boxShadow:
                  "0 2px 20px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex flex-row  justify-around">
                <img
                  src={PlayStoreImg}
                  alt="playstore-image"
                  className=" w-14 md:w-24 lg:w-24 xl:w-32 2xl:w-32 object-contain"
                />
                <p className="text-md md:text-2xl lg:text-3xl 2xl:text-4xl text-[#F6B63E] font-bold pt-6 md:pt-14 2xl:pt-12">
                  Polink Mobile App
                </p>
                <img
                  src={PolinkImg}
                  alt="polink-image"
                  className=" w-14  md:w-20 lg:w-20 xl:w-32 2xl:w-28 object-contain"
                />
              </div>

              <div className="text-center ">
                <p className="text-[10px] md:text-[16px] lg:text-lg xl:text-xl font-medium lg:font-semibold text-[#f7f4f4] pt-2 ">
                  UVI Token Management on the Go! Access, trade, and manage your
                  UVI Tokens from <br />
                  anywhere, anytime with the Polink mobile app. Available on
                  Android.
                </p>
              </div>

              <div className="flex items-center justify-center ">
                <div className="relative">
                  <img
                    src={CurveImg}
                    alt=""
                    className="w-full h-auto mt-11 md:mt-[90px] lg:mt-20 xl:mt-2  object-contain"
                  />

                  <div className="text-center absolute z-10 inset-0 flex flex-row justify-evenly items-center px-4 md:px-32 ml-4 mr-4">
                    <img
                      src={PolinkImg}
                      alt="polink-image"
                      className="w-8 md:w-14 lg:w-16 xl:w-24 2xl:w-28 object-contain mb-1 xl:mb-2"
                    />

                    <div className="text-center flex flex-col justify-center items-center">
                      <p className="text-sm md:text-xl font-semibold pt-10 xl:pt-0 xl:mb-5 2xl:pt-0 text-white lg:text-black ">
                        Click Here
                      </p>

                      <a href="https://play.google.com/store/apps/details?id=com.app.PoLink">
                        <button
                          type="button"
                          className="relative inline-flex items-center justify-center bg-gradient-to-r to-[#FFF7A7] from-[#F6B63E] bg-opacity-5 mb-1 md:mb-0 lg:mb-0 xl:mb-4 2xl:mb-2
                                     px-4 py-0 xl:px-14 md:py-2 rounded-full text-[10px] md:text-xl font-semibold mt-0 md:mt-4 lg:mt-2 xl:mt-0 border-[1px] border-black overflow-hidden group"
                        >
                          <span className="absolute inset-0 w-full h-full transition duration-700 ease group-hover:rotate-180 ">
                            <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 bg-gradient-to-r to-[#EA4234] via-[#8CCBF9] from-purple-950 rounded-full blur-md transition-all duration-700 ease group-hover:scale-125 opacity-0 group-hover:opacity-100"></span>
                            <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#EA4234] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                            <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#8CCBF9] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                            <span className="absolute bottom-0 right-0 w-40 h-40 -mr-10 bg-gradient-to-r to-[#EA4234] via-[#8CCBF9] from-purple-950 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                          </span>
                          <span className="relative text-black">
                            Download the App today
                          </span>
                        </button>
                      </a>
                    </div>

                    <img
                      src={PlayStoreImg}
                      alt=" playstore-image"
                      className="w-8 md:w-14 lg:w-16 xl:w-32 2xl:w-32 object-contain  mb-1 xl:mb-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Banner2 */}
            <div
              className="bg-gradient-to-r to-[#181717] via-[#3b3724] from-[#131212] bg-opacity-5 rounded-3xl  h-[200px] md:h-[330px] flex items-center justify-center "
              style={{
                boxShadow:
                  "0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex flex-row  justify-around">
                <img
                  src={ChromeImg}
                  alt="playstore-image"
                  className="w-8 md:w-20 lg:w-24 xl:w-32 2xl:w-28 object-contain"
                />
                <p className="text-md md:text-2xl lg:text-3xl xl:text-4xl  text-[#F6B63E] font-bold pt-6 md:pt-14">
                  Polink Wallet Extension
                </p>
                <img
                  src={PolinkExtensionImg}
                  alt="polink-image"
                  className="w-8 md:w-16 lg:w-20 xl:w-28 2xl:w-24 object-contain"
                />
              </div>

              <div className="text-center ">
                <p className="text-[10px] md:text-[16px] lg:text-lg xl:text-xl font-semibold text-[#f7f4f4] pt-2">
                  Manage your Tokens effortlessly with the Polink browser
                  extension.
                  <br />
                  Fast, secure, and built for Web3 transactions.
                </p>
              </div>

              <div className="flex flex-row  justify-evenly ml-12 mr-12 ">
                <img
                  src={PolinkExtensionImg}
                  alt="polink-image"
                  className="w-6 md:w-16 lg:w-16 xl:w-20 2xl:w-20 object-contain"
                />
                <div className="text-center ">
                  <p className="text-sm md:text-xl font-semibold text-[#f7f4f4] pt-3 md:pt-8 2xl:pt-4">
                    Click Here
                  </p>
                  <a href=" https://chromewebstore.google.com/detail/polink/afeibjjgfjfphjedhdjgbgbhpomolbjm">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center bg-gradient-to-r to-[#272317] via-[#6D684C] from-[#847E55] leading-4 md:leading-0 bg-opacity-5 px-6 py-0 md:px-14 md:py-2 rounded-full text-xs md:text-xl font-semibold mt-2 md:mt-4 border-[1px] border-gray-500 text-white overflow-hidden group"
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-700 ease group-hover:rotate-180 ">
                        <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 bg-gradient-to-r to-[#6B8BFC] via-[#B692C2] from-[#E3A5C7] rounded-full blur-md transition-all duration-700 ease group-hover:scale-125 opacity-0 group-hover:opacity-100"></span>
                        <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#FFFED3] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                        <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#FFDFD6] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                        <span className="absolute bottom-0 right-0 w-40 h-40 -mr-10 bg-gradient-to-r to-[#3098FE] via-[#B692C2] from-[#E3A5C7] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                      </span>
                      <span className="relative text-[#f7f4f4]">
                        Add Polink Extension Now
                      </span>
                    </button>
                  </a>
                </div>

                <img
                  src={ChromeImg}
                  alt="playstore-image"
                  className="w-7  md:w-20 lg:w-16 xl:w-24 2xl:w-20 object-contain"
                />
              </div>
            </div>
          </Slider>

          {/* CountDown Timer */}
          <div
            ref={timerRef}
            className={`flex flex-col items-center text-white font-bold text-2xl mt-4 md:mt-6 ${
              timerInView ? "animate-pop-in" : ""
            }`}
          >
            <p>Next Slot will be in:</p>
            <CountdownTimer />
          </div>

          {/* Time Slots */}
          <div
            ref={timelineRef}
            className={`
          ${timelineInView ? "animate-pop-in" : ""}
          `}
          >
            <Timeline />
          </div>

          {/* Start Mining */}
          <div
            ref={buttonRef}
            className={`flex flex-row items-center justify-center w-full my-8 md:my-12 lg:my-12 xl:my-16
                       ${buttonInView ? "animate-pop-in" : ""}
                      `}
          >
            <button
              onClick={handleTapMining}
              className="relative overflow-hidden w-72 h-20 rounded-full border-2 border-[#232323] text-black text-2xl font-bold bg-gradient-to-b from-[#FBCB3E] via-[#F99004] to-[#F87504]"
            >
              {isAnimating && (
                <svg
                  className={`absolute inset-0 w-full h-full ${
                    isAnimating ? "animate-wave" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                  preserveAspectRatio="none"
                >
                  <path
                    fill="#FFFFFF"
                    d="M0,320L30,293.3C60,267,120,213,180,192C240,171,300,171,360,186.7C420,203,480,245,540,245.3C600,
          245,660,203,720,181.3C780,160,840,160,900,186.7C960,213,1020,267,1080,266.7C1140,267,1200,213,1260,
          192C1320,171,1380,203,1410,218.7L1440,235L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,
          320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                  />
                </svg>
              )}
              {isLoading ? (
                <span className="relative z-10 pulse-animation">
                  Loading...
                </span>
              ) : (
                <span className="relative z-10">Tap to Mine</span>
              )}
            </button>
          </div>

          {/* Blocks */}
          <div
            ref={buttonRef}
            className={`flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between w-full space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-10 space-y-6 md:space-y-6
          lg:space-y-6 xl:space-y-0 mt-0 md:mt-0 ${
            buttonInView ? "animate-pop-in" : ""
          }`}
          >
            {/* Balance Block */}
            <div
              className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center px-4 py-8 md:p-8"
              style={{
                boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
                 `, // White shadow with moderate opacity
              }}
            >
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
                  {balance ? parseFloat(balance.toFixed(6)) + "" : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  Total Minted Balance
                </p>
              </div>
              <div className="bg-[#202020] rounded-full p-[10px]">
                <MdOutlineAccountBalanceWallet size={32} color="white" />
              </div>
            </div>

            {/* Referral Earning */}
            <div
              className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center px-4 py-8 md:p-8"
              style={{
                boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
              }}
            >
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
                  {referralAmount
                    ? referralAmount.leve1Reward + referralAmount.leve2Reward
                    : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  UVI Referral Earnings
                </p>
              </div>
              <div className="bg-[#202020] rounded-full p-[10px]">
                <TbPigMoney size={32} color="white" />
              </div>
            </div>

            {/* Coin Worth at launch */}
            <div
              className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center px-4 py-8 md:p-8"
              style={{
                boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
              }}
            >
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
                  ${" "}
                  {referralAmount
                    ? parseFloat(
                        (
                          (referralAmount.leve1Reward +
                            referralAmount.leve2Reward +
                            balance) *
                          0.05
                        ).toFixed(6)
                      ) + ""
                    : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  Coin Worth at Launch
                </p>
              </div>
              <div className="bg-[#202020] rounded-full p-[10px]">
                <RiExchangeDollarLine size={32} color="white" />
              </div>
            </div>
          </div>

          {/* LeaderBoard */}
          <div
            className=" mt-16 bg-[#141414] rounded-3xl"
            style={{
              boxShadow: `
              0 2px 10px rgba(255, 255, 255, 0.05), 
              inset 0 0 10px rgba(255, 255, 255, 0.5)
            `, // White shadow with moderate opacity
            }}
          >
            <p
              className="text-white font-bold text-xl text-center bg-[#141414] rounded-t-3xl py-4"
              style={{
                boxShadow: `
                  0 2px 20px rgba(0, 0, 0, 0.4), 
                  inset 0 2px 5px rgba(255, 255, 255, 0.1),
                  inset 0 0px 2px rgba(255, 255, 255, 0.1)
                `, // Outer shadow and inner shadow without affecting the bottom
              }}
            >
              LeaderBoard
            </p>
            <div className="px-4 py-4 bg-[#0E0E0E] rounded-b-3xl  overflow-x-scroll md:overflow-hidden min-w-[270px] md:min-w-full">
              {leaderBoardData.map((data, index) => {
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
                  <div className="rounded-full bg-[#171717] text-white font-semibold text-lg flex items-center justify-center w-8 h-8 md:h-10 md:w-10">
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
          </div>
        </div>

        {/* Footer Section */}
        <div className="mx-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
