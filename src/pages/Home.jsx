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

const Home = () => {
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
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    // if (
    //   slotsNumber?.userSlotNumber === slotsNumber?.currentSlotNumber &&
    //   slotsNumber?.userSlotDate === currentDate &&
    //   walletAddress === slotsNumber?.userClickedWalletAddress
    // ) {
    //   toast.error("You have already minted in this slot.");
    //   return;
    // }

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
    if (referralAddress) {
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
              className="bg-gradient-to-r to-[#161616] via-[#1f1400] from-[#141414] rounded-3xl  h-[250px] md:h-[330px] flex items-center justify-center "
              style={{
                boxShadow:
                  "0 2px 20px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex flex-row  justify-around">
                <img src={PlayStoreImg} alt="playstore-image" className="" />
                <p className="text-4xl text-[#F6B63E] font-bold pt-14">
                  Polink Mobile App
                </p>
                <img src={PolinkImg} alt="polink-image" className="" />
              </div>

              <div className="text-center ">
                <p className="text-xl font-semibold text-white pt-2">
                  UVI Token Management on the Go! Access, trade, and manage your
                  UVI Tokens from <br />
                  anywhere, anytime with the Polink mobile app. Available on
                  Android.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <img src={CurveImg} alt="" className="w-full h-auto mt-4" />

                  <div className="absolute z-10 inset-0 flex flex-row justify-evenly px-32 items-center -mt-32 ">
                    <img src={PolinkImg} alt="polink-image" className="" />
                    <div className="text-center">
                      <p className="text-xl font-semibold pt-8">Click Here</p>
                      <a href="https://play.google.com/store/apps/details?id=com.app.PoLink">
                        <button
                          type="button"
                          className="bg-gradient-to-r to-[#FFF7A7] from-[#F6B63E] bg-opacity-5 px-14 py-2 rounded-full text-xl font-semibold mt-4 border-[1px] border-black"
                        >
                          Download the App today
                        </button>
                      </a>
                    </div>
                    <img
                      src={PlayStoreImg}
                      alt="playstore-image"
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Banner2 */}
            <div
              className="bg-gradient-to-r to-[#181717] via-[#3b3724] from-[#131212] bg-opacity-5 rounded-3xl  h-[250px] md:h-[330px] flex items-center justify-center "
              style={{
                boxShadow:
                  "0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex flex-row  justify-around">
                <img
                  src={ChromeImg}
                  alt="playstore-image"
                  className="object-contain"
                />
                <p className="text-4xl text-[#F6B63E] font-bold pt-14">
                  Polink Wallet Extension
                </p>
                <img
                  src={PolinkExtensionImg}
                  alt="polink-image"
                  className="object-contain"
                />
              </div>

              <div className="text-center ">
                <p className="text-xl font-semibold text-white pt-2">
                  UVI Token Management on the Go! Access, trade, and manage your
                  UVI Tokens from <br />
                  anywhere, anytime with the Polink mobile app. Available on
                  Android.
                </p>
              </div>

              <div className="flex flex-row  justify-evenly ml-12 mr-12 ">
                <img
                  src={PolinkExtensionImg}
                  alt="polink-image"
                  className="object-contain"
                />
                <div className="text-center ">
                  <p className="text-xl font-semibold text-white pt-8">
                    Click Here
                  </p>
                  <a href=" https://chromewebstore.google.com/detail/polink/afeibjjgfjfphjedhdjgbgbhpomolbjm">
                    <button
                      type="button"
                      className="bg-gradient-to-r to-[#272317] via-[#6D684C] from-[#847E55] bg-opacity-5 px-14 py-2 rounded-full text-xl font-semibold mt-4 border-[1px] border-gray-500 text-white"
                    >
                      Add Polink Extension Now
                    </button>
                  </a>
                </div>

                <img
                  src={ChromeImg}
                  alt="playstore-image"
                  className="object-contain"
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
              className="relative overflow-hidden w-72 h-20 rounded-full border-2 border-white text-white text-2xl font-bold bg-gradient-to-tl from-[#FF5858] to-[#FFFF45]"
            >
              Tap to Mine
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
                  {balance ? parseFloat((balance).toFixed(6))+'' : 0}
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
                  ((referralAmount.leve1Reward +
                   referralAmount.leve2Reward +
                   balance) *
                   0.05).toFixed(6)
                   ) + ''
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
            <div className="px-4 py-4 bg-[#0E0E0E] rounded-b-3xl  overflow-x-scroll md:overflow-hidden">
              {leaderBoardData.map((data, index) => {
                return (
                  <>
                    <div
                      className={`flex flex-row justify-between py-4 ${
                        index === leaderBoardData.length - 1
                          ? ""
                          : "border-b-[1px] border-[#171717]"
                      } min-w-[600px]`}
                    >
                      {/* wallet address */}
                      <div className="flex flex-row space-x-8 text-white">
                        {/* Index */}
                        <div className="rounded-full bg-[#171717] text-white font-semibold text-lg flex items-center justify-center h-10 w-10">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{data?.walletAddress}</p>
                          <p className="text-[#8C8B8B] font-medium">
                            Total $UVI Balance{" "}
                          </p>
                        </div>
                      </div>
                      {/* total transactions */}
                      <div>
                        <p className="font-semibold text-[#FFC121]">
                          Total Transactions
                        </p>
                        <p className="text-white font-medium">
                          $ {data?.tokenBalance}{" "}
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
              <div className="flex flex-row justify-between py-4 min-w-[600px]">
                {/* wallet address */}
                <div className="flex flex-row space-x-8 text-white">
                  {/* Index */}
                  <div className="rounded-full bg-[#171717] text-white font-semibold text-lg flex items-center justify-center h-10 w-10">
                    {userleaderBoardData?.[0]?.position}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {" "}
                      {userleaderBoardData?.[0]?.walletAddress}
                    </p>
                    <p className="text-[#8C8B8B] font-medium">
                      Total $UVI Balance{" "}
                    </p>
                  </div>
                </div>
                {/* total transactions */}
                <div>
                  <p className="font-semibold text-[#FFC121]">
                    Total Transactions
                  </p>
                  <p className="text-white font-medium">
                    $ {userleaderBoardData?.[0]?.tokenBalance}{" "}
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
